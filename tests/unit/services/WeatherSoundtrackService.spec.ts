import 'reflect-metadata';
import WeatherSoundtrackService from '@services/WeatherSoundtrackService';
import FakeSoundtrackProvider from '../../mocks/FakeSoundtrackProvider';
import FakeWeatherProvider from '../../mocks/FakeWeatherProvider';
import * as rock from '../../mocks/spotify/rock.json';
import * as pop from '../../mocks/spotify/pop.json';
import * as classic from '../../mocks/spotify/classico.json';
import * as party from '../../mocks/spotify/festa.json';
import AppError from '@errors/AppError';

let fakeSoundtrackProvider: FakeSoundtrackProvider;
let fakeWeatherProvider: FakeWeatherProvider;
let service: WeatherSoundtrackService;

const spotifySoundtracks = {
  rock,
  pop,
  classic,
  party
};
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
    expect(soundtrack).toEqual(spotifySoundtracks.pop);
  });
  it('should be able to get a party soundtrack when Rio de Janeiro is 40°C', async () => {
    const city = 'Rio de Janeiro'; // Temp: 40
    const { soundtrack } = await service.execute({ city });
    expect(soundtrack).toEqual(spotifySoundtracks.party);
  });
  it('should be able to get a classical soundtrack when Curitiba is really cold', async () => {
    const city = 'Curitiba'; // Temp: -10
    const { soundtrack } = await service.execute({ city });
    expect(soundtrack).toEqual(spotifySoundtracks.classic);
  });
  it('should be able to get a rock soundtrack when Curitiba is really cold', async () => {
    const city = 'New York'; // Temp: 13
    const { soundtrack } = await service.execute({ city });
    expect(soundtrack).toEqual(spotifySoundtracks.rock);
  });
  it('should be able to get a soundtrack to any coordinates', async () => {
    const coordinates = { lat: -22.9, lon: -43.2 }; // Temp: 40
    const { soundtrack } = await service.execute({ coordinates });
    expect(soundtrack).toEqual(spotifySoundtracks.party);
  });

  it('should not be able to get a soundtrack without city or coordinates', async () => {
    await expect(service.execute({})).rejects.toBeInstanceOf(AppError);
  });
});
