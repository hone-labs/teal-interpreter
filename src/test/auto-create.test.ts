import { autoCreateField } from "../lib/auto-field";

describe("auto create", () => {

    it("can auto create root field", () => {

        const container: any = {};
        const fieldName = "a";
        autoCreateField(container, fieldName, { [fieldName]: 22 });
        expect(container[fieldName]).toEqual(22);
    });

    it("can auto create nested field", () => {

        const container: any = {};
        autoCreateField(container, "a.b.c", { "a": { "b": { "c": 5 } } } );
        expect(container.a.b.c).toEqual(5);
    });
});