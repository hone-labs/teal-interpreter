//
// These tests are derived from the offical TEAL interpreter:
//  https://github.com/algorand/go-algorand/blob/master/data/transactions/logic/eval_test.go
//

import { execute } from "..";

describe("opcode integration tests", () => {

    function evaluate(tealCode: string): boolean {
        const result = execute(tealCode);
        if (result.stack.length !== 1) {
            return false;
        }

        if (result.stack[0].type === "bigint" &&
            result.stack[0].value === BigInt(0)) {
            return false;
        }

        return true;
    }

    function expectSuccessfulEval(tealCode: string) {
        const result = execute(tealCode);
        if (result.stack.length !== 1) {
            throw new Error(`Expected a single result on the stack, got ${result.stack.length}\r\nStack:\r\n${result.stack.toString()}`);
        }

        if (result.stack[0].type !== "bigint" ||
            result.stack[0].value === BigInt(0)) {
            throw new Error(`Expected a non-zero result on the stack, got ${result.stack[0].value.toString()} (${result.stack[0].type})`);
        }

        // Success.
    }

    function expectFailedEval(tealCode: string) {
        const result = execute(tealCode);
        if (result.stack.length !== 1) {
            throw new Error(`Expected a single result on the stack, got ${result.stack.length}\r\nStack:\r\n${result.stack.toString()}`);
        }

        if (result.stack[0].type !== "bigint" ||
            result.stack[0].value !== BigInt(0)) {
            throw new Error(`Expected a zero result on the stack, got ${result.stack[0].value.toString()} (${result.stack[0].type})`);
        }

        // Success.
    }

    it("invalid program (empty)", () => {
        expect(evaluate("")).toEqual(false);
    });

    it("simple math", () => {
        expectSuccessfulEval("int  2; int 3; + ;int  5;==");
        expectSuccessfulEval("int 22; int 3; - ;int 19;==");
        expectSuccessfulEval("int  8; int 7; * ;int 56;==");
        expectSuccessfulEval("int 21; int 7; / ;int  3;==");
    });

    it("u64 math", () => {
        expectSuccessfulEval("int 0x1234567812345678; int 0x100000000; /; int 0x12345678; ==");
    });

    it("itob", () => {
        expectSuccessfulEval("byte 0x1234567812345678; int 0x1234567812345678; itob; ==")
    });

});