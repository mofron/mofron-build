#!/usr/bin/env node
const { exec } = require("child_process");

/* convert mofron tag to js */
console.log("*** convert mofron tag to javascript");
let tag_tgt  = (undefined !== process.argv[2]) ? process.argv[2] : "index";
let exec_cmd = "npx mofron-tag ./mof/" + tag_tgt + ".mf ./js/"+ tag_tgt +".js";
console.log(exec_cmd);
exec(exec_cmd, (err, stdout, stderr) => {
    if (0 < stderr.length) {
        console.log(stderr);
        return;
    } else if (0 < stdout.length) {
        console.log(stdout);
    }
    console.log("\n");
    bundle();
});

let bundle = () => {
    /* bundle js */
    console.log("*** bundling javascript");
    let mode = (undefined !== process.argv[3]) ? process.argv[3] : "development";
    exec_cmd = "npx webpack --config " + __dirname + "/../../conf/webpack.config." + tag_tgt + ".js --mode " + mode;
    console.log(exec_cmd);
    exec(exec_cmd, (err, stdout, stderr) => {
        if (0 < stderr.length) {
            console.log(stderr);
            return;
        } else if (0 < stdout.length) {
            console.log(stdout);
        }
    });
}
/* end of file */
