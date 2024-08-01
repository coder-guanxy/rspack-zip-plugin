import {
    mkdirSync,
    existsSync,
    readdirSync,
    createReadStream,
    createWriteStream,
    accessSync,
    constants
} from "fs"
import { join } from "path"

const createDir = mkdirSync

export default function copyFolder(copiedPath: string, targetPath: string) {
    if (existsSync(copiedPath)) {
        // 1.
        createDir(targetPath)
        
        // 2.
        const files = readdirSync(copiedPath, { withFileTypes: true });

        files.forEach(file => {
            const ccp = join(copiedPath, file.name);
            const crp = join(targetPath, file.name);

            if (file.isFile()) {
                const readStream = createReadStream(ccp);
                const writeStream = createWriteStream(crp);

                readStream.pipe(writeStream);
            } else {
                try {
                    accessSync(join(crp, ".."), constants.W_OK);
                    copyFolder(ccp, crp)
                } catch (e) {
                    console.log('folder write error:', e);
                }
            }
        })
            
    } else {
        console.log('do not exist path: ', copiedPath);
    }
}

