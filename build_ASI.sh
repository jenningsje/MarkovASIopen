cp -r ../train train

docker build -t codel .

rm -rf train

docker run \
  -e OLLAMA_MODEL=granite3.1-dense\
  -e OLLAMA_SERVER_URL=http://host.docker.internal:11434 \
  -p 8887:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  codel
