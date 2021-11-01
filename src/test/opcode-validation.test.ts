import { IExecutionContext } from "../context";
import { Opcode } from "../opcode";
import { IToken } from "../token";

class TestOpcode extends Opcode {

    constructor(token: IToken, numOperands: number, numStackArgs: number) {
        super(token, numOperands, numStackArgs);
    }

    execute(context: IExecutionContext): void {
        throw new Error("Method not implemented.");
    }

}

describe("opcode validation failures", () => {

    it("can fail for opcode with invalid number of operands", () => {
        
        const token: any = {
            opcode: "something",
            operands: [ "a", "b" ],
        };
        const opcode = new TestOpcode(token, 3, 0);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("can validate opcode with correct number of operands", () => {
        
        const token: any = {
            opcode: "something",
            operands: [ "a", "b" ],
        };
        const opcode = new TestOpcode(token, 2, 0);
        opcode.validateOperand();
    });

    it("can fail for opcode when invalid number of stack args are supplied", () => {

        const token: any = {
            opcode: "something",
            operands: [],
        };
        const context: any = {
            stack: [ 
                BigInt(1),
            ],
        };
        const opcode = new TestOpcode(token, 0, 2);
        expect(() => opcode.validateContext(context)).toThrow();
     });

     it("can validate opcode with correct number of stack args", () => {
         
        const token: any = {
            opcode: "something",
            operands: [],
        };
        const context: any = {
            stack: [ 
                BigInt(1),
                BigInt(2),
            ],
        };
        const opcode = new TestOpcode(token, 0, 2);
        opcode.validateContext(context);
     });



});