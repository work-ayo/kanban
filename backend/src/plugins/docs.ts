import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export default fp(async (app) => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Kanban Backend REST API',
        description: 'Team-based task management backend API docs',
        version: '0.1.0',
      },
      servers: [{ url: 'http://localhost:3000/api', description: 'Local API' }],
      tags: [
        { name: 'Auth', description: 'Authentication APIs' },
        { name: 'Teams', description: 'Team management APIs' },
        { name: 'Projects', description: 'Project APIs' },
        { name: 'Tasks', description: 'Task APIs' },
        { name: 'Kanban', description: 'Board/Column/Card APIs' },
        { name: 'Gantt', description: 'Gantt APIs' },
        { name: 'DailyReports', description: 'Daily report APIs' },
        { name: 'WeeklyReports', description: 'Weekly report APIs' },
        { name: 'Dashboard', description: 'Dashboard APIs' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/api/docs',
    uiConfig: { docExpansion: 'list', deepLinking: false },
  });
});
