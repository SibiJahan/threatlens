import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
     </Routes>
    </div>
  );
}

export default App;
