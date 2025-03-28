
// This is a simple script to start the TinaCMS dev server
const { exec } = require('child_process');
const process = require('process');

// Start the TinaCMS dev server
console.log('Starting TinaCMS dev server...');
const tina = exec('npx tinacms dev -c "npm run dev"');
tina.stdout.pipe(process.stdout);
tina.stderr.pipe(process.stderr);

// Handle clean exit
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  tina.kill();
  process.exit();
});
