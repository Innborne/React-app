import { useState, useEffect } from 'react';
import classNames from 'classnames';
import CardBody from './CardBody';
import CardHeader from './CardHeader';
import WithLoadingDelay from '../withLoadingDelay/withLoadingDelay';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Card.css';

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
  }, [readOnly, editMode, card.title, card.text]);

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
    setUserInput({ ...userInput, enteredTitle: titleValue });
  };

  const textChangeHandler = (textValue) => {
    setUserInput({ ...userInput, enteredText: textValue });
  };

  const onDoubleClick = () => {
    if (!editMode) {
      history.push(`/card/${card.id}`);
    }
  };

  return (
    <div
      onDoubleClick={onDoubleClick}
      className={classNames(
        'card-item',
        { checked: card.check },
        { readMode: !editMode }
      )}
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
export const CardWithDelay = WithLoadingDelay(Card, 'card-item');
