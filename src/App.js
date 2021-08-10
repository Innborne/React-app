import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CardList from './components/CardList/CardList';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import { AuthWithDelay } from './components/Auth/Auth';
import { useDispatch } from 'react-redux';
import { cardListActions } from './store/cards';
import { v4 } from 'uuid';
import axios from 'axios';
import CardDetail from './components/CardDetail/CardDetail';

function App() {
  const dispatch = useDispatch();

  const fetchCards = useCallback(async () => {
    const response = await axios(
      'https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json'
    );

    dispatch(
      cardListActions.setCards(
        response.data.slice(0, 15).map((cardData) => {
          return {
            id: v4(),
            title: cardData['Name'],
            text: cardData['About'],
            check: false,
          };
        })
      )
    );
  }, [dispatch]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <CardList />
        </Route>
        <Route path="/notfound" exact>
          <NotFound />
        </Route>
        <Route path="/auth" exact>
          <AuthWithDelay />
        </Route>
        <Route path="/card/:id" exact>
          <CardDetail />
        </Route>
        <Route path="*">
          <Redirect to="/notfound" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
