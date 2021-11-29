import { Account, ExecutionContext } from "../lib/context";

describe("context", () => {

    it("can construct empty context", () => {
        new ExecutionContext({}, {});
    });

    it("raises event when account is not found", async () => {
        const account ="anAccount";
        const context = new ExecutionContext({}, {});
        let eventRaised = false;
        context.onAccountNotFound = async (accountName) => {
            expect(accountName).toEqual(account);
            eventRaised = true;
        };

        await context.requestAccount(account);
        expect(eventRaised).toEqual(true);
    });

    it("throws when required account is not found", async () => {
        const account = "anAccount";
        const context = new ExecutionContext({}, {});
        await expect(() => context.requireAccount(account, "test")).rejects.toThrow();
    });

    it("can construct account with no details", () => {
        new Account({});
    });

    it("can construct account with details", () => {
        const account = new Account({
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
        });
        
        expect(account.balance).toEqual(5);
        expect(account.minBalance).toEqual(2);
        expect(Number(account.appLocals["1"].aLocal.value)).toEqual(12);
        expect(account.appsOptedIn.has("1")).toEqual(true);
        expect(Number(account.assetHoldings["2"].Something.value)).toEqual(8);
    });

    it("can serialize account", () => {

        const account = new Account({
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
        });

        const serialized = account.serialize();
        expect(serialized).toEqual({
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

    it("can configure an account", () => {

        const context = new ExecutionContext({}, {
            accounts: {
                john: {},
            },
        });
        expect(context.accounts.john).toBeDefined();
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
});