"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const stream = process.stdout;
const zip = compressing_1.default.zip;
class RspackZipPlugin {
    constructor(options = {}) {
        var _a, _b, _c, _d;
        this.targetPath = "";
        this.destPath = (_a = options.destPath) !== null && _a !== void 0 ? _a : (0, path_1.join)(process.cwd(), "./dist.zip");
        this.handleError = (_b = options.onError) !== null && _b !== void 0 ? _b : defaultHandleError;
        this.handleSuccess = (_c = options.onSuccess) !== null && _c !== void 0 ? _c : defaultHandleSuccess;
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
            .on("close", () => this.handleSuccess(to));
    }
}
exports.RspackZipPlugin = RspackZipPlugin;
const defaultHandleError = (e) => {
    Promise.resolve().then(() => __importStar(require("chalk"))).then(({ default: chalk }) => {
        stream.write(chalk.yellow.bold("┓(;´_｀)┏  zip error!!!" + e));
    });
};
const defaultHandleSuccess = (path) => {
    console.log("onEnd");
    // @ts-ignore
    Promise.resolve().then(() => __importStar(require("chalk"))).then(({ default: chalk }) => {
        stream.write(chalk.green.bold("zip is success in  " + path + "\n\n"));
    });
};
