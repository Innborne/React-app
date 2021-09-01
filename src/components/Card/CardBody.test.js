import { shallow } from 'enzyme';
import CardBody from './CardBody';

const props = {
  bodyText: 'body text',
  editMode: false,
  onTextChange: jest.fn(),
};

describe('test CardBody component', () => {
  const wrapper = shallow(<CardBody {...props} />);

  test('test for desabled editMode, should render view mode', () => {
    expect(wrapper.find('p')).toHaveLength(1);
  });

  test('test for enabled editMode, should render editing mode', () => {
    wrapper.setProps({ editMode: true });
    expect(wrapper.find('textarea')).toHaveLength(1);
  });

  test('test onChange, should call onChange with entered text data', () => {
    const сhangedBodyText = 'New body text';
    wrapper
      .find('textarea')
      .simulate('change', { target: { value: сhangedBodyText } });
    expect(props.onTextChange).toBeCalledWith(сhangedBodyText);
  });
});
