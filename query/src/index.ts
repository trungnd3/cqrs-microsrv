import { app } from './app';

async function start() {

  // async code

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

start();
