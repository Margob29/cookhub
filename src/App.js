import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/HomePage";
import CreationForm from "./pages/Creation/CreationPage";
import CHNavbar from "./components/CookHub_navbar";
import CreationProgress from "./pages/Creation/CreationInProgressPage";

function App() {
  return (
    <div>
      <CHNavbar></CHNavbar>
      <CreationProgress></CreationProgress>
    </div>
  );
}

export default App;
