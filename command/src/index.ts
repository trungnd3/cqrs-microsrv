import { app } from './app';

async function start() {
  if (!process.env.EVENTSTORE_URL) {
    throw new Error('EVENTSTORE_URL does not exist.');
  }

  // async code

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

start();
