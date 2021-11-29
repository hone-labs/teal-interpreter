import { ExecutionContext } from "../lib/context";

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
        const account ="anAccount";
        const context = new ExecutionContext({}, {});
        await expect(() => context.requireAccount(account, "test")).rejects.toThrow();
    });
});