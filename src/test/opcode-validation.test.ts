import { IExecutionContext } from "../lib/context";
import { Opcode } from "../lib/opcode";

class TestOpcode extends Opcode {

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
        const opcodeDef: any = {
            operands: 3,
        }
        const opcode = new TestOpcode(token, opcodeDef);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("can validate opcode with correct number of operands", () => {
        
        const token: any = {
            opcode: "something",
            operands: [ "a", "b" ],
        };
        const opcodeDef: any = {
            operands: 2,
        }
        const opcode = new TestOpcode(token, opcodeDef);
        opcode.validateOperand();
    });

    it("can fail for opcode with invalid number of operands against a multi-operand", () => {
        
        const token: any = {
            opcode: "something",
            operands: [ "a", "b" ],
        };
        const opcodeDef: any = {
            operands: [1, 3],
        }
        const opcode = new TestOpcode(token, opcodeDef);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("can validate opcode with correct number of operands against a multi-operand", () => {
        
        const token: any = {
            opcode: "something",
            operands: [ "a", "b" ],
        };
        const opcodeDef: any = {
            operands: [1, 2],
        }
        const opcode = new TestOpcode(token, opcodeDef);
        opcode.validateOperand();
    });

    it("can fail for opcode when invalid number of stack args are supplied", () => {

        const token: any = {
            opcode: "something",
            operands: [],
        };
        const opcodeDef: any = {
            stack: 2,
        }
        const opcode = new TestOpcode(token, opcodeDef);

        const context: any = {
            stack: [ 
                BigInt(1),
            ],
        };
        expect(() => opcode.validateContext(context)).toThrow();
     });

     it("can validate opcode with correct number of stack args", () => {
         
        const token: any = {
            opcode: "something",
            operands: [],
        };
        const opcodeDef: any = {
            stack: 2,
        }
        const opcode = new TestOpcode(token, opcodeDef);

        const context: any = {
            stack: [ 
                BigInt(1),
                BigInt(2),
            ],
        };
        opcode.validateContext(context);
     });

     it("can parse int operand", () => {

        const token: any = {
            opcode: "something",
            operands: [
                "5"
            ],
        };
        const opcodeDef: any = {
            operands: 1,
            stack: 0,
        };
        let parsedOperand: bigint | undefined = undefined;

        class TestOpcode extends Opcode {

            validateOperand(): void {
                super.validateOperand();

                parsedOperand = this.parseIntOperand(0);
            }

            execute(context: IExecutionContext): void {
                throw new Error("Method not implemented.");
            }        
        }
        
        const opcode = new TestOpcode(token, opcodeDef);
        opcode.validateOperand();
        expect(Number(parsedOperand)).toEqual(5);
    });

    it("can parse named int contant operand", () => {

        const token: any = {
            opcode: "something",
            operands: [
                "ClearState"
            ],
        };
        const opcodeDef: any = {
            operands: 1,
            stack: 0,
        };
        let parsedOperand: bigint | undefined = undefined;

        class TestOpcode extends Opcode {

            validateOperand(): void {
                super.validateOperand();

                parsedOperand = this.parseIntOperand(0);
            }

            execute(context: IExecutionContext): void {
                throw new Error("Method not implemented.");
            }        
        }
        
        const opcode = new TestOpcode(token, opcodeDef);
        opcode.validateOperand();
        expect(Number(parsedOperand)).toEqual(3);
    });

});