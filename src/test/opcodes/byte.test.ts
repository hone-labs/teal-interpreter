import { Byte } from "../../lib/opcodes/byte";

describe("byte opcode", () => {

    it ("base 64", () => {

        const token: any = {
            opcode: "byte",
            operands: [
                "base64",
                "iZWMx72KvU6Bw6sPAWQFL96YH+VMrBA0XKWD9XbZOZI=",
            ],
        };        
        const opcode = new Byte(token);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            137, 149, 140, 199, 189, 138, 189,  78,
            129, 195, 171,  15,   1, 100,   5,  47,
            222, 152,  31, 229,  76, 172,  16,  52,
            92, 165, 131, 245, 118, 217,  57, 146
        ]);
    });

    it ("empty b64", () => {

        const token: any = {
            opcode: "byte",
            operands: [
                "b64(0)",
            ],
        };        
        const opcode = new Byte(token);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([]);
    });

    it ("hex", () => {

        const token: any = {
            opcode: "byte",
            operands: [
                "0x1234567812345678",
            ],
        };        
        const opcode = new Byte(token);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            18, 52, 86, 120,
            18, 52, 86, 120
        ]);
    });    

    it ("utf8", () => {

        const token: any = {
            opcode: "byte",
            operands: [
                '"ZC9KNzlnWTlKZ1pwSkNzQXVzYjNBcG1xTU9YbkRNWUtIQXNKYVk2RzRBdExPakQx"',
            ],
        };        
        const opcode = new Byte(token);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(context.stack[0].type).toEqual("byte[]");
        expect(Array.from(context.stack[0]?.value)).toEqual([
            90,  67,  57,  75, 78, 122, 108, 110,  87, 84, 108,  75,
            90,  49, 112, 119, 83, 107,  78, 122,  81, 88,  86, 122,
            89, 106,  78,  66, 99,  71,  49, 120,  84, 85,  57,  89,
            98, 107,  82,  78, 87,  85, 116,  73,  81, 88,  78,  75,
            89,  86, 107,  50, 82, 122,  82,  66, 100, 69, 120,  80,
            97, 107,  81            
        ]);
    });    
});