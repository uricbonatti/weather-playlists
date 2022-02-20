import redisMock from 'ioredis-mock';
import RedisCacheProvider from '@providers/CacheProvider/RedisCacheProvider';

jest.mock('ioredis', () => redisMock);

let provider: RedisCacheProvider;

describe('RedisCacheProvider', () => {
  beforeEach(() => {
    provider = new RedisCacheProvider();
  });
  it('should be able to save and recover data', async () => {
    const key = 'test-key';
    const value = { data: 'test-value' };
    await provider.save(key, value);
    const recoveredData = await provider.recover<{ data: string }>(key);
    expect(recoveredData).toEqual(value);
  });
  it('should return null when key not exist', async () => {
    const key = 'test-key2';
    const recoveredData = await provider.recover<{ data: string }>(key);
    expect(recoveredData).toBeNull();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
