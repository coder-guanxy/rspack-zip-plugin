"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = copyFolder;
const fs_1 = require("fs");
const path_1 = require("path");
const createDir = fs_1.mkdirSync;
function copyFolder(copiedPath, targetPath) {
    if ((0, fs_1.existsSync)(copiedPath)) {
        // 1.
        createDir(targetPath);
        // 2.
        const files = (0, fs_1.readdirSync)(copiedPath, { withFileTypes: true });
        files.forEach(file => {
            const ccp = (0, path_1.join)(copiedPath, file.name);
            const crp = (0, path_1.join)(targetPath, file.name);
            if (file.isFile()) {
                const readStream = (0, fs_1.createReadStream)(ccp);
                const writeStream = (0, fs_1.createWriteStream)(crp);
                readStream.pipe(writeStream);
            }
            else {
                try {
                    (0, fs_1.accessSync)((0, path_1.join)(crp, ".."), fs_1.constants.W_OK);
                    copyFolder(ccp, crp);
                }
                catch (e) {
                    console.log('folder write error:', e);
                }
            }
        });
    }
    else {
        console.log('do not exist path: ', copiedPath);
    }
}
