#!/usr/bin/env node
const cli_arg = require('command-line-args');
const { exec } = require("child_process");

let mofron = null;
let mfout  = null;
let config = null;
let spa    = "";

if (2 === process.argv.length) {
    mofron = "./mof/index.mf";
    mfout  = "./js/index.js";
    config = "./conf/webpack.config.index.js";
} else if (3 === process.argv.length) {
    mofron = "./mof/" + process.argv[2] + ".mf";
    mfout  = "./js/" + process.argv[2] + ".js";
    config = "./conf/webpack.config." + process.argv[2] + ".js";
} else {
    const def_opt = [
        { name: 'mofron', alias: 'm', type: String },
        { name: 'mfout',  alias: 'o', type: String },
        { name: 'config', alias: 'c', type: String },
	{ name: 'spa',    alias: 's', type: String },
    ];
    const options = cli_arg(def_opt);
    mofron = options.mofron;
    mfout  = options.mfout;
    config = options.config;
    spa    = (undefined === options.spa) ? "" : "--spa";
}

/* convert mofron tag to js */
console.log("*** convert mofron tag to javascript");
let exec_cmd = "npx mofron-tag " + mofron + " " + mfout + " " + spa;
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

    exec_cmd = "npx webpack --config " + config;
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
