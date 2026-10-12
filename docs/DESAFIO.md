# Desafio técnico (resumo)

Teste técnico para vaga de desenvolvedor **pleno** (Squadra, 2022).

## Objetivo

Microsserviço RESTful que recebe o **nome de uma cidade** ou **coordenadas** e devolve uma **sugestão de playlist** de acordo com a temperatura atual do local.

## Regras de negócio

| Temperatura (°C) | Gênero sugerido |
|---|---|
| acima de 30 | festa |
| de 15 a 30 | pop |
| de 10 a 14 | rock |
| abaixo de 10 | clássica |

## Requisitos

- Node.js com TypeScript
- Clima via [OpenWeatherMap](https://openweathermap.org) e faixas via [Spotify Web API](https://developer.spotify.com)
- Código em repositório público, com documentação para reproduzir a execução
- Desejável: testes automatizados (Jest ou Mocha)

## Critérios de avaliação

Organização da aplicação, qualidade e clareza do código, interpretação do problema, implementação e execução final.

> O enunciado original trazia credenciais de teste das APIs. Elas foram removidas deste repositório: use as suas próprias no `.env` (veja `.env.example`).
