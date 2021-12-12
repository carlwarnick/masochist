/**
 *
 */

import {readFileSync, existsSync} from 'fs';
import {join} from 'path';

class QueryCache {
  _queries;

  constructor() {
    this._queries = {};
  }

  getQuery(name) {
    if (!this._queries[name]) {
      if (name.match(/^\w+Query$/)) {
        const path = join(__dirname, '..', '__generated__', name + '.txt');
        if (existsSync(path)) {
          const text = readFileSync(path).toString();
          this._queries[name] = text;
        }
      }
    }
    return this._queries[name];
  }
}

const queryCache = new QueryCache();

export default queryCache;
