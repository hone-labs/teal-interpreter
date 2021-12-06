
import { ITypedValue } from "./context";

//
// Automatically creates a missing field in the context.
//
export function autoCreateField(container: any, fieldPath: string, value: ITypedValue): void {
    const parts = fieldPath.split(".");
    const fieldName = parts.pop()!;
    let working = container;
    for (const part of parts) {
        if (working[part] === undefined) {
            working[part] = {};
        }
        working = working[part];
    }

    working[fieldName] = value;
}
