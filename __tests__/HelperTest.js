import {
    getDistinctValues
} from '../src/config/HelperFunction';

const sample = [
    {
        userId: 1
    },
    {
        userId: 1
    },
    {
        userId: 1
    },    
    {
        userId: 2
    },
    {
        userId: 2
    },
    {
        userId: 3
    },
];
const outcome = [
    {
        userId: 1
    },
    {
        userId: 2
    },
    {
        userId: 3
    },
];
//test the getDistinctValues helper function
test('getDistinctValues', () => {
    expect(getDistinctValues(sample)).toEqual(expect.arrayContaining(outcome));
});