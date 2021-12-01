
//
// Finds the default configuration value for a particular path give an spec.
//
export function getDefaultValue(fieldPath: string, defaultValueSpec: any): any {
    let working: any = defaultValueSpec;
    const parts = fieldPath.split(".");
    const fieldName = parts.pop()!;

    for (const part of parts) {
        if (working[part] !== undefined) {
            working = working[part];
            continue;
        }

        if (working["*"] !== undefined) {
            working = working["*"];
            continue;
        }

        break;
    }

    const exactMatch = working[fieldName];
    if (exactMatch !== undefined) {
        if (typeof(exactMatch) === "function") {
            return exactMatch();
        }
        else {
            return exactMatch;
        }
    }

    const wildcardMatch = working["*"];
    if (wildcardMatch !== undefined) {
        if (typeof(wildcardMatch) === "function") {
            return wildcardMatch();
        }
        else {
            return wildcardMatch;
        }
    }

    throw new Error(`Failed to find default for ${fieldPath}`);
}