import { join, basename, extname } from "path";
import { readdirSync, writeFileSync, statSync, existsSync } from "fs";

type DtsForWebpackGeneratorConfig = {
  include: string[];
  exclude: string[];
  resolveDir: string;
};

const dtsExt = ".d.ts";

const generateTypeFile = (file: File) => {
  const { path } = file;
  const typeD = `declare const media: string; export default media;`;
  const typeD_Path = path + dtsExt;
  if (!existsSync(typeD_Path)) {
    writeFileSync(typeD_Path, typeD);
    return typeD_Path;
  }
  return false;
};

type File = {
  fullName: string;
  name: string;
  ext: string;
  path: string;
};

const filter = (config: { include: string[]; exclude: string[]; fileName: string }) => {
  const { include, exclude, fileName } = config;
  const lowerCase = fileName.toLowerCase();
  const checkInclude = include.some((ext) => lowerCase.includes(ext.toLowerCase()));
  const checkExclude = exclude.every((ext) => !lowerCase.includes(ext.toLowerCase()));
  return checkInclude && checkExclude;
};

const getAllFiles = (config: {
  include: string[];
  exclude: string[];
  dirPath: string;
  arrayOfFiles?: File[];
}) => {
  const { include, exclude, dirPath, arrayOfFiles } = config;

  const files = readdirSync(dirPath);
  let _arrayOfFiles: File[] = arrayOfFiles || [];

  files.forEach((file) => {
    if (statSync(dirPath + "/" + file).isDirectory()) {
      _arrayOfFiles = getAllFiles({
        include,
        exclude,
        dirPath: dirPath + "/" + file,
        arrayOfFiles: _arrayOfFiles,
      });
    } else {
      if (
        filter({
          fileName: file,
          include,
          exclude,
        })
      ) {
        const fullName = file;
        const ext = extname(fullName);
        const name = basename(fullName, ext);
        const path = join(__dirname, dirPath, "/", fullName);
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

const main = async (config: DtsForWebpackGeneratorConfig) => {
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

export default main;
export type { DtsForWebpackGeneratorConfig };
