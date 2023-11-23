import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';

import About from './component/About';
import {
  BrowserRouter as Main,
  Routes,
  Route,

} from "react-router-dom"
import NoteState from './context/notes/noteState';

function App() {
  return (
    <Main>
    <>
    <NoteState>
    <Navbar/>
    <div className="container">
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/about' element={<About/>}/>
    </Routes>
    </div>
    </NoteState>
    </>
    </Main>
  );
}

export default App;
