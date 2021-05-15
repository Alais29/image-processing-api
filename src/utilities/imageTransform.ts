import path from 'path';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import fs from 'fs';

// Resizes the image to the width and height set in the parameters
const imageTransform = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const imageInput: string =
    path.join(__dirname, '../', '../', 'assets/', 'originals/', filename) +
    '.jpg';
  const imageOutputFolder: string = path.join(
    __dirname,
    '../',
    '../',
    'assets/',
    'thumbnails/'
  );
  const imageOutput: string =
    path.join(__dirname, '../', '../', 'assets/', 'thumbnails/', filename) +
    `-${width}-${height}.jpg`;

  // if the image output folder doesn't exists, create it
  if (!fs.existsSync(imageOutputFolder)) {
    await fsPromises.mkdir(imageOutputFolder);
  }

  try {
    // await for sharp to process the image, if it succeds, returns the imageOutput
    await sharp(imageInput).resize(width, height).toFile(imageOutput);
    return imageOutput;
  } catch (error) {
    // if not, returns the error
    return error;
  }
};

export default imageTransform;
