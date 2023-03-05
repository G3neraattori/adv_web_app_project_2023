import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./components/Homepage"
import CodeComponent from "./components/CodeComponent";
import Header from "./components/Header"
//Main APP. Contains routing, header, and bootsrap stylesheet. Stylesheet is from bootswatch.com.
function App() {
  return (
    <div className="App">
        <Header/>
      <Router>
        <div>
          <Routes>
                <Route exact path='/' element={<Homepage/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/code' element={<CodeComponent/>}/>
          </Routes>
        </div>
      </Router>

      <link
          rel="stylesheet"
          href="https://bootswatch.com/5/cosmo/bootstrap.min.css"
          crossOrigin="anonymous"
      />
    </div>
  );
}

export default App;
