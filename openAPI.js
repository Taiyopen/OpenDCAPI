const { jsonAPI } = require("./jsonAPI");
const { roleAPI } = require("./roleAPI");


class openAPI {
    static rolerON(member, reaction) {
        var data = jsonAPI.importJSON('./openAPI.json');
        data = jsonAPI.searchJSON(data, 'server');
        const server = data;
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

    static serverRegister(server_ID){
        var data = {
            "server_ID": server_ID,
            "emoji_to_role": [],
            "music":[]
        }
        jsonAPI.writeJSON('./openAPI.json', data);
        
    }
}
module.exports = { openAPI }