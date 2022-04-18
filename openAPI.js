const { jsonAPI } = require("./jsonAPI");
const { roleAPI } = require("./roleAPI");


class openAPI {
    static rolerON(member, reaction) {
        var data = jsonAPI.importJSON('./openAPI.json');
        data = jsonAPI.searchJSON(data, 'server');
        const server = data;
        this.serverRegister(member.guild);
        for (var i in server) {           
            if ((member.guild.id == server[i].server_ID)) {
                data = jsonAPI.searchJSON(data, i)
                data = jsonAPI.searchJSON(data, 'emoji_to_role');
                for (var j in data) {
                    roleAPI.emoji_to_role(member, reaction, data[j].msg_ID, data[j].role_ID, data[j].emoji_ID);
                }
            }
        }
    }
    static unrolerON(member, reaction) {
        var data = jsonAPI.importJSON('./openAPI.json');
        data = jsonAPI.searchJSON(data, 'server');
        const server = data;
        for (var i in server) {           
            if ((member.guild.id == server[i].server_ID)) {
                data = jsonAPI.searchJSON(data, i)
                data = jsonAPI.searchJSON(data, 'emoji_to_role');
                for (var j in data) {
                    roleAPI.emoji_to_unrole(member, reaction, data[j].msg_ID, data[j].role_ID, data[j].emoji_ID);
                }
            }
        }
    }

    static serverRegister(server){
        var data = jsonAPI.importJSON('./openAPI.json');
        console.log(server);
        for(var i in data.server){
            if(server.id == data.server[i].server_ID){
                return console.log('server id is existed');
            }
        }
        console.log('New guild found!!! Welcome!!');
        console.log('Welcome!!  ' + server.id);
        var newdata = {
            "server_ID": server.id,
            "server_name": server.name,
            "emoji_to_role": []
        }
        data.server.push(newdata);
        jsonAPI.writeJSON(data, './OpenDCAPI/openAPI.json');   
    }
}
module.exports = { openAPI }