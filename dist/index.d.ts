import type { Compiler, RspackPluginInstance } from "@rspack/core";
export interface RspackZipOption {
    destPath?: string;
    noZip?: boolean;
    clean?: boolean;
    onError?: (e: Error) => void;
    onFinish?: (path: string) => void;
}
export declare class RspackZipPlugin implements RspackPluginInstance {
    private destPath;
    private handleError;
    private handleFinish;
    private targetPath;
    private noZip;
    private clean;
    constructor(options?: RspackZipOption);
    apply(compiler: Compiler): void;
    private zipCompressDir;
}
