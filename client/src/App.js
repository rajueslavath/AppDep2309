import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Tasks from "./components/Tasks";
import Home from "./components/Home";
import Requests from "./components/Requests";
import Leaves from "./components/Leaves";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/tasks" element={<Tasks/>}></Route>
      <Route path="/requests" element={<Requests/>}></Route>
      <Route path="/leaves" element={<Leaves/>}></Route>
      <Route path="/editprofile" element={<EditProfile/>}></Route>
      
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
