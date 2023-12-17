import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Users } from "./user/pages/Users";

const App = () => {
  // return <h1>Let's start!</h1>;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
