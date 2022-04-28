const { jsonAPI } = require("./jsonAPI");
const { roleAPI } = require("./roleAPI");
const { musicAPI} = require("./musicAPI");
const { prefix } = require('../config.json');

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

    static async musicON(msg){
    if (!msg.guild) return;

    const music = new musicAPI();
    // !!join
    if (msg.content === `${prefix}join`) {

        // 機器人加入語音頻道
        music.join(msg);
    }

    // 如果使用者輸入的內容中包含 !!play 或是 p
    if (msg.content.indexOf(`${prefix}play`) > -1) {

        // 如果使用者在語音頻道中
        if (msg.member.voice.channel) {

            // 播放音樂
            await music.play(msg);
        } else {

            // 如果使用者不在任何一個語音頻道
            msg.reply('你必須先加入語音頻道');
        }
    }
/*
    if (msg.content.indexOf(`${prefix}p`) > -1 ) {

        // 如果使用者在語音頻道中
        if (msg.member.voice.channel) {

            // 播放音樂
            await music.play(msg);
        } else {

            // 如果使用者不在任何一個語音頻道
            msg.reply('你必須先加入語音頻道');
        }
    }
*/

    // !!resume
    if (msg.content === `${prefix}resume`) {

        // 恢復音樂
        music.resume(msg);
    }

    // !!repeat or rp
    if (msg.content === `${prefix}repeat`) {

        // 重複音樂
        music.repeat(msg);
    }


    // !!pause
    if (msg.content === `${prefix}pause`) {

        // 暫停音樂
        music.pause(msg);
    }

    // !!skip
    if (msg.content === `${prefix}skip`) {

        // 跳過音樂
        music.skip(msg);
    }

    // !!queue
    if (msg.content === `${prefix}queue`) {

        // 查看隊列
        music.nowQueue(msg);
    }

    // !!leave
    if (msg.content === `${prefix}leave`) {

        // 機器人離開頻道
        music.leave(msg);
    }
    }
}
module.exports = { openAPI }