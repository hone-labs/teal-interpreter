import dedent = require("dedent");
import { TealInterpreter } from "../lib/interpreter";

describe("teal interpreter", () => {

    it("can execute teal code", () => {

        const interpreter = new TealInterpreter();
        interpreter.load("int 6");
        expect(interpreter.step()).toEqual(true);
        expect(interpreter.context.stack.length).toEqual(1);
        expect(Number(interpreter.context.stack[0]?.value)).toEqual(6);
    });

    it("step returns false when no program is loaded", () => {

        const interpreter = new TealInterpreter();
        expect(interpreter.step()).toEqual(false);
    });

    it("step returns false when no program has finished", () => {

        const interpreter = new TealInterpreter();
        interpreter.load(dedent(`
            int 1
            int 2
        `));

        expect(interpreter.step()).toEqual(true);
        expect(interpreter.step()).toEqual(true);
        expect(interpreter.step()).toEqual(false);
    });

    it("can maintain current instruction index", () => {

        const interpreter = new TealInterpreter();
        interpreter.load(dedent(`
            int 1
            int 2
        `));

        expect(interpreter.curInstructionIndex).toEqual(0);

        interpreter.step();

        expect(interpreter.curInstructionIndex).toEqual(1);
        
        interpreter.step();

        expect(interpreter.curInstructionIndex).toEqual(2);
    });

    it("can maintain current line index", () => {

        const interpreter = new TealInterpreter();
        interpreter.load(dedent(`
            int 1
            int 2
        `));

        expect(interpreter.getCurLineNo()).toEqual(1);

        interpreter.step();

        expect(interpreter.getCurLineNo()).toEqual(2);
        
        interpreter.step();

    });

    it("current line is undefined when no program is loaded", () => {

        const interpreter = new TealInterpreter();

        expect(interpreter.getCurLineNo()).toEqual(undefined);
    });

    it("current line is undefined at end", () => {

        const interpreter = new TealInterpreter();
        interpreter.load(dedent(`
            int 1
        `));

        interpreter.step();

        expect(interpreter.getCurLineNo()).toEqual(undefined);
    });

    it("can execute jump to target", () => {

        const interpreter = new TealInterpreter();
        interpreter.load(dedent(`
            int 1
            b a-label
            int 2
            a-label:
            int 3
        `));

        interpreter.step(); // int 1
        interpreter.step(); // b a-label
        interpreter.step(); // int 3

        expect(interpreter.context.stack.length).toEqual(2);
        expect(Number(interpreter.context.stack[0]?.value)).toEqual(1);
        expect(Number(interpreter.context.stack[1]?.value)).toEqual(3);
    });

    it("return instruction can request that execution complete", () => {

        const interpreter = new TealInterpreter();
        interpreter.load(dedent(`
            int 1
            return
        `));

        expect(interpreter.step()).toEqual(true);
        expect(interpreter.step()).toEqual(false);
    });

});
