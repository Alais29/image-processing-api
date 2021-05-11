import express from 'express';
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
    const imgProcessed = await imageTransform(filename as string, width, height);
    //TODO Cache the file
    if (typeof imgProcessed === 'string') { 
      res.sendFile(imgProcessed);
    } else {
      res.send('There\'s no such file on the server, please verify the file name.');
    }
  } else {
    res.send('Please set a filename, width and height as parameters in the url.');
  }  
});

export default routes;
