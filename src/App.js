import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Sidebar from '../src/components/Sidebar';
import ToolbarComponent from './components/ToolbarComponent';
import Home from '../src/pages/Home';
import RuleChains from '../src/pages/RuleChains';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('https://localhost:7113')
      .then((response) => {
        console.log(response.data);
      });
  }, []);

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <div className="App">
            <Sidebar />
            <div style={{ marginLeft: '200px', padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rule-chains" element={<RuleChains />} />
              </Routes>
            </div>
          </div>
        </Router>
      </DndProvider>
    </Provider>
  );
}

export default App;
