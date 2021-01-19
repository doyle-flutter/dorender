module.exports = app.engine('do', function (filePath, option, callback) { // define the template engine
        var fs = require('fs');
        fs.readFile(filePath, function (err, content) {
            if (err) return callback(err);
            var m = Object.entries(option).map((value, index) => {
                if(value[0] === "_locals" || value[0] === "cache" || value[0] === "settings") return;
                return value;
            }).filter((ele, index) => { if(ele != null) return ele; });
            var result = content.toString();
            m.forEach((ele, index) => result = result.split(`#${ele[0]}`).join(ele[1]));
            return callback(null, result);
        });
    });