import "../../App.css";
import { Icon } from "@iconify/react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Card to display steps during the creation
export default function StepCard(props) {
  const { step, idRecipe, version } = props;
  const navigate = useNavigate();

  // Function to delete a step
  const DeleteStep = () => {
    Axios.delete("http://localhost:3001/step", {
      params: { idStep: step.idStep },
    })
      // Update the page with all the steps when one is deleted
      .then((res) => {
        if (res.status == 200) props.callBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Navigate to the ingredient page with the form already fill
  const toStep = () => {
    navigate(`/creationstep/${idRecipe}/${version}/${step.idStep}`, {
      state: step,
    });
  };

  return (
    <div className="col-xl-3 col-md-6 col-sm-6">
      <div className="card mb-2 cardstyle">
        <div className="card-body ">
          <h3 className="card-title d-flex justify-content-between">
            Etape {step.stepIndex}
            {/* Delete the step if the button is clicked */}
            <a
              className="d-flex align-items-top"
              onClick={DeleteStep}
              type="submit"
            >
              <Icon icon="charm:cross" width={20} color={"#5837B3"} />
            </a>
          </h3>
          <p className="card-text">{step.description}</p>
          <a type="submit" className="btnModify" onClick={toStep}>
            Modifier
          </a>
        </div>
      </div>
    </div>
  );
}
