import { getRandomGif } from '../src/chat/setup';
jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

fetch.mockReturnValue(
  Promise.resolve(
    new Response({ url: 'a nice url' })
  )
);


test('getRandomGif returns the expected object', async () => {
  const response = await getRandomGif();
  expect(response.url).toBe('a nice url');
  return response;
});