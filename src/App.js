import './App.css';
import React,{ useState} from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';//for router-com v6
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import AddUser from './components/AddUser';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Users from './components/Users';
const App = () => {

  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }
  return (
    <>
      <NoteState> {/* ye jaha se lagega aur jaha tak jayega waha tak ye context state se value nikal sktain hai*/}
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
            <Route exact path="/users" element={<Users showAlert={showAlert}/>}></Route>
            <Route exact path="/adduser" element={<AddUser showAlert={showAlert}/>
            }></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}
export default App;