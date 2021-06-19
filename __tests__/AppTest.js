import 'react-native';
import React from 'react';
import ListUserId from '../src/components/ListUserId';
import renderer, {create} from 'react-test-renderer'

//if any asynchronous task is running in the comopnent, then use it
jest.useFakeTimers();
//@ts-ignore
const tree = create(<ListUserId/>);
test('snapshot',() => {
    expect(tree).toMatchSnapshot()
});
