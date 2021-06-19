import 'react-native';
import React from 'react';
import App from '../App'
import renderer, {create} from 'react-test-renderer'

//if any asynchronous task is running in the comopnent, then use it
jest.useFakeTimers();
//@ts-ignore
const tree = create(<App/>);
test('snapshot',() => {
    expect(tree).toMatchSnapshot()
});
