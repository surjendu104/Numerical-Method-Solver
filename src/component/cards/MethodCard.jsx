import { Link } from "react-router-dom";
import "../../styles/Cards.css";

const MethodCard = ({ procedureId, methodId, methodName }) => {
  return (
    <div>
      <Link
        to={`/procedure/${procedureId}/method/${methodId}`}
        className="method-container"
      >
        <div>{methodName}</div>
      </Link>
    </div>
  );
};

export default MethodCard;
