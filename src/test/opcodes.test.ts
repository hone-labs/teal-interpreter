//
// These tests are derived from the offical TEAL interpreter:
//  https://github.com/algorand/go-algorand/blob/master/data/transactions/logic/eval_test.go
//

import { execute, IExecutionContext } from "..";

describe("opcode integration tests", () => {

    //
    // Evaluates TEAL code and return true for approval or false for rejection.
    //
    async function evaluate(tealCode: string): Promise<boolean> {
        const result = await execute(tealCode);
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
    // Allows JSON.stringify to serialize a BigInt.
    //
    function serializeBigInt(key: string, value: any): any {
        return typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    };

    //
    // Evaluates TEAL code and throws an exception on rejection.
    //
    async function succeeds(tealCode: string): Promise<void> {
        const result = await execute(tealCode);
        if (result.stack.length !== 1) {
            throw new Error(`Expected 1 result left on the stack, got ${result.stack.length}\r\nStack:\r\n${JSON.stringify(result.stack, serializeBigInt, 4)}`);
        }

        if (result.stack[0].type !== "bigint" ||
            result.stack[0].value === BigInt(0)) {
            throw new Error(`Expected a non-zero result on the stack, got ${result.stack[0].value.toString()} (${result.stack[0].type})\r\nStack:\r\n${JSON.stringify(result.stack, serializeBigInt, 4)}`);
        }

        // Success.
    }

    //
    // Evaluates TEAL code and throws an exception on approval.
    //
    async function fails(tealCode: string): Promise<void> {
        
        let result: IExecutionContext | undefined;
        try {
            result = await execute(tealCode);   
        }
        catch {
            // An error thrown is a failure.
        }

        if (result && result.stack.length === 1) {
            if (result.stack[0].type === "bigint" &&
                result.stack[0].value !== BigInt(0)) {
                // Success, but not what we expected!
                throw new Error(`Expected a zero result on the stack, got ${result.stack[0].value.toString()} (${result.stack[0].type})`);
            }
        }

        // Failed, what we expected!
    }

    it("invalid program (empty)", async () => {
        expect(await evaluate("")).toEqual(false);
    });

    it("simple math", async () => {
        await succeeds("int  2; int 3; + ;int  5;==");
        await succeeds("int 22; int 3; - ;int 19;==");
        await succeeds("int  8; int 7; * ;int 56;==");
        await succeeds("int 21; int 7; / ;int  3;==");
    });

    it("u64 math", async () => {
        await succeeds("int 0x1234567812345678; int 0x100000000; /; int 0x12345678; ==");
    });

    it("itob", async () => {
        await succeeds("byte 0x1234567812345678; int 0x1234567812345678; itob; ==")
    });

    it("btoi", async () => {
        await succeeds("int 0x1234567812345678; byte 0x1234567812345678; btoi; ==");
        await succeeds("int 0x34567812345678; byte 0x34567812345678; btoi; ==");
        await succeeds("int 0x567812345678; byte 0x567812345678; btoi; ==");
        await succeeds("int 0x7812345678; byte 0x7812345678; btoi; ==");
        await succeeds("int 0x12345678; byte 0x12345678; btoi; ==");
        await succeeds("int 0x345678; byte 0x345678; btoi; ==");
        await succeeds("int 0; byte b64(); btoi; ==");
        
        await fails("int 0x1234567812345678; byte 0x1234567812345678aa; btoi; ==");
    });

    it("bnz", async () => {
        await succeeds(`
            int 1
            dup
            bnz safe
            err
            safe:
            int 1
            +
        `);

        await succeeds(`
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

    it("sub underflow", async () => {
        await fails("int 1; int 10; -; pop; int 1");
    });

    it("sha256", async () => { // Adapted from Go code.
        await succeeds(`
            byte base64 PTCXU4VI6ZFC/ds7MfVarmM/rvJJkwgSlKp+BgiEOWI= //comment
            sha256
            byte base64 5rZMNsevs5sULO+54aN+OvU6lQ503z2X+SSYUABIx7E=
            ==
        `);
    });

    it("keccak256", async () => {
        await succeeds(`
            byte 0x666E6F7264; keccak256
            byte 0xc195eca25a6f4c82bfba0287082ddb0d602ae9230f9cf1f1a40b68f8e2c41567; ==
        `)
    });

    it("ed25519verify", async () => {
        // FROM: https://forum.algorand.org/t/need-syntax-example-to-use-ed25519verify-inside-teal/1203
        await fails(`
            byte base64 iZWMx72KvU6Bw6sPAWQFL96YH+VMrBA0XKWD9XbZOZI=
            byte base64 if8ooA+32YZc4SQBvIDDY8tgTatPoq4IZ8Kr+We1t38LR2RuURmaVu9D4shbi4VvND87PUqq5/0vsNFEGIIEDA==
            addr 7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224
            ed25519verify
        `);
    });

    it("intcblock", async () => {
        await succeeds("intcblock 5; intc 0; int 5; ==");
        await succeeds("intcblock 1 2 3 4; intc 2; int 3; ==");
        await succeeds("intcblock 1 2 3 4; intc_0; int 1; ==");
        await succeeds("intcblock 1 2 3 4; intc_1; int 2; ==");
        await succeeds("intcblock 1 2 3 4; intc_2; int 3; ==");
        await succeeds("intcblock 1 2 3 4; intc_3; int 4; ==");
    });

    it("mulw", async () => {
        await succeeds("int 1; int 2; mulw; int 2; ==; assert; int 0; ==");
        await succeeds("int 0x111111111; int 0x222222222; mulw; int 0x468acf130eca8642; ==; assert; int 2; ==");
        await succeeds("int 1; int 0; mulw; int 0; ==; assert; int 0; ==");
        await succeeds("int 0xFFFFFFFFFFFFFFFF; int 0xFFFFFFFFFFFFFFFF; mulw; int 1; ==; assert; int 0xFFFFFFFFFFFFFFFe; ==");
        await succeeds(`
            int 0x111111111
            int 0x222222222
            mulw
            int 0x468acf130eca8642  // compare low (top of the stack)
            ==
            bnz continue
            err
            continue:
            int 2                   // compare high
            ==
            bnz done
            err
            done:
            int 1                   // ret 1
        `);   
    });
    
    it("divmodw", async () => {

        await succeeds(`
            int 2; int 0; int 1; int 0; divmodw;
            int 0; ==; assert;
            int 0; ==; assert;
            int 2; ==; assert;
            int 0; ==; assert; int 1
        `);

        await succeeds(`
            int 2; int 0; int 0; int 1; divmodw;
            int 0; ==; assert;
            int 0; ==; assert;
            int 0; ==; assert;
            int 2; ==; assert; int 1
        `);

        await succeeds(`
            int 0; int 0; int 0; int 7; divmodw;
            int 0; ==; assert;
            int 0; ==; assert;
            int 0; ==; assert;
            int 0; ==; assert; int 1
        `);

        await succeeds( `
            int 18446744073709551615; int 18446744073709551615; int 18446744073709551615; int 18446744073709551615;
            divmodw;
            int 0; ==; assert;
            int 0; ==; assert;
            int 1; ==; assert;
            int 0; ==; assert; int 1
        `);

        await succeeds(`
            int 0; int 7777; int 1; int 0; divmodw;
            int 7777; ==; assert;
            int 0; ==; assert;
            int 0; ==; assert;
            int 0; ==; assert; int 1
        `);

        await fails(`
            int 10; int 0; int 0; int 0; divmodw;
            pop; pop; pop; pop; int 1
        `);
    });

    function makeWideMathCode(v1: number, v2: number) {
        return `
            int ${v1}
            dup
            store 0
            int ${v2}
            dup
            store 1
            mulw
            // add one less than the first number
            load 0
            int 1
            -
            addw
            // stack is now [high word, carry bit, low word]
            store 2
            +				// combine carry and high
            load 2
            // now divmodw by the 1st given number (widened)
            int 0
            load 0
            divmodw
            // remainder should be one less that first number
            load 0; int 1; -;  ==; assert
            int 0; ==; assert		// (upper word)
            // then the 2nd given number is left (widened)
            load 1; ==; assert
            int 0; ==; assert
            // succeed
            int 1
        `;
    }

    it("test wide math", async () => {
        await succeeds(makeWideMathCode(1000, 8192378));
        await succeeds(makeWideMathCode(1082734200, 8192378));
        await succeeds(makeWideMathCode(1000, 8129387292378));
        await succeeds(makeWideMathCode(10278362800, 8192378));

        for (let i = 1; i < 100; i++) {
            for (let j = 1; i < 100; i++) {
                await succeeds(makeWideMathCode(i+j<<40, (i*j)<<40+j));
            }
        }   
    });

    it("test mul div", async () => {

        const muldiv = `
            muldiv:
            mulw				// multiply B*C. puts TWO u64s on stack
            int 0				// high word of C as a double-word
            dig 3				// pull C to TOS
            divmodw
            pop				// pop unneeded remainder low word
            pop                             // pop unneeded remainder high word
            swap
            int 0
            ==
            assert				// ensure high word of quotient was 0
            swap				// bring C to surface
            pop				// in order to get rid of it
            retsub
        `;

        await succeeds("int 5; int 8; int 10; callsub muldiv; int 16; ==; return;" + muldiv);
        await fails("int 5; int 8; int 10; callsub muldiv; int 15; ==; return;" + muldiv);
        await succeeds("int 500000000000; int 80000000000; int 100000000000; callsub muldiv; int 16000000000; ==; return;" + muldiv);
    });

    it("test div zero", async () => {
        await fails("int 0x11; int 0; /; pop; int 1");
    });

    it("test mod zero", async () => {
        await fails("int 0x111111111; int 0; %; pop; int 1");
    });

    it("test err", async () => {
        await fails("err; int 1");
    });

    it("test pop", async () => {
        await succeeds("int 1; int 0; pop");
    });

    it("test stack left over", async () => {
        await fails("int 1; int 1");
    })

    it("test bytes left over", async () => {
        await fails("byte 0x10101010");
    });

    it("test stack empty", async () => {
        await fails("int 1; int 1; pop; pop");
    });

    it("test arg too far", async () => {
        await fails("arg_1; btoi");
    });

    it("bitlen", async () => {
        await succeeds("int 0; bitlen; int 0; ==");
        await succeeds("int 1; bitlen; int 1; ==");
        await succeeds("int 2; bitlen; int 2; ==");
        await succeeds("int 4; bitlen; int 3; ==");
        await succeeds("int 5; bitlen; int 3; ==");
        await succeeds("int 8; bitlen; int 4; ==");
    
        await succeeds("byte 0x; bitlen; int 0; ==");
        await succeeds("byte 0x00; bitlen; int 0; ==");
        await succeeds("byte 0x01; bitlen; int 1; ==");
        await succeeds("byte 0x02; bitlen; int 2; ==");
        await succeeds("byte 0x03; bitlen; int 2; ==");
        await succeeds("byte 0x04; bitlen; int 3; ==");
        await succeeds("byte 0xf0; bitlen; int 8; ==");
        await succeeds("byte 0x0100; bitlen; int 9; ==");
        await succeeds("byte 0x010001000100010001000100010001000100; bitlen; int 137; ==");    
    });

});