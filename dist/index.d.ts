declare type DtsForWebpackGeneratorConfig = {
    include: string[];
    exclude: string[];
    resolveDir: string;
};
declare const DTSWebpackGenerator: (config: DtsForWebpackGeneratorConfig) => Promise<void>;
export default DTSWebpackGenerator;
export type { DtsForWebpackGeneratorConfig };
