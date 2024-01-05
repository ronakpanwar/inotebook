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
import Alert from './component/Alert';
import Signup from './component/Signup';
import Login from './component/Login';

function App() {
  return (
    <Main>
    <>
    <NoteState>
    <Navbar/>
    <Alert massage = {"its Alerts"} />
    <div className="container">
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
    </Routes>
    </div>
    </NoteState>
    </>
    </Main>
  );
}

export default App;
