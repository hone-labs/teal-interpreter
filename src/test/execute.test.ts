import { execute } from "../lib/execute";
import dedent = require("dedent");

describe("teal interpreter", ()  => {

    it("executing empty file results in empty stack", async ()  => {

        const result = await execute("");
        expect(result.stack).toEqual([]);
    });

    it("can execute code with blank line 1", async ()  => {

        const result = await execute("\n");
        expect(result.stack).toEqual([]);
    });

    it("can execute code with blank line 2", async ()  => {

        const result = await execute("\r\n");
        expect(result.stack).toEqual([]);
    });

    it("can push 1 on stack", async ()  => {

        const result = await execute("int 1");
        expect(result.stack.length).toEqual(1);
        expect(Number(result.stack[0]?.value)).toEqual(1);
    });

    it("can add numbers", async ()  => {

        const result = await execute(dedent(`
            int 2
            int 3
            +
        `));
        expect(result.stack.length).toEqual(1);
        expect(Number(result.stack[0]?.value)).toEqual(5);
    });

    it("can add numbers with Windows style line endings", async ()  => {

        const result = await execute(dedent(`int 2\r\nint 3\r\n+`));
        expect(result.stack.length).toEqual(1);
        expect(Number(result.stack[0]?.value)).toEqual(5);
    });

    it("unrecognised opcode throws", async ()  => {

        await expect(() => execute("foobar")).rejects.toThrow();
    });

    it("can execute multiple instructions", async ()  => {

        const result = await execute(dedent(`
            int 4
            int 5
        `));            
            
        expect(result.stack.length).toEqual(2);
        expect(Number(result.stack[0]?.value)).toEqual(4);
        expect(Number(result.stack[1]?.value)).toEqual(5);
    });

    it("can pop a value from the stack", async ()  => {
        const result = await execute(dedent(`
            int 10
            pop
        `));     
        expect(result.stack).toEqual([]);       
    });

    it("can execute version pragma", async ()  => {
        const result = await execute(dedent(`
            #pragma version 4
        `));
        expect(result.version).toEqual(4);
    });

});
