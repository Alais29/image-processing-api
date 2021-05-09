import express from 'express';

const routes = express.Router();

routes.get('/images', (req, res) => {
  res.send('Images route');
});

export default routes;
