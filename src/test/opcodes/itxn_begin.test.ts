import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { ItxnBegin } from "../../lib/opcodes/itxn_begin";

describe("itxn_begin opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new ItxnBegin(token, opcodeDefs.itxn_begin);
        
        const context: any = {
            stack: [],
            itxn_begin: {
                "0": makeBigInt(BigInt(3)),
            },
        };
        opcode.execute(context);
    });

});