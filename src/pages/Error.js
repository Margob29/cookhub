import "../App.css";

export default function Error() {
  return (
    <div className="container d-flex justify-content-center m-3">
      <div className="formcontainer col-8 p-3">
        <h2 className="errorText">
          Désolé, <br />
          Cette page n'est pas accessible
        </h2>
        <div className="d-flex justify-content-center align-items-center">
          <a href="/" className="btnHome">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
