import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ToolbarComponent from './components/ToolbarComponent';
import Home from './pages/Home';
import RuleChains from './pages/RuleChains';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('https://localhost:7113')
    .then((response) => {
      console.log(response.data)
    })
  }, [])
  return (
    <Router>
      <div className="App">
      <ToolbarComponent
        onSave={() => alert("Save functionality here")}
        onEdit={() => alert("Edit functionality here")}
        onDelete={() => alert("Delete functionality here")}
      />
        <Sidebar />
          <div style={{ marginLeft: '200px', padding: '20px' }}>
            <Routes>
              <Route exact path="/" component={Home} />
              <Route path="/rule-chains" component={RuleChains} />
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
