import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';
import { withHooks } from 'jest-react-hooks-shallow';

const mockUseHistory = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockUseHistory,
  }),
}));

const props = {
  card: { id: 'p1', title: 'Title', text: 'Text', check: false },
  onSaveCardData: jest.fn(),
  readOnly: false,
};

describe('test Card component', () => {
  const wrapper = shallow(<Card {...props} />);

  test('test Card render', () => {
    expect(wrapper.find('CardHeader')).toHaveLength(1);
    expect(wrapper.find('CardBody')).toHaveLength(1);
  });

  test('test useEffect, should calls useEffect hook', () => {
    withHooks(() => {
      const useEffectHook = jest.spyOn(React, 'useEffect');
      expect(useEffectHook).not.toBeCalled();
      wrapper.setProps({ readOnly: true });
      wrapper.find('CardHeader').prop('onEditClick')();
      expect(useEffectHook).toBeCalled();
      useEffectHook.mockRestore();
    });
  });

  describe('test useState, should change states in all scenarios', () => {
    const setStateMock = jest.fn();
    let wrapper;

    beforeEach(() => {
      jest.spyOn(React, 'useState').mockImplementation((state) => {
        return [state, setStateMock];
      });

      wrapper = shallow(<Card {...props} />);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    test('test onTitleChange', () => {
      const titleValue = 'Changed title';
      wrapper.find('CardHeader').prop('onTitleChange')(titleValue);
      expect(setStateMock).toBeCalledWith({
        enteredText: props.card.text,
        enteredTitle: titleValue,
      });
    });

    test('test onTextChange', () => {
      const textValue = 'Changed text';
      wrapper.find('CardBody').prop('onTextChange')(textValue);
      expect(setStateMock).toBeCalledWith({
        enteredTitle: props.card.title,
        enteredText: textValue,
      });
    });

    test('test onCancelClick', () => {
      wrapper.find('CardHeader').prop('onCancelClick')();
      expect(setStateMock).toBeCalledWith({
        enteredText: props.card.text,
        enteredTitle: props.card.title,
      });
      expect(setStateMock).toBeCalledWith(false);
    });
  });

  describe('test onSaveCardData, should call onSaveCardData in all scenarios', () => {
    const wrapper = shallow(<Card {...props} />);

    test('test handleClick', () => {
      wrapper.find('CardHeader').prop('handleClick')();
      expect(props.onSaveCardData).toBeCalledWith({
        id: props.card.id,
        check: !props.card.check,
      });
    });

    test('test onEditClick', () => {
      wrapper.find('CardHeader').prop('onEditClick')();
      expect(props.onSaveCardData).toBeCalledWith({
        id: props.card.id,
        check: false,
      });
    });

    test('test onSave', () => {
      wrapper.find('CardHeader').prop('onSaveClick')();
      expect(props.onSaveCardData).toBeCalledWith({
        id: props.card.id,
        title: props.card.title,
        text: props.card.text,
      });
    });

    test('test onSave with changed state data', () => {
      const userInput = { enteredTitle: 'new title', enteredText: 'new text' };
      const setEditModeMock = jest.fn();
      React.useState = jest
        .fn()
        .mockReturnValueOnce([false, setEditModeMock])
        .mockReturnValueOnce([userInput]);
      const wrapper = shallow(<Card {...props} />);
      wrapper.find('CardHeader').prop('onSaveClick')();
      expect(setEditModeMock).toBeCalledWith(false);
      expect(props.onSaveCardData).toBeCalledWith({
        id: props.card.id,
        title: userInput.enteredTitle,
        text: userInput.enteredText,
      });
      jest.restoreAllMocks();
    });
  });

  test('test useHistory, should call useHistory after used onDoubleClick', () => {
    wrapper.find('div').simulate('doubleclick');
    expect(mockUseHistory).toBeCalledWith(`/card/${props.card.id}`);
  });
});
