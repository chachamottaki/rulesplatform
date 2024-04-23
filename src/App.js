import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import FileUpload from './components/FileUpload';

function App() {
  useEffect(() => {
    axios.get('https://localhost:7113')
    .then((response) => {
      console.log(response.data)
    })
  }, [])
  return (
    <div className="App">
      <h1>Upload a config file</h1>
      <FileUpload />
    </div>
  );
}

export default App;
