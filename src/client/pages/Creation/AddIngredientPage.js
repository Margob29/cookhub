import "../../../App.css";
export default function AddIngredient() {
  return (
    //TODO : faire la confirmation d'annulation
    <div className="container d-flex justify-content-center">
      <div className="col-sm-12 col-lg-8">
        <form>
          <fieldset className="form p-4 m-4 formcontainer">
            <legend className="formtitle mb-3">Ingrédient</legend>
            <div className="row mb-3">
              <div className="col d-flex justify-content-center">
                <label className="me-2 labelname">Nom :</label>
                <input type="text" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
                <label className="me-2 labelname">Quantité :</label>
                <input type="number" />
              </div>
              <div className="col-6">
                <label className="me-2 labelname">Unité : </label>
                <input type="text" />
              </div>
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
    </div>
  );
}
