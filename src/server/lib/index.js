import path from 'path';
import fs from 'fs';

export let SERVER_DIR = path.resolve(path.join(__dirname, '..'))
export let PACKAGE_DIR = path.resolve(path.join(SERVER_DIR, '..'));

export function readFile(filepath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filepath, function(err, contents) {
      if (err) reject(err);

      resolve(contents);
    });
  });
}
