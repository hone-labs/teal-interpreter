import { execute } from "../lib/execute";
import dedent = require("dedent");

describe("teal interpreter", () => {

    it("executing empty file results in empty stack", () => {

        const result = execute("");
        expect(result.stack).toEqual([]);
    });

    it("can push 1 on stack", ()  => {

        const result = execute("int 1");
        expect(result.stack.length).toEqual(1);
        expect(Number(result.stack[0]?.value)).toEqual(1);
    });

    it("can add numbers", ()  => {

        const result = execute(dedent(`
            int 2
            int 3
            +
        `));
        expect(result.stack.length).toEqual(1);
        expect(Number(result.stack[0]?.value)).toEqual(5);
    });

    it("unrecognised opcode throws", () => {

        expect(() => execute("foobar")).toThrow();
    });

    it("can execute multiple instructions", () => {

        const result = execute(dedent(`
            int 4
            int 5
        `));            
            
        expect(result.stack.length).toEqual(2);
        expect(Number(result.stack[0]?.value)).toEqual(4);
        expect(Number(result.stack[1]?.value)).toEqual(5);
    });

    it("can pop a value from the stack", () => {
        const result = execute(dedent(`
            int 10
            pop
        `));     
        expect(result.stack).toEqual([]);       
    });

    it("can execute version pragma", () => {
        const result = execute(dedent(`
            #pragma version 4
        `));
        expect(result.version).toEqual(4);
    });
   
});
