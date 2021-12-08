/**
 * @flow strict
 */

const DEFAULT_CAPACITY = 128;

import nullthrows from '@wincent/nullthrows';

export default class LRUCache<TKey, TValue> {
  _capacity: number;
  _storage: Map<TKey, TValue>;

  constructor(capacity: number = DEFAULT_CAPACITY) {
    if (capacity <= 0) {
      throw new Error(`LRUCache: non-positive capacity ${capacity}`);
    }
    this._capacity = capacity;
    this._storage = new Map();
  }

  delete(key: TKey): boolean {
    return this._storage.delete(key);
  }

  has(key: TKey): boolean {
    return this._storage.has(key);
  }

  get(key: TKey): ?TValue {
    // Bump item in LRU list by removing and re-adding it.
    if (this._storage.has(key)) {
      const value = nullthrows(this._storage.get(key));
      this._storage.delete(key);
      this._storage.set(key, value);
      return value;
    }
  }

  set(key: TKey, value: TValue): LRUCache<TKey, TValue> {
    // If necessary to stay under capacity, remove LRU items.
    if (this._storage.size >= this._capacity) {
      let countToRemove = this._storage.size - this._capacity;
      const keysToRemove = [];
      for (let [k, v] of this._storage) {
        keysToRemove.push(k);
        if (!countToRemove) {
          break;
        }
        countToRemove--;
      }
      keysToRemove.forEach(k => this._storage.delete(k));
    }

    // Add the new item.
    this._storage.set(key, value);
    return this;
  }
}
