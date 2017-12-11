var host = process.argv[0] || "localhost";
var port = process.argv[1] || 25565;
const nmp = require("minecraft-protocol");
var IPCClient = require("./shared/ipc").Client
var ipcclient = new IPCClient("proxy",);