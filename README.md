# bai.germaniii.com

This repository is for the project **Beyond Automated Interaction** project.

## Technology Stack

- React
- Vite
- Ollama

## Ollama

In order to run ollama properly, if it is the first time the container was built, we would need to install the llm.

```
docker compose exec bai_ollama ollama run llama2
```

We can store llms in a directory locally so that we would not have to download repeatedly. We can do this by changing the volumes in docker-compose file.

On subsequent restarts, ollama still needs to be run again. To do this we just run this command:

```
docker compose exec -d bai_ollama ollama run llama2
```

### NVIDIA GPU

In order to utilize NVIDIA GPU we need to install NVIDIA please refer to docs [ollama GPU](https://ollama.ai/blog/ollama-is-now-available-as-an-official-docker-image).

Basically what we need is:
Nvidia GPU

    Install the Nvidia container toolkit.
    Run Ollama inside a Docker container

docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
