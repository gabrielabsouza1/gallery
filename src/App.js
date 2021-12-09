import Footer from './components/Footer';
import Main from './components/Main';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./style.scss";
import Favoritos from './components/Favoritos';
import ContextApi from './context/api';

function App() {
  return (
    <div>
      <ContextApi>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route exact path='/favoritos' element={<Favoritos />} />
          </Routes>
        </Router>
        <Footer />
      </ContextApi>
    </div>
  );
}

export default App;
