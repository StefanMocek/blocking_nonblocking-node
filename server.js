const express = require('express');
const cluster = require('cluster');
const os = require('os')

const app = express();

function delay (duration) {
  const startTime = Date.now();
  while(Date.now() - startTime < duration){
    // block the event loop
  }
};

app.get('/', (req, res) => {
  res.send(`Performance example ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(9000);
  res.send(`Ding ding ding! ${process.pid}`);
});

console.log('server.js is running...');
if(cluster.isMaster) {
  console.log('Master has starter');
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  };
} else {
  console.log('worker process started');
  app.listen(3000);
}