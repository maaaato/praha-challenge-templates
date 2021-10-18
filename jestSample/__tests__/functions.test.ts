// todo: ここに単体テストを書いてみましょう！
const fn = require('../functions.ts');

describe("Simple sumOfArray test", () => {
    test('Check nominal', () => {
        expect(fn.sumOfArray([1,2])).toBe(3);
        expect(fn.sumOfArray([1,1])).toBe(2);
        expect(fn.sumOfArray([1])).toBe(1);
    });
});

describe("Simple asyncSumOfArray test", () => {
    test('Check nominal', () => {
        return fn.asyncSumOfArray([1,2]).then((data:number) => {
            expect(data).toBe(3);
        });
    });
    test('Check non-nominal', () => {
        expect.assertions(1);
        return expect(fn.asyncSumOfArray([])).rejects.toThrow();
    });
});

describe('asyncSumOfArraySometimesZero test', () => {
    test('Check nominal', () => {
        const dbMock = jest
        .fn()
        .mockImplementationOnce(() => {
            return {
                save: () :void => {}
            };
        })
        .mockImplementationOnce(() => {
            return {
                save: () :void => {
                    throw new Error("fail");
                }
            };
        });

        expect(fn.asyncSumOfArraySometimesZero([0,1], dbMock())).resolves.toBe(1);
        expect(fn.asyncSumOfArraySometimesZero([0,1], dbMock())).resolves.toBe(0);
    });
});

describe('getFirstNameThrowIfLong test', () => {
    test('Check nominal', () => {
        const NameApiMock = jest
        .fn(() => {
            return {
                getFirstName () :Promise<string>{
                    return new Promise((resolve) => {
                            resolve("ABCD");
                      });
                }
            };
        });

        expect(fn.getFirstNameThrowIfLong(5, NameApiMock())).resolves.toEqual("ABCD");
        expect(fn.getFirstNameThrowIfLong(3, NameApiMock())).rejects.toStrictEqual(new Error("first_name too long"));
    });
})
