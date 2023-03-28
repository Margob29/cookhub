import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./client/pages/Home/HomePage";
import CreationForm from "./client/pages/Creation/CreationPage";
import CHNavbar from "./client/components/CookHub_navbar";
import CreationProgress from "./client/pages/Creation/CreationInProgressPage";
import StepCreation from "./client/pages/Creation/CreationStepPage";
import AddIngredient from "./client/pages/Creation/AddIngredientPage";
import RecipePage from "./client/pages/Home/RecipePage";
import Error from "./client/pages/Error";

function App() {
  return (
    <div>
      {/* <CHNavbar></CHNavbar>
      <RecipePage></RecipePage> */}
      <BrowserRouter>
        <CHNavbar />{" "}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/details/:id/:version" element={<RecipePage />} />
          <Route path="/creation" element={<CreationForm />} />
          <Route path="/creationprogress/:id" element={<CreationProgress />} />
          <Route path="/creationstep" element={<StepCreation />} />
          <Route path="/addingredient" element={<AddIngredient />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
