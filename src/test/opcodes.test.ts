//
// These tests are derived from the offical TEAL interpreter:
//  https://github.com/algorand/go-algorand/blob/master/data/transactions/logic/eval_test.go
//

import { execute } from "..";

describe("opcode integration tests", () => {

    //
    // Evaluates TEAL code and return true for approval or false for rejection.
    //
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

    //
    // Evaluates TEAL code and throws an exception on rejection.
    //
    function succeeds(tealCode: string) {
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

    //
    // Evaluates TEAL code and throws an exception on approval.
    //
    function fails(tealCode: string) {
        try {
            const result = execute(tealCode);
            console.log(`! got stack:`);
            console.log(result.stack);
    
            if (result.stack.length === 0 && 
                result.stack[0].type === "bigint" &&
                result.stack[0].value === BigInt(0)) {
                return; // Success.
            }
            throw new Error(`Expected a zero result on the stack, got ${result.stack[0].value.toString()} (${result.stack[0].type})`);
        }
        catch {
            // An error thrown is a succesful failure.
        }

        // Success.
    }

    it("invalid program (empty)", () => {
        expect(evaluate("")).toEqual(false);
    });

    it("simple math", () => {
        succeeds("int  2; int 3; + ;int  5;==");
        succeeds("int 22; int 3; - ;int 19;==");
        succeeds("int  8; int 7; * ;int 56;==");
        succeeds("int 21; int 7; / ;int  3;==");
    });

    it("u64 math", () => {
        succeeds("int 0x1234567812345678; int 0x100000000; /; int 0x12345678; ==");
    });

    it("itob", () => {
        succeeds("byte 0x1234567812345678; int 0x1234567812345678; itob; ==")
    });

    it("btoi", () => {
        succeeds("int 0x1234567812345678; byte 0x1234567812345678; btoi; ==");
        succeeds("int 0x34567812345678; byte 0x34567812345678; btoi; ==");
        succeeds("int 0x567812345678; byte 0x567812345678; btoi; ==");
        succeeds("int 0x7812345678; byte 0x7812345678; btoi; ==");
        succeeds("int 0x12345678; byte 0x12345678; btoi; ==");
        succeeds("int 0x345678; byte 0x345678; btoi; ==");
        succeeds("int 0; byte b64(); btoi; ==");
        
        fails("int 0x1234567812345678; byte 0x1234567812345678aa; btoi; ==");
    });

    it("bnz", () => {
        succeeds(`
            int 1
            dup
            bnz safe
            err
            safe:
            int 1
            +
        `);

        succeeds(`
            int 1
            int 2
            int 1
            int 2
            >
            bnz planb
            *
            int 1
            bnz after
            planb:
            +
            after:
            dup
            pop
        `);
    });

    it("sub underflow", () => {
        fails("int 1; int 10; -; pop; int 1");
    });

    it("sha256", () => { // Adapted from Go code.
        succeeds(`
            byte base64 PTCXU4VI6ZFC/ds7MfVarmM/rvJJkwgSlKp+BgiEOWI= //comment
            sha256
            byte base64 5rZMNsevs5sULO+54aN+OvU6lQ503z2X+SSYUABIx7E=
            ==
        `);
    });

    it("ed25519verify", () => {
        // FROM: https://forum.algorand.org/t/need-syntax-example-to-use-ed25519verify-inside-teal/1203
        fails(`
            byte base64 iZWMx72KvU6Bw6sPAWQFL96YH+VMrBA0XKWD9XbZOZI=
            byte base64 if8ooA+32YZc4SQBvIDDY8tgTatPoq4IZ8Kr+We1t38LR2RuURmaVu9D4shbi4VvND87PUqq5/0vsNFEGIIEDA==
            addr 7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224
            ed25519verify
        `);
    });

});