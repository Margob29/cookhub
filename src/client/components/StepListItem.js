export default function StepListItem(props) {
  return (
    <div>
      <div className="row">{props.step.description}</div>
    </div>
  );
}
