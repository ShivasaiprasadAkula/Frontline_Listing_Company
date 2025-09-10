import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Companies from "./pages/Companies";
import CreateCompany from "./pages/CreateCompany";
import EditCompany from "./pages/EditCompany";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/create" element={<CreateCompany />} />
          <Route path="/companies/edit/:id" element={<EditCompany />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
