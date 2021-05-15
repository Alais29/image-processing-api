import express from 'express';
import routes from './routes/index';

const app: express.Application = express();
const port = 3000;

// Set the routes
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/`);
});

export default app;
