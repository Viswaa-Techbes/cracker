import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { connectDB } from './config/db';
import { seedCatalogueIfNeeded } from './scripts/seedCatalogue';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await connectDB();
    await seedCatalogueIfNeeded();
    const app = createApp();

    const server = app.listen(PORT, () => {
      console.log(`[Server] Backend listening on port http://localhost:${PORT}`);
    });

    const shutdown = async () => {
      console.log('[Server] Gracefully shutting down...');
      server.close(() => {
        console.log('[Server] HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('[Server] Fatal startup error:', error);
    process.exit(1);
  }
}

bootstrap();
