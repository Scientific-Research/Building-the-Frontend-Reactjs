import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Users } from "./user/pages/Users";
import { NewPlace } from "./places/pages/NewPlace";
import { MainNavigation } from "./shared/components/Navigation/MainNavigation";

const App = () => {
  // return <h1>Let's start!</h1>;
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/places/new" element={<NewPlace />}></Route>
          <Route path="/" element={<Users />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
