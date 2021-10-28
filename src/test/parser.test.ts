import { parse } from "..";

describe("teal parser", () => {

    it("parsing empty program results in no output", () => {

        const result = parse("");
        expect(result.instructions).toEqual([]);
    });

});
