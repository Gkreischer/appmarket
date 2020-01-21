import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Main from './components/MainComponent';
import { BrowserRouter as Router} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Main />
    </Router>

  );
}

export default App;
