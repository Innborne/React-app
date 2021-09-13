import { useState } from 'react';
import { CardWithDelay } from '../../components/Card/Card';
import CardAdding from '../../components/CardAdding/CardAdding';

import './CardList.css';
import { useDispatch, useSelector } from 'react-redux';
import { cardListActions } from '../../store/cards';
import useModal from '../../hooks/useModal';

function CardList() {
  const deleteButtonText = 'delete selected cards',
    addButtonText = 'add card';
  const readOnlyMode = useSelector((state) => state.cards.readOnly);
  const [cardAddingMode, setCardAddingMode] = useState(false);
  const cards = useSelector((state) => state.cards.items);
  const dispatch = useDispatch();

  const modalValue = useModal(2000, 'test');
  modalValue && console.log(modalValue);

  const addCardButtonHandler = () => {
    setCardAddingMode((prevCardAddingState) => !prevCardAddingState);
  };

  const addCardHandler = (enteredData) => {
    dispatch(cardListActions.onAddCard(enteredData));
  };

  const changeCardHandler = (enteredData) => {
    dispatch(cardListActions.onChangeCard(enteredData));
  };

  const deleteCardHandler = () => {
    dispatch(cardListActions.onDeleteCard());
  };

  return (
    <div className="card-list">
      {!readOnlyMode && (
        <div className="card-list-header">
          <button
            className="card-list-button"
            disabled={cardAddingMode}
            onClick={addCardButtonHandler}
          >
            {addButtonText}
          </button>
          {cards.find((card) => card.check) && (
            <button className="card-list-button" onClick={deleteCardHandler}>
              {deleteButtonText}
            </button>
          )}
        </div>
      )}
      {cardAddingMode && (
        <CardAdding
          disableCardMode={addCardButtonHandler}
          onAddCard={addCardHandler}
        />
      )}
      {cards.map((cardData) => (
        <CardWithDelay
          onSaveCardData={changeCardHandler}
          key={cardData.id}
          card={cardData}
          readOnly={readOnlyMode}
        />
      ))}
    </div>
  );
}

export default CardList;
