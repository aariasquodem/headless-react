import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import Main from './components/Main';
import Header from './components/Header';
import './styles/styles.scss';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://gatsby.local/graphql'
  })
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Header/>
          <Main/>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
