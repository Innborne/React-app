import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CardList from './components/CardList/CardList';
import { CardListContextProvider } from './components/CardListContext/CardListContext';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import { AuthWithDelay } from './components/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <CardListContextProvider>
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
          <Route path="*">
            <Redirect to="/notfound" />
          </Route>
        </Switch>
      </CardListContextProvider>
    </BrowserRouter>
  );
}

export default App;
