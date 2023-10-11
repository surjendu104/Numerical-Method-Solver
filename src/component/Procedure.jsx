import React from "react";
import data from "../assets/Procedure.json";
import { useParams } from "react-router-dom";
import MethodCard from "./cards/MethodCard";
import '../styles/Procedure.css'

const Procedure = () => {
  const param = useParams();

  const procedure = data[param.procedureId - 1];

  return (
    <div>
      <div className="procedure-name">{procedure.procedureName}</div>
      <div className="procedure-home">
        {procedure.methods.map((i) => (
          <MethodCard
            procedureId={procedure.procedureId}
            procedureName={procedure.procedureName}
            key={i.methodId}
            methodId={i.methodId}
            methodName={i.methodName}
          />
        ))}
      </div>
    </div>
  );
};

export default Procedure;
