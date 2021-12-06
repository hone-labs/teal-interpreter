import { ExecutionContext } from "../lib/context";

describe("context", () => {

    it("can construct empty context", () => {
        new ExecutionContext({}, {});
    });

    it("raises event when value is not found", async () => {
        const testFieldPath = `globals.something`;
        const context = new ExecutionContext({}, {});
        let eventRaised = false;
        context.onConfigNotFound = async (fieldPath) => {
            expect(fieldPath).toEqual(testFieldPath);
            eventRaised = true;
        };

        await context.requestValue(testFieldPath);
        expect(eventRaised).toEqual(true);
    });

    it("throws when required value is not found", async () => {
        const testFieldPath = `globals.something`;
        const context = new ExecutionContext({}, {});
        await expect(() => context.requireValue(testFieldPath, "test")).rejects.toThrow();
    });

    it("can configure an account", () => {

        const context = new ExecutionContext({}, {
            accounts: {
                john: {},
            },
        });
        expect(context.accounts.john).toBeDefined();
    });

    it("can configure an account with details", () => {

        const context = new ExecutionContext({}, {
            accounts: {
                john: {
                    balance: 5,
                    minBalance: 2,
                    appLocals: {
                        "1": {
                            aLocal: 12,
                        },
                    },
                    appsOptedIn: [
                        "1",
                    ],
                    assetHoldings: {
                        "2": {
                            Something: 8,
                        },
                    },
                },
            },
        });

        const account = context.accounts.john;
        expect(account.balance).toEqual(5);
        expect(account.minBalance).toEqual(2);
        expect(Number(account.appLocals["1"].aLocal.value)).toEqual(12);
        expect(account.appsOptedIn).toEqual([ "1" ]);
        expect(Number(account.assetHoldings["2"].Something.value)).toEqual(8);
    });

    it("can serialize an account under the context", () => {

        const context = new ExecutionContext({}, {
            accounts: {
                john: {},
            },
        });
        const serialized = context.serialize();
        expect(serialized.accounts?.john).toBeDefined();
    });

    it("can serialize an account with details", () => {

        const context = new ExecutionContext({}, {
            accounts: {
                john: {
                    balance: 5,
                    minBalance: 2,
                    appLocals: {
                        "1": {
                            aLocal: 12,
                        },
                    },
                    appsOptedIn: [
                        "1",
                    ],
                    assetHoldings: {
                        "2": {
                            Something: 8,
                        },
                    },
                },
            },
        });
        const serialized = context.serialize();
        const serializedAccount = serialized.accounts!.john!;
        expect(serializedAccount).toEqual({
            balance: 5,
            minBalance: 2,
            appLocals: {
                "1": {
                    aLocal: 12,
                },
            },
            appsOptedIn: [ '1' ],
            assetHoldings: {
                "2": {
                    Something: 8,
                },
            },
        });
    });

    it("various fields in the context are not serialized", () => {

        const context = new ExecutionContext({}, {});
        const serialized = context.serialize();
        expect(serialized).toEqual( {
            appGlobals: {},
            assetParams: {},
            appParams: {},
            accounts: {},
            args: {},
            txn: {},
            gtxn: {},
            txnSideEffects: {},
            gaid: {},
            globals: {}
        });
    });
  

});