import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Users } from "./user/pages/Users";

const App = () => {
  // return <h1>Let's start!</h1>;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
