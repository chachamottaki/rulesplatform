import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
//import { Provider } from 'react-redux';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
//import ToolbarComponent from './components/ToolbarComponent';
import DeviceConfig from './pages/DeviceConfig';
import RuleChains from './pages/RuleChains';
import LogsComponent from './components/LogsComponent';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="App">
          <Header />
          <div className="main-content">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<DeviceConfig />} />
                <Route path="/rule-chains" element={<RuleChains />} />
                {/*<Route path="/logs" element={<LogsComponent/>} />*/}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
