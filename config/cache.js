const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');


const client = redis.createClient('redis://127.0.0.1:6379');
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  
  const cacheValue = await client.hget(this.hashKey, key);

  // Check data in cache
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    console.log('Posts from cache');

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  // If we don't have, add query to cache
  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
  console.log('Posts from mongo');

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};