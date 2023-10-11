import { Link } from "react-router-dom";
import "../../styles/Cards.css";

const ProcedureCard = ({ procedureId, name }) => {
  return (
    <div>
      <Link to={`/procedure/${procedureId}`} className="procedure-container">
        <div>{name}</div>
      </Link>
    </div>
  );
};

export default ProcedureCard;
