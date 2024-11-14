import { load as yamlLoad, dump as yamlDump } from 'js-yaml';

export type Format = 'json' | 'yaml';
export type Mode = 'convert' | 'validate';

export const convertFormat = (content: string, from: Format, to: Format): string => {
    try {
        if (!content.trim()) {
            return '';
        }

        // Parse the input
        const parsed = from === 'json' ? JSON.parse(content) : yamlLoad(content);

        // Convert to the target format
        if (to === 'json') {
            return JSON.stringify(parsed, null, 2);
        } else {
            return yamlDump(parsed, {
                indent: 2,
                lineWidth: -1,
                noRefs: true,
                sortKeys: true,
            });
        }
    } catch (error: any) {
        throw new Error(`Conversion failed: ${error.message}`);
    }
};

export const validateAndFormat = (content: string, format: Format): string => {
    try {
        if (!content.trim()) {
            return '';
        }

        const parsed = format === 'json' ? JSON.parse(content) : yamlLoad(content);
        return format === 'json'
            ? JSON.stringify(parsed, null, 2)
            : yamlDump(parsed, {
                indent: 2,
                lineWidth: -1,
                noRefs: true,
                sortKeys: true,
            });
    } catch (error: any) {
        throw new Error(`Validation failed: ${error.message}`);
    }
};

export const validateFormat = (content: string, format: Format): boolean => {
    try {
        if (!content.trim()) return true;
        if (format === 'json') {
            JSON.parse(content);
        } else {
            yamlLoad(content);
        }
        return true;
    } catch {
        return false;
    }
};