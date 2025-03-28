
// This is a simple script to start the TinaCMS dev server
const { exec } = require('child_process');
const process = require('process');

// Start the Vite dev server
const vite = exec('npm run dev');
vite.stdout.pipe(process.stdout);
vite.stderr.pipe(process.stderr);

// Start the TinaCMS dev server
const tina = exec('npx tinacms dev -c "npm run dev"');
tina.stdout.pipe(process.stdout);
tina.stderr.pipe(process.stderr);

// Handle clean exit
process.on('SIGINT', () => {
  vite.kill();
  tina.kill();
  process.exit();
});
