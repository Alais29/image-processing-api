import express from 'express';
import fs from 'fs';
import path from 'path';
import imageTransform from '../utilities/imageTransform';
import checkParams from '../utilities/checkParams';

const routes = express.Router();

routes.get('/images', async (req, res) => {
  const paramsKeys = Object.keys(req.query);
  if (checkParams(paramsKeys)) {
    const filename = req.query.filename as string;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    
    const imageThumbnail = path.join(
      __dirname,
      '../',
      'assets/',
      'thumbnails/',
      filename,
    ) + `-${width}-${height}.jpg`;
    if (fs.existsSync(imageThumbnail)) {
      res.sendFile(imageThumbnail);
    } else {
      const imgProcessed = await imageTransform(filename as string, width, height);
      if (typeof imgProcessed === 'string') { 
        res.sendFile(imgProcessed);
      } else {
        res.send('There\'s no such file on the server, please verify the file name.');
      }
    }
  } else {
    res.send('Please set a filename, width and height as parameters in the url (all 3 are mandatory).');
  }  
});

export default routes;
