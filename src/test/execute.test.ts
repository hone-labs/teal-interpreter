import { execute } from "..";

describe("teal interpreter", () => {

    it("executing empty file results in empty stack", () => {

        const result = execute("");
        expect(result.stack).toEqual([ ]);
    });

    it("can push 1 on stack", ()  => {

        const result = execute("int 1");
        expect(result.stack.length).toEqual(1);
        expect(Number(result.stack[0])).toEqual(1);
    });

    it("unrecognised opcode throws", () => {

        expect(() => execute("foobar")).toThrow();
    });

});
