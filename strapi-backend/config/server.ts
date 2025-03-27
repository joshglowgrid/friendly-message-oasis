export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://stunning-broccoli-5grw5qr4r5q9h76j5-1337.app.github.dev',
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    url: '/admin',
  },
});
