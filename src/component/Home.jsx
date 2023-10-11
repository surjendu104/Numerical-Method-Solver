import React from "react";
import data from "../assets/Procedure.json";
import ProcedureCard from "./cards/ProcedureCard";
import "../styles/Home.css";

const Home = () => {
  const procedures = data;
  console.log(data);
  return (
    <div className="home-container">
      {procedures.map((i) => (
        <ProcedureCard
          key={i.procedureId}
          procedureId={i.procedureId}
          name={i.procedureName}
        />
      ))}
    </div>
  );
};

export default Home;
