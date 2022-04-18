var fs = require('fs');
class jsonAPI { //node.js 的檔案系統，能夠幫助存取、讀取檔案
    //const fs = require('fs');

    //真實用戶ID 必然是隨機生成且不重複的，這邊我先用手動強制規定的方式生成

    //寫入以上 json 文件選項
    static writeJSON(newData) {
        console.log('test');
        //先將原本的 json 檔讀出來
        fs.readFile('./openAPI.json', function (err, dataInfo) {
            if (err) {
                return console.error(err);
            }
            //將二進制數據轉換為字串符
            var data = dataInfo.toString();
            //將字符串轉換為 JSON 對象
            data = JSON.parse(data);
            //將傳來的資訊推送到數組對象中
            data.dataInfo.push(newData);
            data.total = data.dataInfo.length;
            console.log(data.dataInfo);
            //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
            var str = JSON.stringify(data);
            //將字串符傳入您的 json 文件中
            fs.writeFile('./openAPI.json', str, function (err) {
                if (err) {
                    console.error(err);
                }
                console.log('Add new data to dataInfo...')
            })
        })
    }

    static deleteJSON(id) {
        //先將原本的 json 檔讀出來
        fs.readFile('./openAPI.json', function (err, dataInfo) {
            if (err) {
                return console.error(err);
            }
            //將二進制數據轉換為字串符
            var data = dataInfo.toString();
            //將字符串轉換成JSON對象
            data = JSON.parse(data);

            //將數據讀出來並刪除指定部分
            for (var i = 0; i < data.dataInfo.length; i++) {
                if (id == data.dataInfo[i].id) {
                    //console.log(data.dataInfo[i])
                    data.dataInfo.splice(i, 1);
                }
            }
            console.log(data.dataInfo);
            //因為寫入文件（json）只認識字符串或二進制數，所以需要將json對象轉換成字符串
            var str = JSON.stringify(data);

            //最後再將數據寫入
            fs.writeFile('./openAPI.json', str, function (err) {
                if (err) {
                    console.error(err);
                }
                console.log('delete data in dataInfo...')
            })
        })
    }
    
    static improtJSON(filePath){
        var dataJSON = require(filePath);
        return dataJSON;
    }

    static searchJSON(data, dataName){
        //return data.dataName;
        return data[dataName];
    }

}
module.exports = { jsonAPI }
    //writeJSON(newdata)
    //deleteJSON(3);