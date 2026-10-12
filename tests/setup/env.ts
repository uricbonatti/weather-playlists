// Valores fictícios: os testes nunca chamam as APIs reais (nock intercepta tudo).
process.env.NODE_ENV = 'test';
process.env.OPEN_WEATHER_API_KEY = 'test-openweather-key';
process.env.SPOTIFY_CLIENT_ID = 'test-spotify-client-id';
process.env.SPOTIFY_SECRET = 'test-spotify-secret';
