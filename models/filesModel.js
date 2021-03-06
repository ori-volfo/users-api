var fs = require('fs');

exports.writeToFile = function(fileName,dataObj){
    fs.appendFile('./files/'+fileName, '\n'+JSON.stringify(dataObj), function (err) {
        if (err) throw err;
        console.log(`File ${fileName} is updated!`);
    });
};

exports.makeDir = function(dirName){
    if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }
};