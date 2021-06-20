import 'react-native';
import renderer, {create} from 'react-test-renderer'
import App from '../App';
//if any asynchronous task is running in the comopnent, then use it
jest.useFakeTimers();
const tree = create(<App/>);
test('snapshot',() => {
    expect(tree).toMatchSnapshot()
});
