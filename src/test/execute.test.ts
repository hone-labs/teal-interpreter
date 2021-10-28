import { execute } from "..";

describe("teal interpreter", () => {

    it("executing empty file results in empty stack", () => {

        const result = execute("");
        expect(result.stack).toEqual([ ]);
    });

});
