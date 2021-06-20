import 'react-native';
import renderer, {create} from 'react-test-renderer'
import {itemSeparator} from '../src/components/ViewComponents'
const tree = create(itemSeparator());
test('snapshot',() => {
    expect(tree).toMatchSnapshot()
});
