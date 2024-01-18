import React from "react";
import data from "../assets/Procedure.json";
import { useParams } from "react-router-dom";
import MethodCard from "./cards/MethodCard";
import '../styles/Procedure.css'

const Procedure = () => {
  const { procedureId } = useParams();
  const procedure = data.find(proc => proc.procedureId === procedureId);

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
