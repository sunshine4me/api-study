var os = require('os');
var fs = require('fs');
var path = require('path');
const { v4: uuidv4 } = require('uuid');

var child_process = require('child_process')



module.exports = function (code, env) {
    return new Promise(function (resolve, reject) {
        var filepath = path.join(os.tmpdir(), uuidv4());
        console.log(filepath);
        fs.writeFile(filepath, code, function (error) {
            if (error) {
                reject(error);
            } else {
                var args = ["run", "--rm", "-v", `${filepath}:/node_engine/index.js`];
                if (env) {
                    for (var e of env) {
                        args.push("--env");
                        args.push(e);
                    }
                }

                args.push("sunshine4me/node_engine")

                const child = child_process.execFile('docker', args, {
                    timeout: 30000
                }, (error, stdout, stderr) => {
                    if (error && error.signal == "SIGPIPE") {
                        resolve("Execution Timed Out 30 second")
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