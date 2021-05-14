import express from 'express';
import fs from 'fs';
import path from 'path';
import imageTransform from '../utilities/imageTransform';
import { checkParams, IQuery } from '../utilities/checkParams';

const routes = express.Router();

routes.get(
  '/images',
  async (req: express.Request, res: express.Response): Promise<void> => {
    // check if all 3 mandatory parameters are set and width and height are numbers
    if (checkParams((req.query as unknown) as IQuery)) {
      // set each parameter to a variable
      const filename = req.query.filename as string;
      const width = Number(req.query.width);
      const height = Number(req.query.height);

      const imageThumbnail: string =
        path.join(__dirname, '../', 'assets/', 'thumbnails/', filename) +
        `-${width}-${height}.jpg`;
      // check if the requested image with the requested size already exists
      if (fs.existsSync(imageThumbnail)) {
        // if it does, send the existing image as response
        res.sendFile(imageThumbnail);
      } else {
        // if it doesn't, resize the image and save the response to a variable
        const imgProcessed = await imageTransform(
          filename as string,
          width,
          height
        );
        // if the response doesn't include the word "Error", then it has been properly processed, send the processed image as response
        if (!String(imgProcessed).includes('Error')) {
          res.sendFile(imgProcessed);
        } else {
          // if the response includes the word "Error", send a proper error message
          res
            .status(404)
            .send(
              'There is no such file on the server, please verify the file name.'
            );
        }
      }
    } else {
      // if one of the parameters is missing in the request URL, then send a proper error message
      res
        .status(500)
        .send(
          'Please set a filename, width and height as parameters in the url (all 3 are mandatory and width and height must be numbers).'
        );
    }
  }
);

export default routes;
