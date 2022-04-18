const { jsonAPI } = require("./jsonAPI");
const { roleAPI } = require("./roleAPI");

class openAPI {
    static rolerON(member, reaction){
        var data = jsonAPI.improtJSON('../openAPI.json');
        //console.log(data);

        //data = jsonAPI.searchJSON(data, 'server[1]');
        //console.log(data);
        data = jsonAPI.searchJSON(data, 'emoji_to_role');
        //data = jsonAPI.searchJSON(data, 'emoji_to_role');
        console.log(data);
        for(var i in data){
            roleAPI.emoji_to_role(member, reaction, data[i].msg_ID, data[i].role_ID, data[i].emoji_ID);
        }
    }
    static unrolerON(member, reaction){
        var data = jsonAPI.improtJSON('../openAPI.json');
        //data = jsonAPI.searchJSON(data, 'server');
        data = jsonAPI.searchJSON(data, 'emoji_to_role');
        //console.log(dataName);
        for(var i in data){
            roleAPI.emoji_to_unrole(member, reaction, data[i].msg_ID, data[i].role_ID, data[i].emoji_ID);
        }
    }
}
module.exports = { openAPI }