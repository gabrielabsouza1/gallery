import Footer from './components/Footer';
import Main from './components/Main';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./style.scss";
import Favoritos from './components/Favoritos';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route exact path='/favoritos' element={<Favoritos />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
