import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import About from './component/About';
import Procedure from './component/Procedure';
import Method from './component/Method';
import Footer from './component/Footer';
import Contact from './component/Contact';
import Landing from './component/Landing';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/procedure/:procedureId' element={<Procedure/>} />
        <Route path='/procedure/:procedureId/method/:methodId' element={<Method/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
