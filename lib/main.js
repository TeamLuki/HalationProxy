const WebSocket = require('ws');
const {Pool} = require('pg');
const IPCClient = require('./shared/ipc').Client;
var ipcclient = new IPCClient("")
var pool = new Pool();
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});
const wss = new WebSocket.Server({ port: 8080 });
