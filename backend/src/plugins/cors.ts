import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (app) => {
  await app.register(cors, {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const allow = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
      ];
      cb(null, allow.includes(origin));
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
});
