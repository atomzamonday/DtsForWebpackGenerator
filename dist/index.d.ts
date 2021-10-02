declare type DtsForWebpackGeneratorConfig = {
    include: string[];
    exclude: string[];
    resolveDir: string;
};
declare const main: (config: DtsForWebpackGeneratorConfig) => Promise<void>;
export default main;
export type { DtsForWebpackGeneratorConfig };
