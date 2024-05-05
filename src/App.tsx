import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home/Index"
import Admin from "./pages/Admin/Index"
import Boxer from './pages/Other/Boxer';
import Dexscreener from './pages/Other/Dexscreener';
import Staking from './pages/Other/Staking';
import Docs from './pages/Other/Docs';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/admin' element={<Admin/>} />
      <Route path='/boxer' element={<Boxer/>} />
      <Route path='/dexscr' element={<Dexscreener/>} />
      <Route path='/docs' element={<Docs/>} />
      <Route path='/staking' element={<Staking/>} />
    </Routes>
  );
}

export default App;
