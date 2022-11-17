import "./App.css";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUserPage from "./Pages/AddUserPage";
import SingleUserPage from "./Pages/SingleUserPage";
import EditUserPage from "./Pages/EditUserPage";
import NotFoundPage from "./Pages/NotFoundPage";
import AllUsers from "./Components/AllUsers";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar/>
        <Routes>
          <Route element={<HomePage />} path="/"/>
          <Route element={<AddUserPage />} path="/add-user" />
          <Route element={<SingleUserPage />} path="/view-user/:id" />
          <Route element={<EditUserPage />} path="/edit-user/:id" />
          <Route element={<AllUsers />} path="/allusers" />
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
