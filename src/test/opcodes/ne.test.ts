import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Ne } from "../../lib/opcodes/ne";

describe("ne opcode", () => {

    it ("comparing different types results in one", () => {

        const token: any = {
            opcode: "!=",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)),
                makeBytes(new Uint8Array([1, 2, 3, 4])),
            ],
        };
        const opcode = new Ne(token, opcodeDefs["!="]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });

    it ("can compare bigints that are different", () => {

        const token: any = {
            opcode: "!=",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)),
                makeBigInt(BigInt(0)),
            ],
        };
        const opcode = new Ne(token, opcodeDefs["!="]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });

    it ("can compare bigints that are equal", () => {

        const token: any = {
            opcode: "!=",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(5)),
                makeBigInt(BigInt(5)),
            ],
        };
        const opcode = new Ne(token, opcodeDefs["!="]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });

    it ("can compare byte arrays that are different", () => {

        const token: any = {
            opcode: "!=",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])),
                makeBytes(new Uint8Array([5, 6, 7, 8])),                
            ],
        };
        const opcode = new Ne(token, opcodeDefs["!="]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });    

    it ("can compare byte arrays that are equal", () => {

        const token: any = {
            opcode: "!=",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])),
                makeBytes(new Uint8Array([1, 2, 3, 4])),                
            ],
        };
        const opcode = new Ne(token, opcodeDefs["!="]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });        
});