import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/HomePage";
import CreationForm from "./pages/Creation/CreationPage";
import CHNavbar from "./components/CookHub_navbar";
import CreationProgress from "./pages/Creation/CreationInProgressPage";
import StepCreation from "./pages/Creation/CreationStepPage";
import AddIngredient from "./pages/Creation/AddIngredientPage";
import RecipePage from "./pages/Home/RecipePage";
import Error from "./pages/Error";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// export default function CookHub() {
//   return (
//     <BrowserRouter>
//       <CHNavbar />
//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route path="/details/2" element={<RecipePage />} />
//         <Route path="/creation" element={<CreationForm />} />
//         <Route path="/creationprogress" element={<CreationProgress />} />
//         <Route path="/creationstep" element={<StepCreation />} />
//         <Route path="/addingredient" element={<AddIngredient />} />
//         <Route path="*" element={<Error />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
