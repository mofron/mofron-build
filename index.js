#!/usr/bin/env node
const { exec } = require("child_process");

/* convert mofron tag to js */
console.log("*** convert mofron tag to javascript");
console.log(process.argv.length);
//if (3 === process.argv.length) {
//    
//} else {
//    
//}

let tag_tgt  = (undefined !== process.argv[2]) ? process.argv[2] : "index";
let cnf_tgt  = (undefined !== process.argv[3]) ? process.argv[3] : tag_tgt;
if (("production" === cnf_tgt) || ("development" === cnf_tgt)) {
    cnf_tgt  = tag_tgt;
}

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
    let mode = process.argv[process.argv.length-1];
    if (("production" !== mode) && ("development" !== mode)) {
        mode = "development";
    }

    exec_cmd = "npx webpack --config " + __dirname + "/../../conf/webpack.config." + cnf_tgt + ".js --mode " + mode;
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
