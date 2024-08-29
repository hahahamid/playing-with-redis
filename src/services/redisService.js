const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error: ', err);
});

client.on('ready', () => {
    console.log('Redis client is ready');
});

client.on('end', () => {
    console.log('Redis client connection closed');
});

client.connect().then(() => {
    console.log('Connected to Redis');
}).catch((err) => {
    console.log(err.message);
});

module.exports = client;