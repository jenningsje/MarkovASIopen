package config
import (
	"github.com/jenningsje/MarkovASI/api" // Import the API package to call ConsolidatedData
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
	// Load environment variables from the .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file")
	}

	// Replace DatabaseURL with the first line (URL) from master_api.txt
	Config.DatabaseURL = api.ConsolidatedData("") // Call the API package function

	// If no URL is found in the file, log an error and stop execution
	if Config.DatabaseURL == "" {
		log.Fatalf("Database URL is missing or empty in the file")
	}

	// Parse the environment variables (if any) after setting DatabaseURL
	if err := env.ParseWithOptions(&Config, env.Options{
		RequiredIfNoDef: false,
	}); err != nil {
		log.Fatalf("Unable to parse config: %v\n", err)
	}

	log.Println("Configuration loaded successfully")
}
