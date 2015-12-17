import Promise from 'bluebird';
import redis from 'redis';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const KEY_PREFIX = 'masochist';

/**
 * Can manually force cache invalidation by bumping this.
 *
 * NOTE: if you update this, you need to update the version in the wikiserve
 * project as well.
 */
const CACHE_VERSION = '2';

const redisClient = redis.createClient();

function prefixKey(key: string): string {
  return KEY_PREFIX + ':' + CACHE_VERSION + ':' + key;
}

const client = {
  get(key) {
    return redisClient.getAsync(prefixKey(key));
  },

  multi(commands) {
    const commandsWithPrefixedKeys = commands.map(
      ([command, key, ...args]) => [command, prefixKey(key), ...args]
    );
    return redisClient.multi(commandsWithPrefixedKeys).execAsync();
  },
};

export default client;
