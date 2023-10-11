import React from "react";
import data from "../assets/Procedure.json";
import ProcedureCard from "./cards/ProcedureCard";
import "../styles/Home.css";

const Home = () => {
  const procedures = data;
  console.log(data);
  return (
    <div className="home-container">
      <div className="home-container-child">
      {procedures.map((i) => (
        <ProcedureCard
          key={i.procedureId}
          procedureId={i.procedureId}
          name={i.procedureName}
        />
      ))}

      </div>
    </div>
  );
};

export default Home;
