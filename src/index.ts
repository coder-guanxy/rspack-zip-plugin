import compressing  from "compressing"
import type {  Compiler, RspackPluginInstance } from "@rspack/core"
import { join as PathJoin } from "path"
import copyFolder from './utils/copyFolder';
import { createWriteStream, existsSync } from "fs"
import { rimrafSync } from "rimraf"
import chalk from "chalk"

const stream = process.stdout;
const zip = compressing.zip;

export interface RspackZipOption {
    destPath?: string,
    noZip?: boolean,
    clean?: boolean,
    onError?: (e: Error) => void,
    onFinish?: (path: string) => void
}

export class RspackZipPlugin implements RspackPluginInstance {
    private destPath: string;
    private handleError: NonNullable<RspackZipOption["onError"]>;
    private handleFinish: NonNullable<RspackZipOption["onFinish"]>;
    private targetPath = "";
    private noZip: boolean;
    private clean: boolean;
    constructor(options: RspackZipOption = {}) {
        this.destPath = options.destPath ?? PathJoin(process.cwd(), "./dist.zip");
        this.handleError = options.onError ?? defaultHandleError;
        this.handleFinish = options.onFinish ?? defaultHandleFinish!;
        this.noZip = options.noZip ?? false;
        this.clean = options.clean || true;
    }

    apply(compiler: Compiler) {
        compiler.hooks.done.tap("RspackZipPlugin", () => {
            this.targetPath = compiler.outputPath;

            // clean
            if (this.clean && existsSync(this.destPath)) {
                rimrafSync(this.destPath)
            }

            if (this.noZip) {
                copyFolder(this.targetPath, this.destPath)
            } else {
                this.zipCompressDir(this.targetPath, this.destPath)
            }
        })
    }

    private zipCompressDir(from: string, to: string) {
        const zipStream = new zip.Stream();
        zipStream.addEntry(from);
        zipStream
            .on("error", this.handleError)
            .pipe(createWriteStream(to))
            .on("error", this.handleError)
            .on("finish", () => this.handleFinish(to))

    }
}

const defaultHandleError = (e: Error) => {
    stream.write(
        chalk.yellow.bold("┓(;´_｀)┏  zip error!!!" + e)
    )
}

const defaultHandleFinish = (path: string) => {
    stream.write(
        chalk.green.bold("zip is success in  " + path + "\n\n")
    )
}
