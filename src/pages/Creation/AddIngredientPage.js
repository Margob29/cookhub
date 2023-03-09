import "../../App.css";
export default function AddIngredient() {
  return (
    <div>
      <form>
        <fieldset>
          <legend>Ingrédient</legend>
          <div className="row">
            <label>Nom</label>
            <input type="text" />
          </div>
          <div className="row">
            <label>Quantité</label>
            <input type="number" />
          </div>
          <div className="row">
            <label>Unité</label>
            <input type="text" />
          </div>
          <div className="buttons">
            <a className="btnDiscard" href="/creationstep">
              Annuler
            </a>
            <a className="btnSubmit" type="submit" href="/creationstep">
              Ajouter l'ingrédient
            </a>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
