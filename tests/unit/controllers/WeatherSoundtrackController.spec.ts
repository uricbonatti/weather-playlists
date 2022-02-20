/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';
import { container } from 'tsyringe';

import WeatherSoundtrackController from '@controllers/WeatherSoundtrackController';
import AppError from '@errors/AppError';

const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

let controller: WeatherSoundtrackController;

class GenericMockedServices {
  public async execute() {
    return { soundtrack: { mocked: true } };
  }
}

describe('WeatherSoundtrackController', () => {
  beforeEach(() => {
    jest
      .spyOn(container, 'resolve')
      .mockReturnValue(new GenericMockedServices());
    controller = new WeatherSoundtrackController();
  });
  it('should return status 200 when sucess on obtaining the playlist passing city', async () => {
    const request = new MockExpressRequest({
      method: 'GET',
      query: {
        city: 'São Paulo'
      }
    });
    const response = new MockExpressResponse();
    await controller.getSoundtrack(request, response);
    expect(response.statusCode).toEqual(200);
    expect(response._getJSON()).toEqual({ mocked: true });
  });
  it('should return status 200 when sucess on obtaining the playlist passing valid coordinates', async () => {
    const request = new MockExpressRequest({
      method: 'GET',
      query: {
        lat: -23.5,
        lon: -46.6
      }
    });
    const response = new MockExpressResponse();
    await controller.getSoundtrack(request, response);
    expect(response.statusCode).toEqual(200);
    expect(response._getJSON()).toEqual({ mocked: true });
  });
  it('should throw an AppError when passing invalid coordinates', async () => {
    const request = new MockExpressRequest({
      method: 'GET',
      query: {
        lat: -93.5,
        lon: -246.6
      }
    });
    const response = new MockExpressResponse();
    await expect(
      controller.getSoundtrack(request, response)
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should throw an AppError without passing city and coordinates', async () => {
    const request = new MockExpressRequest({
      method: 'GET',
      query: {}
    });
    const response = new MockExpressResponse();
    await expect(
      controller.getSoundtrack(request, response)
    ).rejects.toBeInstanceOf(AppError);
  });
});
