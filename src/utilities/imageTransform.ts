import path from 'path';
import sharp from 'sharp';

const imageTransform = (filename: string, width: number, height: number): void => {
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
  ) + '.jpg';
  console.log(imageInput);
  sharp(imageInput)
    .resize(width, height)
    .toFile(imageOutput, function (err) {
      // output.jpg is a 300 pixels wide and 200 pixels high image
      // containing a scaled and cropped version of input.jpg
      console.log(err);
    });
};

export default imageTransform;
