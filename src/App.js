import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { setUser } from "./redux/features/authSlice";
import AddTour from "./pages/AddTour";
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagTours from "./pages/TagTours";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);
  return (
    // <GoogleOAuthProvider clientId=''>
    <Router>
      <div className='App'>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tours/search' element={<Home />} />
          <Route path='/tours/tag/:tag' element={<TagTours />} />
          {/* <Route path='/login' element={ !user ? <Login /> : <Navigate to='/' replace={true} />} /> */}
          <Route path='/login' element={<Login />} />
          <Route
            path='/register'
            element={!user ? <Register /> : <Navigate to='/' replace={true} />}
          />
          <Route
            path='/addTour'
            element={
              <PrivateRoute>
                <AddTour />
              </PrivateRoute>
            }
          />
          <Route
            path='/editTour/:id'
            element={
              <PrivateRoute>
                <AddTour />
              </PrivateRoute>
            }
          />
          <Route path='/tour/:tourId' element={<SingleTour />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    // </GoogleOAuthProvider>
  );
}

export default App;
