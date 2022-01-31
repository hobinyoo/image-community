import React from 'react';
import { Routes, Route } from "react-router-dom"
import PostList from '../pages/PostList';
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { Grid } from "../elements";
import Header from "../components/Header";

function App() {
  return (
    <React.Fragment>

      <Grid>
        <Header></Header>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Grid>

    </React.Fragment>
  );
}

export default App;
