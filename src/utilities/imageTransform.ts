import path from 'path';
import sharp from 'sharp';

const imageTransform = async (filename: string, width: number, height: number): Promise<string>=> {
  const imageInput = path.join(
    __dirname,
    '../',
    'assets/',
    'originals/',
    filename,
  ) + '.jpg';
  const imageOutput = path.join(
    __dirname,
    '../',
    'assets/',
    'thumbnails/',
    filename,
  ) + `-${width}-${height}.jpg`;

  try {
    await sharp(imageInput).resize(width, height).toFile(imageOutput);
    return imageOutput;
  } catch (error) {
    return error;
  }
};

export default imageTransform;
