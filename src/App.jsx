import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import AddRecipe from "./components/AddRecipe";
import Saved from './components/Saved';
import Profile from './components/Profile';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./components/Detail";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/saved" element={<Saved/>} />
          <Route path="/add" element={<AddRecipe/>} />
          <Route path="/home/:id" element={ <Detail />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
