import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import data from "../../assets/Procedure.json";
import { server } from '../../index';
import '../../styles/InterpolationSolver.css';
import Loader from "./Loader";
import ResultViewer from "../util/ResultViewer";

const InterpolationSolver = () => {
  const [tableData, setTableData] = useState([
    { id: 1, point: "", value: "" },
    { id: 2, point: "", value: "" },
  ]);
  const [valuePoint, setValuePoint] = useState(0);
  const [result, setResult] = useState({});
  const [dataFetching, setDataFetching] = useState(false);
  const {procedureId, methodId} = useParams();

  const addRow = () => {
    const newRow = { id: tableData.length + 1, point: "", value: "" };
    setTableData([...tableData, newRow]);
  };

  const deleteRow = (id) => {
    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
  };

  const handleValueChange = (id, field, newValue) => {
    const updatedData = tableData.map((row) =>
      row.id === id ? { ...row, [field]: newValue } : row
    );
    setTableData(updatedData);
  };

  const prepareData = () => {
    const points = [];
    const values = [];
    tableData.forEach((i)=> {
      points.push(parseFloat(i.point));
      values.push(parseFloat(i.value));
    });
    return {points : points, values : values, valuePoint: valuePoint};
  }

  const methodTag = data.find(proc => proc.procedureId == procedureId).methods.find(meth=> meth.methodId == methodId).tag;
  const methodName = data.find(proc => proc.procedureId == procedureId).methods.find(meth=> meth.methodId == methodId).methodName;

  const handelSubmit = async () => {
    const isEmpty = tableData.some(
      (row) => row.point.trim() === "" || row.value.trim() === ""
    );
    if (isEmpty) {
      console.log("Error in table data");
    } else {
      try {
        setDataFetching(true);
        const data = prepareData();
        const { data : response } = await axios.post(`${server}/interpolation/${methodTag}`,
          data
        );
        setResult(response);
        setDataFetching(false);
      } catch (error) {
        console.error("Error in Axios request:", error);
      }
    }
  };

  return (
    <>
      <div className="table-container">
        <div className="table-container-child">
          <div className="table-header"><h2 >
            {methodName} Solver
          </h2></div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Points</th>
                <th>Values</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <input
                      type="text"
                      value={row.point}
                      onChange={(e) =>
                        handleValueChange(row.id, "point", e.target.value)
                      }
                      className="interpolation-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.value}
                      onChange={(e) =>
                        handleValueChange(row.id, "value", e.target.value)
                      }
                      className="interpolation-input"
                    />
                  </td>
                  <td>
                    <button onClick={() => deleteRow(row.id)}><AiFillDelete size={20}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="value-point">Value Point <input type="text" onChange={(e)=>setValuePoint(e.target.value)} className="interpolation-input"/></div>
          <button onClick={addRow} className="outer-buttons">Add Points</button>
          <button onClick={handelSubmit} className="outer-buttons">Solve</button>
        </div>
      </div>
      {
        dataFetching ? <Loader /> 
                     : (result.points) && <ResultViewer points={result.points} values={result.values} valuePoint={result.valuePoint} table={result.table} interpolationResult={result.interpolationResult}/>
      }
    </>
  );
};



export default InterpolationSolver;

// https://numerical-methods-solver.onrender.com/api/v1/interpolation/newtonForwardInterpolation