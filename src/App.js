import React from 'react'
import PriceContextProvider from './context/PriceContext'
import { Main } from './pages/main';

const App = () => {
  return (
    <PriceContextProvider>
      <div className="flex flex-col items-center">
        <header className="App-header">
          <h1>Tezos Defi</h1>
        </header>
        <Main />
      </div>
    </PriceContextProvider>
  );
}

export default App;
