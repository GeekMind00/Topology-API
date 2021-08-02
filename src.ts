import * as API from './api';
import * as readline from 'readline';
import logger from './logger';

logger('====================');
logger('START OF THE NEW LOG');
logger('====================');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function processInput() {
  return new Promise(function (resolve, reject) {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
    rl.setPrompt('ready> ');
    rl.prompt();
    rl.on('line', function (line) {
      line.toLowerCase();
      if (line === 'exit' || line === 'quit' || line == 'q') {
        rl.close();
        return;
      }

      let answers: Array<string> = line.split(' ');
      if (answers[0] === 'read') {
        API.readJSON(answers[1]);
      } else if (answers[0] === 'write') {
        API.writeJSON(answers[1]);
      } else if (answers[0] === 'delete') {
        API.deleteTopology(answers[1]);
      } else if (answers[0] === 'getTopologies') {
        API.queryTopologies();
      } else if (answers[0] === 'getDevices') {
        API.queryDevices(answers[1]);
      } else if (answers[0] === 'getDevicesWithNetlistNode') {
        API.queryDevicesWithNetlistNode(answers[1], answers[2]);
      } else {
        logger(`unknown command: "${line}"`);
        console.log(`unknown command: "${line}"`);
      }
      rl.prompt();
    }).on('close', function () {
      console.log('bye');
      resolve(42);
    });
  });
}

async function run() {
  try {
    let Result = await processInput();
    console.log('result:', Result);
  } catch (e) {
    console.log('failed:', e);
  }
}

run();
