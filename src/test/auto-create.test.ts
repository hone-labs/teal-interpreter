import { autoCreateField } from "../lib/auto-field";
import { makeBigInt } from "../lib/context";

describe("auto create", () => {

    it("can auto create root field", () => {

        const container: any = {};
        autoCreateField(container, "a", makeBigInt(BigInt(5)));
        expect(Number(container.a.value)).toEqual(5);
    });

    it("can auto create nested field", () => {

        const container: any = {};
        autoCreateField(container, "a.b.c", makeBigInt(BigInt(5)));
        expect(Number(container.a.b.c.value)).toEqual(5);
    });
});