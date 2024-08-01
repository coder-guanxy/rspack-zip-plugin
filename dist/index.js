"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RspackZipPlugin = void 0;
const compressing_1 = __importDefault(require("compressing"));
const path_1 = require("path");
const copyFolder_1 = __importDefault(require("./utils/copyFolder"));
const fs_1 = require("fs");
const rimraf_1 = require("rimraf");
const chalk_1 = __importDefault(require("chalk"));
const stream = process.stdout;
const zip = compressing_1.default.zip;
class RspackZipPlugin {
    constructor(options = {}) {
        var _a, _b, _c, _d;
        this.targetPath = "";
        this.destPath = (_a = options.destPath) !== null && _a !== void 0 ? _a : (0, path_1.join)(process.cwd(), "./dist.zip");
        this.handleError = (_b = options.onError) !== null && _b !== void 0 ? _b : defaultHandleError;
        this.handleFinish = (_c = options.onFinish) !== null && _c !== void 0 ? _c : defaultHandleFinish;
        this.noZip = (_d = options.noZip) !== null && _d !== void 0 ? _d : false;
        this.clean = options.clean || true;
    }
    apply(compiler) {
        compiler.hooks.done.tap("RspackZipPlugin", () => {
            this.targetPath = compiler.outputPath;
            // clean
            if (this.clean && (0, fs_1.existsSync)(this.destPath)) {
                (0, rimraf_1.rimrafSync)(this.destPath);
            }
            if (this.noZip) {
                (0, copyFolder_1.default)(this.targetPath, this.destPath);
            }
            else {
                this.zipCompressDir(this.targetPath, this.destPath);
            }
        });
    }
    zipCompressDir(from, to) {
        const zipStream = new zip.Stream();
        zipStream.addEntry(from);
        zipStream
            .on("error", this.handleError)
            .pipe((0, fs_1.createWriteStream)(to))
            .on("error", this.handleError)
            .on("finish", () => this.handleFinish(to));
    }
}
exports.RspackZipPlugin = RspackZipPlugin;
const defaultHandleError = (e) => {
    stream.write(chalk_1.default.yellow.bold("┓(;´_｀)┏  zip error!!!" + e));
};
const defaultHandleFinish = (path) => {
    stream.write(chalk_1.default.green.bold("zip is success in  " + path + "\n\n"));
};
