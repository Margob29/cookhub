import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/HomePage";
import CreationForm from "./pages/Creation/CreationPage";
import CHNavbar from "./components/CookHub_navbar";
import CreationProgress from "./pages/Creation/CreationInProgressPage";
import StepCreation from "./pages/Creation/CreationStepPage";
import AddIngredient from "./pages/Creation/AddIngredientPage";

function App() {
  return (
    <div>
      <CHNavbar></CHNavbar>
      <AddIngredient></AddIngredient>
    </div>
  );
}

export default App;
