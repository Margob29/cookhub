import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/HomePage";
import CreationForm from "./pages/Creation/CreationPage";
import CHNavbar from "./components/CookHub_navbar";
import CreationProgress from "./pages/Creation/CreationInProgressPage";
import StepCreation from "./pages/Creation/CreationStepPage";
import AddIngredient from "./pages/Creation/AddIngredientPage";
import RecipePage from "./pages/Home/RecipePage";
import Error from "./pages/Error";

function App() {
  return (
    <div>
      {/* <CHNavbar></CHNavbar>
      <RecipePage></RecipePage> */}
      <BrowserRouter>
        <CHNavbar />{" "}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/details/2" element={<RecipePage />} />
          <Route path="/creation" element={<CreationForm />} />
          <Route path="/creationprogress" element={<CreationProgress />} />
          <Route path="/creationstep" element={<StepCreation />} />
          <Route path="/addingredient" element={<AddIngredient />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
