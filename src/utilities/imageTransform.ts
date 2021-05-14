import path from 'path';
import sharp from 'sharp';

// Resizes the image to the width and height set in the parameters
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
    // await for sharp to process the image, if it succeds, returns the imageOutput 
    await sharp(imageInput).resize(width, height).toFile(imageOutput);
    return imageOutput;
  } catch (error) {
    // if not, returns the error
    return error;
  }
};

export default imageTransform;
