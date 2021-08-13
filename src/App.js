import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CardList from './components/CardList/CardList';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import { AuthWithDelay } from './components/Auth/Auth';
import { useDispatch } from 'react-redux';
import { cardListActions } from './store/cards';
import CardDetail from './components/CardDetail/CardDetail';
import FetchCards from './api/api';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    FetchCards().then((cards) => dispatch(cardListActions.setCards(cards)));
    //fetching card only once
    // eslint-disable-next-line
  }, []);

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
