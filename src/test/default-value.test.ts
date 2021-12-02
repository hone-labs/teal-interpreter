import { getDefaultValue } from "../lib/default-value";

describe("default value", () => {

    it("can get root value", () => {

        const value = getDefaultValue("something", {
            "something": 12,
        });
        expect(value).toEqual(12);        
    });

    it("can get root value by wildcard", () => {

        const value = getDefaultValue("something", {
            "*": 15,
        });
        expect(value).toEqual(15);
    });

    it("can get nested value", () => {

        const value = getDefaultValue("a.b.c", {
            "a": {
                "b": {
                    "c": 20,
                },
            },
        });
        expect(value).toEqual(20);
    });

    it("can get nested value by wildcard", () => {

        const value = getDefaultValue("a.b.c", {
            "a": {
                "b": {
                    "*": 22,
                },
            },
        });
        expect(value).toEqual(22);
    });

    it("can get root value by function", () => {

        const value = getDefaultValue("something", {
            "something": () => 12,
        });
        expect(value).toEqual(12);        
    });

    it("can get root value by function with wildcard", () => {

        const value = getDefaultValue("something", {
            "*": () => 13,
        });
        expect(value).toEqual(13);
    });

    it("can get nested value by function", () => {

        const value = getDefaultValue("a.b.c", {
            "a": {
                "b": {
                    "c": () => 21,
                },
            },
        });
        expect(value).toEqual(21);
    });

    it("can get nested value by function with wildcard", () => {

        const value = getDefaultValue("a.b.c", {
            "a": {
                "b": {
                    "*": () => 27,
                },
            },
        });
        expect(value).toEqual(27);
    });

    it("can get nested value by function", () => {

        const value = getDefaultValue("a.b.c", {
            "a": {
                "b": {
                    "c": () => 21,
                },
            },
        });
        expect(value).toEqual(21);
    });

    it("can use constructor function to create default value", () => {

        const value = getDefaultValue("something", {
            "something": () => 15,
        });
        expect(value).toEqual(15);        
    });


});