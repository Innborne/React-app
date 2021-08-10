import { useState, useEffect } from 'react';
import classNames from 'classnames';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import WithLoadingDelay from '../withLoadingDelay/withLoadingDelay';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import './Card.css';
import { useHistory } from 'react-router-dom';

const CardDelayContainer = styled.div`
  display: flex;
  width: calc((50rem - 2rem) / 3 - 1rem / 3 * 2);
  max-width: 100%;
  height: 11rem;
`;

const CardWithDelay = WithLoadingDelay(Card, CardDelayContainer);

function Card({ card, onSaveCardData, readOnly }) {
  const [editMode, setEditMode] = useState(false);
  const [userInput, setUserInput] = useState({
    enteredTitle: card.title,
    enteredText: card.text,
  });
  const history = useHistory();

  useEffect(() => {
    if (readOnly && editMode) {
      setUserInput({
        enteredText: card.text,
        enteredTitle: card.title,
      });
      setEditMode(false);
    }
  }, [readOnly, editMode, card]);

  const onHandle = () => {
    onSaveCardData({
      id: card.id,
      check: !card.check,
    });
  };

  const onSave = () => {
    setEditMode(false);
    onSaveCardData({
      id: card.id,
      title: userInput.enteredTitle,
      text: userInput.enteredText,
    });
  };

  const onEdit = () => {
    onSaveCardData({
      id: card.id,
      check: false,
    });
    setEditMode(true);
  };

  const onCancel = () => {
    setUserInput({
      enteredText: card.text,
      enteredTitle: card.title,
    });
    setEditMode(false);
  };

  const titleChangeHandler = (titleValue) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: titleValue };
    });
  };

  const textChangeHandler = (textValue) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredText: textValue };
    });
  };

  const onDoubleClick = () => {
    if (readOnly) {
      history.push(`/card/${card.id}`);
    }
  };

  return (
    <div
      onDoubleClick={onDoubleClick}
      className={classNames('card-item', { checked: card.check })}
    >
      <CardHeader
        headerTitle={userInput.enteredTitle}
        onTitleChange={titleChangeHandler}
        onCheck={card.check}
        editMode={editMode}
        readOnly={readOnly}
        onSaveClick={onSave}
        onEditClick={onEdit}
        onCancelClick={onCancel}
        handleClick={onHandle}
      />
      <CardBody
        bodyText={userInput.enteredText}
        editMode={editMode}
        onTextChange={textChangeHandler}
      />
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onSaveCardData: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default Card;
export { CardWithDelay };
