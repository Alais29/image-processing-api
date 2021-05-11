import express from 'express';
import path from 'path';
import imageTransform from '../utilities/imageTransform';
import checkParams from '../utilities/checkParams';

const routes = express.Router();

routes.get('/images', (req, res) => {
  const paramsKeys = Object.keys(req.query);
  if (checkParams(paramsKeys)) {
    const filename = req.query.filename as string;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    imageTransform(filename as string, width, height);
    
    //TODO Cache the file
    const outputFile = path.join(__dirname, '../',
      'assets/',
      'thumbnails/',
      filename) + '.jpg';    
    res.sendFile(outputFile);
  }
  // console.log(req.query);
  // res.send('Images route');
});

export default routes;
