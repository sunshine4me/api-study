var os = require('os');
var fs = require('fs');
var path = require('path');
const { v4: uuidv4 } = require('uuid');

var child_process = require('child_process')



module.exports = function (code) {
    return new Promise(function (resolve, reject) {
        var filepath = path.join(os.tmpdir(), uuidv4());
        console.log(filepath);
        fs.writeFile(filepath, code, function (error) {
            if (error) {
                reject(error);
            } else {
                const child = child_process.execFile('docker', ["run", "--rm", "-v", `${filepath}:/node_engine/index.js`, "--env", "GRUNT_PATH=980", "sunshine4me/node_engine"], {
                    timeout: 5000
                }, (error, stdout, stderr) => {
                    if (error && error.signal == "SIGPIPE") {
                        resolve("Execution Timed Out")
                    }
                    if (stderr) {
                        resolve(stderr)
                    } else {
                        resolve(stdout)
                    }
                });


            }

        })
    });



}