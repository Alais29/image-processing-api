import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../index';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('gets the api/images endpoint and returns a 500 error if no parameters are set', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(500);
  });
});

describe('Test image processing', () => {
  const filename = 'santamonica';
  const width = '300';
  const height = '300';
  const outputPath =
    path.join(__dirname, '../', '../', 'assets/', 'thumbnails/', filename) +
    `-${width}-${height}.jpg`;

  it('resizes an image when proper parameters are set in the url', async () => {
    await request.get(
      `/api/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(fs.existsSync(outputPath)).toBeTrue();
  });

  it('returns a proper error message when the image to be processed does not exist', async () => {
    const response = await request.get(
      `/api/images?filename=test&width=${width}&height=${height}`
    );
    expect(response.text).toBe(
      'There is no such file on the server, please verify the file name.'
    );
  });

  it('returns a proper error message when one of the url parameters is not set', async () => {
    const response = await request.get(
      `/api/images?filename=${filename}&width=${width}`
    );
    expect(response.text).toBe(
      'Please set a filename, width and height as parameters in the url (all 3 are mandatory and width and height must be numbers).'
    );
  });
  it('returns a proper error message if width or height are not numbers', async () => {
    const response = await request.get(
      `/api/images?filename=${filename}&width=${width}&height=test`
    );
    expect(response.text).toBe(
      'Please set a filename, width and height as parameters in the url (all 3 are mandatory and width and height must be numbers).'
    );
  });
});
