import 'react-native';
import renderer, {create} from 'react-test-renderer'
import {itemSeparator} from '../src/components/ViewComponents'
//if any asynchronous task is running in the comopnent, then use it
// jest.useFakeTimers();
const tree = create(itemSeparator());
test('snapshot',() => {
    expect(tree).toMatchSnapshot()
});
