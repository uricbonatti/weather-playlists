import 'reflect-metadata';
import WeatherSoundtrackService from '@services/WeatherSoundtrackService';
import FakeSoundtrackProvider from '../../mocks/FakeSoundtrackProvider';
import FakeWeatherProvider from '../../mocks/FakeWeatherProvider';
import AppError from '@errors/AppError';

let fakeSoundtrackProvider: FakeSoundtrackProvider;
let fakeWeatherProvider: FakeWeatherProvider;
let service: WeatherSoundtrackService;
describe('WeatherSoundtrackService', () => {
  beforeEach(() => {
    fakeSoundtrackProvider = new FakeSoundtrackProvider();
    fakeWeatherProvider = new FakeWeatherProvider();
    service = new WeatherSoundtrackService(
      fakeWeatherProvider,
      fakeSoundtrackProvider
    );
  });
  it('should be able to get a pop soundtrack when São Paulo is 16°C', async () => {
    const city = 'São Paulo'; // Temp: 16
    const { soundtrack } = await service.execute({ city });
    expect(soundtrack).toEqual([
      {
        name: 'Love Story (Taylor’s Version)',
        uri: 'spotify:track:5JixKG2cp8uTu7RmjmD0aQ',
        spotify_link: 'https://open.spotify.com/track/5JixKG2cp8uTu7RmjmD0aQ'
      }
    ]);
  });
  it('should be able to get a party soundtrack when Rio de Janeiro is 40°C', async () => {
    const city = 'Rio de Janeiro'; // Temp: 40
    const { soundtrack } = await service.execute({ city });
    expect(soundtrack).toEqual([
      {
        name: 'Wenn Es Nachts Ist',
        uri: 'spotify:track:5r0iMfLookwrfLiYNXEgF1',
        spotify_link: 'https://open.spotify.com/track/675SuKGFjigRRcGg8Ju6gT'
      }
    ]);
  });
  it('should be able to get a classical soundtrack when Curitiba is really cold', async () => {
    const city = 'Curitiba'; // Temp: -10
    const { soundtrack } = await service.execute({ city });
    expect(soundtrack).toEqual([
      {
        name: 'Divenire',
        uri: 'spotify:track:6HqaTDzMAHSlhXuMysUOUb',
        spotify_link: 'https://open.spotify.com/track/6HqaTDzMAHSlhXuMysUOUb'
      }
    ]);
  });
  it('should be able to get a rock soundtrack when New York is  cold', async () => {
    const city = 'New York'; // Temp: 13
    const { soundtrack } = await service.execute({ city });
    expect(soundtrack).toEqual([
      {
        name: 'Have You Ever Seen The Rain',
        uri: 'spotify:track:675SuKGFjigRRcGg8Ju6gT',
        spotify_link: 'https://open.spotify.com/track/675SuKGFjigRRcGg8Ju6gT'
      }
    ]);
  });
  it('should be able to get a soundtrack to any coordinates', async () => {
    const coordinates = { lat: -22.9, lon: -43.2 }; // Temp: 40
    const { soundtrack } = await service.execute({ coordinates });
    expect(soundtrack).toEqual([
      {
        name: 'Wenn Es Nachts Ist',
        uri: 'spotify:track:5r0iMfLookwrfLiYNXEgF1',
        spotify_link: 'https://open.spotify.com/track/675SuKGFjigRRcGg8Ju6gT'
      }
    ]);
  });

  it('should not be able to get a soundtrack without city or coordinates', async () => {
    await expect(service.execute({})).rejects.toBeInstanceOf(AppError);
  });
});
