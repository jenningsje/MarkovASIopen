package config

import (
	"github.com/jenningsje/MarkovASI/api"
	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
	"log"
)

type config struct {
	// General
	DatabaseURL string `env:"DATABASE_URL" envDefault:"database.db"`
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

	// Replace DatabaseURL with consolidated API data
	Config.DatabaseURL = api.ConsolidatedData("master_api.txt")

	// If no URL found, fallback to env default
	if Config.DatabaseURL == "" {
		log.Fatalf("Database URL is missing or empty in master_api.txt")
	}

	// Parse other env variables
	if err := env.ParseWithOptions(&Config, env.Options{
		RequiredIfNoDef: false,
	}); err != nil {
		log.Fatalf("Unable to parse config: %v\n", err)
	}

	log.Println("Configuration loaded successfully")
}
