import React from 'react';
import SignIn from './pages/SignIn';
import {BrowserRouter} from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import AppProvider from '../src/hooks';

import Routes from './routes/index';

function App() {
  return (
    <div className="App">
       <BrowserRouter>

        <AppProvider>

          <Routes />

        </AppProvider>

        <GlobalStyles />
      </BrowserRouter>
    </div>
  );
}

export default App;
