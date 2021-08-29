import { shallow } from 'enzyme';
import CardHeader from './CardHeader';

const props = {
  headerTitle: 'title text',
  onTitleChange: jest.fn(),
  editMode: false,
  readOnly: false,
};

describe('test CardHeader component', () => {
  const wrapper = shallow(<CardHeader {...props} />);

  test('test for desabled editMode, should render view mode without readOnly mode', () => {
    expect(wrapper.find('FiEdit3')).toHaveLength(1);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
    expect(wrapper.find('h2')).toHaveLength(1);
  });

  test('test for desabled editMode, should render view mode with readOnly mode', () => {
    wrapper.setProps({ readOnly: true });
    expect(wrapper.find('FiEdit3')).toHaveLength(0);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(0);
    expect(wrapper.find('h2')).toHaveLength(1);
  });

  test('test for enabled editMode, should render editing mode', () => {
    wrapper.setProps({ editMode: true });
    expect(wrapper.find('FiSave')).toHaveLength(1);
    expect(wrapper.find('FiX')).toHaveLength(1);
    expect(wrapper.find('input[type="text"]')).toHaveLength(1);
  });

  test('test onChange, should call onChange with entered title data', () => {
    const changedTitleText = 'New title text';
    wrapper
      .find('input[type="text"]')
      .simulate('change', { target: { value: changedTitleText } });
    expect(props.onTitleChange).toBeCalledWith(changedTitleText);
  });
});
