"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const dtsExt = ".d.ts";
const generateTypeFile = (file) => {
    const { path } = file;
    const typeD = `declare const media: string; export default media;`;
    const typeD_Path = path + dtsExt;
    if (!fs_1.existsSync(typeD_Path)) {
        fs_1.writeFileSync(typeD_Path, typeD);
        return typeD_Path;
    }
    return false;
};
const filter = (config) => {
    const { include, exclude, fileName } = config;
    const lowerCase = fileName.toLowerCase();
    const checkInclude = include.some((ext) => lowerCase.includes(ext.toLowerCase()));
    const checkExclude = exclude.every((ext) => !lowerCase.includes(ext.toLowerCase()));
    return checkInclude && checkExclude;
};
const getAllFiles = (config) => {
    const { include, exclude, dirPath, arrayOfFiles } = config;
    const files = fs_1.readdirSync(dirPath);
    let _arrayOfFiles = arrayOfFiles || [];
    files.forEach((file) => {
        if (fs_1.statSync(dirPath + "/" + file).isDirectory()) {
            _arrayOfFiles = getAllFiles({
                include,
                exclude,
                dirPath: dirPath + "/" + file,
                arrayOfFiles: _arrayOfFiles,
            });
        }
        else {
            if (filter({
                fileName: file,
                include,
                exclude,
            })) {
                const fullName = file;
                const ext = path_1.extname(fullName);
                const name = path_1.basename(fullName, ext);
                const path = path_1.join(dirPath, "/", fullName);
                _arrayOfFiles.push({
                    fullName,
                    name,
                    ext,
                    path,
                });
            }
            // if (__)
        }
    });
    return _arrayOfFiles;
};
const main = async (config) => {
    const { include, exclude, resolveDir } = config;
    let generatedCount = 0;
    const fileList = getAllFiles({ include, exclude, dirPath: resolveDir });
    fileList.forEach((file) => {
        const typeD_Path = generateTypeFile(file);
        if (typeD_Path) {
            generatedCount++;
            console.log(`Generate file: ${typeD_Path}`);
        }
    });
    console.log(`Generated type definition count: ${generatedCount}`);
};
exports.default = main;
