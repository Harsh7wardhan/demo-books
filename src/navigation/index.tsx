import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../components/Layouts/appLayout";
import AboutBook from "../pages/AboutBook";
import AddBook from "../pages/AddBook";
import Home from "../pages/Home";

function Navigation() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/add_book" element={<AddBook />} />
          <Route path = "/get_book/:id" element={<AboutBook/>}/>
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default Navigation;
