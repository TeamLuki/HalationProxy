var host = process.argv[0] || "localhost";
var port = process.argv[1] || 25565;
var nmp = require("minecraft-protocol");
var mcserver = nmp.createServer({
    host: host,
    port: port
});
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database("db");
mcserver.listen(port, host);