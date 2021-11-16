import { opcodeDefs } from "../../lib/opcodes";
import { PushBytes } from "../../lib/opcodes/pushbytes";

describe("pushbytes opcode", () => {

    it ("hex", () => {

        const token: any = {
            operands: [
                "0x1234567812345678",
            ],
        };        
        const opcode = new PushBytes(token, opcodeDefs.pushbytes);
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
            operands: [
                '"ZC9KNzlnWTlKZ1pwSkNzQXVzYjNBcG1xTU9YbkRNWUtIQXNKYVk2RzRBdExPakQx"',
            ],
        };        
        const opcode = new PushBytes(token, opcodeDefs.pushbytes);
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