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
import Confirmation from "./client/pages/Creation/Confirmation";
import StepsPage from "./client/pages/Home/StepsPage";

// Router to the differents links into the web site
function App() {
  return (
    <div>
      <BrowserRouter>
        <CHNavbar />{" "}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/details/:id/:version" element={<RecipePage />} />
          <Route path="/confirmation/:id/:version" element={<Confirmation />} />
          <Route path="/creation" element={<CreationForm />} />
          <Route
            path="/creationprogress/:idRecipe/:version"
            element={<CreationProgress />}
          />
          <Route
            path="/creationstep/:idRecipe/:version/:idStep"
            element={<StepCreation />}
          />
          <Route
            path="/addingredient/:idRecipe/:version/:idStep"
            element={<AddIngredient />}
          />
          <Route path="/steps/:idRecipe/:version" element={<StepsPage />} />
          {/* If any path above correspond, link to the page Error */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
