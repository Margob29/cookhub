import "../../App.css";
import CHNavbar from "../../components/CookHub_navbar";

export default function CreationForm() {
  return (
    <div>
      <CHNavbar></CHNavbar>
      <div className="container">
        <form>
          <fieldset>
            <legend>Qu'est-ce que tu nous propose de bon ?</legend>
            <div>
              <label>Nom de la recette</label>
              <input type="text" required />
              <label>Catégories</label>
              <select>
                <option>Végétarien</option>
                <option>Plat</option>
                <option>Entrée</option>
                <option>Dessert</option>
              </select>
            </div>
            <div>
              <label>Nombre de portions</label>
              <input type="number" />
            </div>
            <div>
              <label>Temps de préparation</label>
              <input type="number" /> <span> minutes.</span>
            </div>
            <div>
              <label>Temps de cuisson</label>
              <input type="number" /> <span> minutes.</span>
            </div>
            <div>
              <label>Temps de pause</label>
              <input type="number" /> <span> minutes.</span>
            </div>
            <div>
              <a className="btnDiscard" href="#">
                Abandonner
              </a>
              <a className="btnSubmit" type="submit" href="#">
                Suivant
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
