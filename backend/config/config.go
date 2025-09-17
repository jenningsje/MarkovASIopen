package config

import (
	"log"

	"github.com/caarlos0/env/v10"
	"github.com/jenningsje/MarkovASI/api"
	"github.com/joho/godotenv"
)

type config struct {
	// General
	DatabaseURL string `env:"DATABASE_URL" envDefault:"database.db"`
	APIFile     string `env:"API_FILE" envDefault:"apis.txt"` // <-- points to your list
	Port        int    `env:"PORT" envDefault:"8080"`

	// OpenAI
	OpenAIKey       string `env:"OPEN_AI_KEY"`
	OpenAIModel     string `env:"OPEN_AI_MODEL" envDefault:"gpt-4-0125-preview"`
	OpenAIServerURL string `env:"OPEN_AI_SERVER_URL" envDefault:"https://api.openai.com/v1"`

	// Ollama
	OllamaModel     string `env:"OLLAMA_MODEL"`
	OllamaServerURL string `env:"OLLAMA_SERVER_URL" envDefault:"http://host.docker.internal:11434"`
}

var Config config

func Init() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: no .env file found")
	}

	// Parse other env variables first
	if err := env.ParseWithOptions(&Config, env.Options{RequiredIfNoDef: false}); err != nil {
		log.Fatalf("Unable to parse config: %v\n", err)
	}

	// Fetch all API data concurrently in background
	go func() {
		results := api.ConsolidatedData(Config.APIFile)
		if results == nil || len(results) == 0 {
			log.Println("No API data fetched")
			return
		}

		log.Printf("Fetched %d APIs successfully", len(results))
		// Optionally store results somewhere global or pass to Codel
	}()

	log.Println("Configuration loaded successfully")
}
