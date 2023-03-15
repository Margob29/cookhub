import "../../../App.css";
import logo from "../../../images/logo_violet.png";

export default function CreationForm() {
  return (
    //TODO : mettre tous les champs en required
    //TODO : faire la liste exhaustive des catégories
    //TODO : faire en sorte qu'il n'y ait rien de pré-selectionné pour les catégories
    //TODO : finir le responsive (titre + première ligne)
    //TODO : faire la confirmation d'annulation
    <div className="container d-flex justify-content-center">
      <div className="col-sm-12 col-lg-8">
        <form>
          <fieldset className="form p-4 m-4 formcontainer">
            <legend className="formtitle mb-3">
              <img src={logo} alt="Logo" className="logo" />
              Qu'est-ce que tu nous proposes de bon ?
              <img src={logo} alt="Logo" className="logo" />
            </legend>
            <div className="row">
              <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
                <label className="me-2 labelname">Nom de la recette :</label>
                <input type="text" className="labelname" required />{" "}
              </div>
              <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
                <label className="me-2 labelname">Catégories</label>
                <select className="labelname">
                  <option>Végétarien</option>
                  <option>Plat</option>
                  <option>Entrée</option>
                  <option>Dessert</option>
                </select>
              </div>
            </div>
            <div className="col mb-3">
              <label className="me-2 labelname">Nombre de portions :</label>
              <input type="number" className="labelname" />
            </div>
            <div className="col mb-3">
              <label className="me-2 labelname">Temps de préparation :</label>
              <input type="number" className="labelname" />{" "}
              <span className="labelname"> minutes.</span>
            </div>
            <div className="col mb-3">
              <label className="me-2 labelname">Temps de cuisson :</label>
              <input type="number" className="labelname" />{" "}
              <span className="labelname"> minutes.</span>
            </div>
            <div className="col mb-3">
              <label className="me-2 labelname">Temps de pause :</label>
              <input type="number" className="labelname" />{" "}
              <span className="labelname"> minutes.</span>
            </div>
            <div className="buttons">
              <a className="btnDiscard" href="/">
                Abandonner
              </a>
              <a className="btnSubmit" type="submit" href="/creationprogress">
                Suivant
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
