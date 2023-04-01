import "../../App.css";
import { Icon } from "@iconify/react";

export default function StepCard(props) {
  const { step } = props;
  return (
    <div className="col-xl-3 col-md-6 col-sm-6">
      <div className="card mb-2 cardstyle">
        <div className="card-body ">
          <h3 className="card-title d-flex justify-content-between">
            Etape {step.stepIndex}
            <a href="#" className="d-flex align-items-top">
              <Icon icon="charm:cross" width={20} color={"#5837B3"} />
            </a>
          </h3>
          <p className="card-text">{step.description}</p>
          <a href="#" className="btnModify">
            Modifier
          </a>
        </div>
      </div>
    </div>
  );
}
