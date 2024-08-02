import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Register"
import Login from "./Login"
import View from "./View"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/register" element = {<Register/>} ></Route>
          <Route path="/" element = {<Login/>} ></Route>
          <Route path='/view' element ={<View/>}></Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
