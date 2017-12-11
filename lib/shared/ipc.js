var exports = module.exports;
const ipc = require('node-ipc')

/**@class
 * @name Client
 */
exports.Client = class Client{
    /**@constructor
     * @description Initialize a node-ipc instance and connect to the server
     * @param {string} id 
     * @param {string} server 
     */
    constructor(id,server){
        ipc.config.id = id
        ipc.config.silent = true
        this.ipc = ipc
        this.server = ipc.of[server]
        ipc.connectTo(server)
    }
    /**@func
     * @name send
     * @description Send a message to the server
     * @param {string} event 
     * @param {*} message 
     */
    send(event,message){
        this.server.emit(event,message)
    }
    /**@func
     * @name sendTo
     * @description Like send, but tries to send message to another client via Server
     * @see {@link send}
     * @param {*} id 
     * @param {*} event 
     * @param {*} message 
     */
    sendTo(id,event,message){
        this.server.emit("another",[id,event,message])
    }
    /**@name recieve
     * @description Wrapper for server.on 
     * @param {string} event 
     * @param {function} callback 
     */
    receive(event,callback){
        this.server.on("",callback)
    }
}

exports.Server = class {
    /** 
     * @param {string} id 
     */
    constructor(id){
        ipc.config.id = id;
        this.ipc = ipc
        ipc.serve()
        ipc.server.start()
        ipc.server.on("another",function(things){
            if (ipc.of[things[0]] == undefined) return undefined;
            ipc.of[things[0]].emit(things[1],things[2])
        })
    }
}