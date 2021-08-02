import * as fs from 'fs';
export default function(text) {
  fs.appendFile('log.txt',text + '\n', function (err) {
   if (err) throw err;
 });
};