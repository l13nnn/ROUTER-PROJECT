import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import DetailUser from './pages/EditUser.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/:userId" element={<DetailUser />} />      
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;