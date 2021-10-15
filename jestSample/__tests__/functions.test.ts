// todo: ここに単体テストを書いてみましょう！
import { DammyDatabase } from "../util";
import { sumOfArray } from '../functions';
import { asyncSumOfArray } from '../functions';
import { asyncSumOfArraySometimesZero } from '../functions';
import { getFirstNameThrowIfLong } from '../functions';


describe("Simple sumOfArray test", () => {
    test('Check nominal', () => {
        expect(sumOfArray([1,2])).toBe(3);
        expect(sumOfArray([1,1])).toBe(2);
        expect(sumOfArray([1])).toBe(1);
    });
});

describe("Simple asyncSumOfArray test", () => {
    test('Check nominal', () => {
        return asyncSumOfArray([1,2]).then(data => {
            expect(data).toBe(3);
        });
    });
    test('Check non-nominal', () => {
        expect.assertions(1);
        return expect(asyncSumOfArray([])).rejects.toThrow();
    });
});

describe('asyncSumOfArraySometimesZero test', () => {
    test('Check nominal', () => {
        const db = new DammyDatabase();
        return asyncSumOfArraySometimesZero([0,1], db).then(data => {
            expect(data).toBe(1);
        });
    });
})
