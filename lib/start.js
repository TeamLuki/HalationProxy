var spawn = require('child_process').spawn;
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

var forEach = require('lodash.foreach');
var args = process.argv.slice(2);
/* "gear: [state, childproc]"
gear is file name
state is process state 0=stopped 1=started 2=errored
childproc is an instance of spawn from child_process
*/
var gears = {
    "main":[0], //kind of needed
    "proxy": [0], //why would you bother not running this either
    "ws": [0] // optional: for connecting to website
}
/** @function
 * @name gears
 * @param {Object} changes
 */
function changeGears(changes){
    Object.assign(gears,changes)
    wss.emit(gears);
}
wss.on('connection', function connection(ws) {
    ws.send(gears);
});
if (args.length <= 0){
    console.log("starting all gears");
    forEach(gears,(value, key) => {
        var change = {}
        change[key] = []
        change[key][0] = 1;
        change[key][1] = spawn("node",[key])
        changeGears(change)
    });
} else {
    forEach(args,(value) => {
        if (gears[value] = undefined) {
            console.log("please start defined gears in start.js");
        }
    })
}
forEach(gears,(value,key)=> {
    value[1].on("error",(err)=>{
        console.error(key,"errored:")
        console.log("shutting down")
        forEach(gears,(value)=>{
            value[1].kill("SIGKILL")
        })
    })
});