import { useEffect, useState } from 'react';
import { CardWithDelay } from '../../components/Card/Card';
import CardAdding from '../../components/CardAdding/CardAdding';

import './CardList.css';
import { useDispatch, useSelector } from 'react-redux';
import { cardListActions } from '../../store/cards';
import useModal from '../../hooks/useModal';

function CardList() {
  const deleteButtonText = 'Delete',
    addButtonText = 'Add',
    scrollToTop = 'Top',
    uncheckingCards = 'Cancel';
  const readOnlyMode = useSelector((state) => state.cards.readOnly);
  const [cardAddingMode, setCardAddingMode] = useState(false);
  const [scrollCheck, setScrollCheck] = useState(false);
  const cards = useSelector((state) => state.cards.items);
  const dispatch = useDispatch();

  const modalValue = useModal(2000, 'test');
  modalValue && console.log(modalValue);

  const checkedCards = cards.filter((card) => card.check === true).length;

  useEffect(() => {
    window.onscroll = onScrollPage;
  }, []);

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

  const uncheckingCardHandler = () => {
    dispatch(
      cardListActions.setCards(cards.map((card) => ({ ...card, check: false })))
    );
  };

  const onScrollPage = () => {
    setScrollCheck(document.documentElement.scrollTop > 100);
  };

  const scrollTopButton = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="card-list">
      <button
        className="to-top"
        disabled={!scrollCheck}
        onClick={scrollTopButton}
      >
        {scrollToTop}
      </button>
      {!readOnlyMode && (
        <div className="card-list-header">
          <button disabled={cardAddingMode} onClick={addCardButtonHandler}>
            {addButtonText}
          </button>
          <button disabled={!checkedCards} onClick={deleteCardHandler}>
            {deleteButtonText}
            <span disabled={!checkedCards} className="badge">
              {checkedCards}
            </span>
          </button>
          <button
            className="cancel"
            disabled={!checkedCards}
            onClick={uncheckingCardHandler}
          >
            {uncheckingCards}
          </button>
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
