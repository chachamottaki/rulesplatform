import { useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('https://localhost:7113')
    .then((response) => {
      console.log(response.data)
    })
  }, [])
  return (
    <div className="App">
      <h1>
        Hello!
      </h1>
      <p>wagwan</p>
    </div>
  );
}

export default App;
