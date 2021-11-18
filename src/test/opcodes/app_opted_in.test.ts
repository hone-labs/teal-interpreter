import { makeBigInt, makeBytes } from "../../lib/context";
import { addressToBytes } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppOptedIn } from "../../lib/opcodes/app_opted_in";

describe("app_opted_in opcode", () => {

    it ("returns 1 when opted in", () => {

        const token: any = {};
        const opcode = new AppOptedIn(token, opcodeDefs.app_opted_in);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    applications: {
                        "2": {
                            optedIn: true,
                        },
                    },
                },
            },            
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
                makeBigInt(BigInt(2)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });

    it ("returns 0 when not opted in", () => {

        const token: any = {};
        const opcode = new AppOptedIn(token, opcodeDefs.app_opted_in);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    applications: {
                        "2": {
                            optedIn: false,
                        },
                    },
                },
            },            
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
                makeBigInt(BigInt(2)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });

    it ("returns 0 when not set", () => {

        const token: any = {};
        const opcode = new AppOptedIn(token, opcodeDefs.app_opted_in);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    applications: {
                        "2": {
                            // Not set.
                        },
                    },
                },
            },            
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
                makeBigInt(BigInt(2)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });

    it("throws when account is not found", () => {

        const token: any = {};
        const opcode = new AppOptedIn(token, opcodeDefs.app_opted_in);

        const context: any = {
            accounts: {
                // No account.
            },            
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
                makeBigInt(BigInt(2)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when application is not found", () => {

        const token: any = {};
        const opcode = new AppOptedIn(token, opcodeDefs.app_opted_in);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    applications: {
                        // No application
                    },
                },
            },            
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
                makeBigInt(BigInt(2)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });    

});