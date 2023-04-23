import "../../App.css";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";

export default function OtherStep(props) {
  const { step, currentStep } = props;
  const { idRecipe, version } = useParams();
  const navigate = useNavigate();

  return (
    <div className="otherStep">
      <div className="row">
        <div className="col-3 m-0">
          <a onClick={props.callBack} type="submit">
            {currentStep < step.stepIndex ? (
              <Icon
                icon="ic:round-navigate-next"
                color={"#5837B3"}
                width={100}
                className="arrowStep"
              />
            ) : (
              <Icon
                icon="ic:round-navigate-before"
                color={"#5837B3"}
                width={100}
                className="arrowStep"
              />
            )}
          </a>
        </div>
        <div className="col-9 m-0">{step.description}</div>
      </div>
    </div>
  );
}
