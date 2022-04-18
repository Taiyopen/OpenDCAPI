class roleAPI {
    static emoji_to_role(member, reaction, msg_ID, role_ID, emoji_ID) {
        console.log(`正在接收!`);
        if (reaction.message.id === msg_ID) { //如果被做這個反應的訊息是我選定的訊息
            console.log(`收到公告的add了!`); //debug用，確認有收到reaction
            if (reaction.emoji.name === emoji_ID) { //開始設定每個反應要對應的事情:
                member.roles.add(role_ID); //對這個成員新增LOL這個身分組
                console.log(`添加身分組成功!`); //debug用
            }
        }
    }
    static emoji_to_unrole(member, reaction, msg_ID, role_ID, emoji_ID) {
        console.log(`正在接收!`);
        if (reaction.message.id === msg_ID) { //如果被做這個反應的訊息是我選定的訊息
            console.log(`收到公告的add了!`); //debug用，確認有收到reaction
            if (reaction.emoji.name === emoji_ID) { //開始設定每個反應要對應的事情:
                member.roles.remove(role_ID); //對這個成員新增LOL這個身分組
                console.log(`刪除身分組成功!`); //debug用
            }
        }
    }
    static test() {
        console.log(`正在接收!`);
    }
}
module.exports = { roleAPI }