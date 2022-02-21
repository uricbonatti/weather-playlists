# Weather-Playlists

## Detalhes do Projeto

Projeto desenvolvido para solucionar o desafio proposto pela Squadra.

O desafio esta descrito abaixo:
[Desafio.pdf](docs/Desafio.pdf)

### **Testes**

Os testes do projeto utilizam das seguintes libs:
- **Nock**: Interceptador HTTP
- **Supertest**: Testes de Rotas e Requisições HTTP
- **Jest**: Motor de teste

Os testes apresentaram uma excelente cobertura de testes unitatios.
Para se replicar os testes localmente é preciso ter o ```NodeJS 14.17.4```.
Instalar a dependencias:
```shell
npm install
```
E executar os testes unitatios:
```shell
npm test:unit
```
Para se obter o arquivo de cobertura após o teste abra no navegador o arquivo ```coverage/lcov-report/index.html``` partindo da raiz do projeto.


### **Executando Localmente**
É preciso ter o ```NodeJS 14.17.4``` ou superior e ter o ```Redis``` na maquina.
O ideal é  o uso do Redis através do docker, sendo o comando para criar o container o seguinte:
```shell
docker run --name redisWeatherSoundtrack -p 6379:6379 -d redis:alpine
```
Para executar o projeto precisa-se criar um arquivo ```.env``` na raiz do projeto contendo as seguintes variaveis:

```env
PORT=3333
NODE_ENV=development

#REDIS CONFIG
REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_PASS = 

# OPEN WEATHER API CONFIGS
OPEN_WEATHER_API_KEY=

#SPOTIFY CONFIGS
SPOTIFY_CLIENT_ID=
SPOTIFY_SECRET=

#REQUEST LIMITER
MAX_REQUESTS=60
MINUTES_RESEND_REQUEST=5
```

Com as variaveis de ambiente configuradas, instale as dependencias do projeto atraves do:
```shell
npm install
```
E após a instalação o projeto esta pronto para ser executado em modo de desenvolvimento através do comando:
```shell
npm start:dev
```

### **Executando através do Docker**
Utilize do **docker-compose** para executar o projeto através do seguinte comando:
```shell
docker-compose up
```
A API estará disponivel na porta default 3333, podendo ser alterada dentro do arquivo ```docker-compose.yaml```


### **Documentação da API**

O projeto utiliza do padrão REST e a documentação elaborada em formato OpenAPI.

- Código para abrir a documentação no [Swagger](http://editor.swagger.io )
```yaml
openapi: 3.0.1
info:
  title: Weather Soundtrack API
  description: API para obtenção de uma playlist de acordo com a temperatuda de um
    local/cidade
  contact:
    email: uricbonatti.eng@gmail.com
  version: 1.0.0
servers:
- url: https://localhost:3333/
- url: http://localhost:3333/
paths:
  /tracks:
    get:
      tags:
      - Weather Soundtrack
      summary: Retorna uma playlist de acordo com a temperatura
      description: Realiza a busca por cidade ou coordenada e retorna uma playlist
        do spotify adequada para a temperatura do local
      operationId: tracks
      parameters:
      - name: city
        in: query
        description: Nome da cidade que se quer obter a playlist
        schema:
          $ref: '#/components/schemas/City'
      - name: lat
        in: query
        description: Latitude do local
        schema:
          $ref: '#/components/schemas/Latitude'
      - name: lon
        in: query
        description: Longitude do local
        schema:
          $ref: '#/components/schemas/Longitude'
      responses:
        200:
          description: Playlist obtida
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Soundtrack'
        400:
          description: Entrada Invalida
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ValidationError'
        429:
          description: Erro de excesso de requisições por IP
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LimitAccessError'
        500:
          description: Erro interno do Servidor
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalError'
components:
  schemas:
    City:
      type: string
      example: São Paulo
    Latitude:
      type: number
      example: -23.5
    Longitude:
      type: number
      example: -46.5
    InternalError:
      type: object
      properties:
        status:
          type: string
          example: error
        message:
          type: string
          example: Internal Server Error
    ValidationError:
      type: object
      properties:
        status:
          type: string
          example: error
        message:
          type: string
          example: city or valid coordinates(lon,lon) must be informed.
        route:
          type: string
          example: /tracks
        examples:
          type: string
          example: /tracks?city=São Paulo /tracks?lat=-23.5&lon=-46.6
    LimitAccessError:
      type: object
      properties:
        status:
          type: string
          example: error
        message:
          type: string
          example: Too many requests from this IP, please try again after 5 minutes
    Soundtrack:
      type: array
      minItems: 0
      items:
        type: object
        properties:
          name:
            type: string
            example: Wenn Es Nachts Ist
          uri:
            type: string
            example: spotify:track:5r0iMfLookwrfLiYNXEgF1
          spotify_link:
            type: string
            example: https://open.spotify.com/track/675SuKGFjigRRcGg8Ju6gT

```
