import { exec } from "child_process";
import dedent = require("dedent");
import { execute } from "..";

describe("teal interpreter", () => {

    it("executing empty file results in empty stack", () => {

        const result = execute("");
        expect(result.stack).toEqual([]);
    });

    it("can push 1 on stack", ()  => {

        const result = execute("int 1");
        expect(result.stack.length).toEqual(1);
        expect(Number(result.stack[0])).toEqual(1);
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
        expect(Number(result.stack[0])).toEqual(4);
        expect(Number(result.stack[1])).toEqual(5);
    });

    it("can pop a value from the stack", () => {
        const result = execute(dedent(`
            int 10
            pop
        `));     
        expect(result.stack).toEqual([]);       
    });

   
});
