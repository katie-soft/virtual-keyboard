import Key from './Key.js';
import { enKeys, numKeys } from '../constants.js';

for (let prop in enKeys) {
  const key = new Key(enKeys[prop]);
  key.appendKey();
}

for (let prop in numKeys) {
  const key = new Key(numKeys[prop]);
  key.appendKey();
}