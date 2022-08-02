import React from "react";
import {BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom'
import EnterPage from "./pages/EnterPage"
import MessagesPage from "./pages/MessagesPage"

function App() {
  return (
    <div className="container">
      <Router>
          <Routes>
              <Route exact path="/" element={<EnterPage />} />
              <Route exact path="/messages" element={<MessagesPage />} />
              <Route
                  path="*"
                  element={<Navigate to="/" replace />}
              />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
