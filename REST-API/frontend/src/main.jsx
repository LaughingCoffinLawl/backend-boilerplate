import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home/Home";
import PostPage from "./components/Posts/PostPage";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="posts/:id" element={<PostPage />} />
    </Routes>
  </BrowserRouter>
);
