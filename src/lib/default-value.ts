
//
// Finds the default configuration value for a particular path give an spec.
//
export function getDefaultValue(fieldPath: string, defaultValueSpec: any): any {
    let working: any = defaultValueSpec;
    const parts = fieldPath.split(".");
    const walkPath: string[] = [];

    for (const part of parts) {
        if (working[part] !== undefined) {
            walkPath.push(part);
            working = working[part];
            continue;
        }

        if (working["*"] !== undefined) {
            walkPath.push("*");
            working = working["*"];
            continue;
        }

        working = undefined;
        break;
    }

    if (working !== undefined) {
        if (typeof(working) === "function") {
            return working();
        }
        else {
            return working;
        }
    }

    throw new Error(`Failed to find default for "${fieldPath}", to the default value spec. Walked the following path "${walkPath.join(".")}, but failed to find a constructor.`);
}

