import express from 'express';
import fs from 'fs';
import path from 'path';
import imageTransform from '../utilities/imageTransform';
import checkParams from '../utilities/checkParams';

const routes = express.Router();

routes.get('/images', async (req, res) => {
  //get the request parameters keys from the URL
  const paramsKeys = Object.keys(req.query);
  // check if all 3 mandatory parameters are set 
  if (checkParams(paramsKeys)) {
    // set each parameter to a variable
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
    // check if the requested image with the requested size already exists
    if (fs.existsSync(imageThumbnail)) {
      // if it does, send the existing image as response
      res.sendFile(imageThumbnail);
    } else {
      // if it doesn't, resize the image and save the response to a variable
      const imgProcessed = await imageTransform(filename as string, width, height);
      // if the response doesn't include the word "Error", then it has been properly processed, send the processed image as response
      if (!String(imgProcessed).includes('Error')) {
        res.sendFile(imgProcessed);
      } else {
        // if the response includes the word "Error", send a proper error message
        res.send('There\'s no such file on the server, please verify the file name.');
      }
    }
  } else {
    // IF one of the parameters is missing in the request URL, then send a proper error message
    res.send('Please set a filename, width and height as parameters in the url (all 3 are mandatory).');
  }  
});

export default routes;
