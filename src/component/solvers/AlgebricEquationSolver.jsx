import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../../assets/Procedure.json';
import { server } from '../../index.js';
import '../../styles/ODESolver.css';
import Loader from './Loader';

const AlgebricEquationSolver = () => {
  const params = useParams();
  const [numberOfEqation, setNumberOfEquation] = useState();
  const [allowedError, setAllowedError] = useState(0);
  const [maximumIteration, setMaximumIteration] = useState(10);
  const [dataFetching, setDataFetching] = useState(false);
  const [result, setResult] = useState({});
  const [flag, setFlag] = useState(false);

  const methodTag = data[params.procedureId - 1].methods[params.methodId - 1].tag;
  const methodName = data[params.procedureId - 1].methods[params.methodId - 1].methodName;
  const methodId = params.methodId;


  const prepareData = () => {
    const matrix = [];
    for(let i = 0; i < numberOfEqation; ++i) {
      const row = []
      for(let j = 0; j < numberOfEqation+1; ++j) {
        const inputField = document.getElementById(`input-${i}-${j}`);
        if(inputField) {
          const inputValue = parseFloat(inputField.value);
          if(!isNaN(inputValue)) {
            row.push(inputValue)
          }else {
            console.log("Error in matrix!!")
            break;
          }
        }
      }
      matrix.push(row);
    }
    if(methodId == 2) return {inputMatrix : matrix, allowedError : allowedError, maximumIteration: maximumIteration}
    return {inputMatrix : matrix};
  }

  const handelSubmit = async () => {
    const isEmpty = numberOfEqation.length == 0;
    if (isEmpty) {
      console.log("Error in table data");
    } else {
      try {
        setDataFetching(true);
        const data = prepareData();
        const { data : response } = await axios.post(`${server}/linearAlgebraicEquations/${methodTag}`,
          data
        );
        setResult(response);
        setDataFetching(false);
      } catch (error) {
        console.error("Error in Axios request:", error);
      }
    }
  };

  const renderEquationInputs = () => {
    const rows = [];
    for (let i = 0; i < numberOfEqation; i++) {
      const equationInputs = [];
      for (let j = 0; j < numberOfEqation+1; j++) {
        equationInputs.push(
          <input
            key={`input-${i}-${j}`}
            id={`input-${i}-${j}`}
            type="text"
            // placeholder={`Equation ${i + 1}, Coefficient ${j + 1}`}
            className='integration-input matrix-input'
          />
        );
      }
      rows.push(
        <div key={`row-${i}`}>
          {/* <p>Equation {i + 1} Coefficients:</p> */}
          {equationInputs}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="data-container">
      <div className="header">{methodName} Solver</div>
      <div className="data-container-child">
        <div>
          <p>Number Of Equation</p>
          <input
            className="integration-input"
            type="text"
            onChange={(e) => setNumberOfEquation(parseInt(e.target.value))}
          />
        </div>
        {numberOfEqation > 0 && <div className='matrix'>
          <p>Enter the coefficients</p>
          <div className='matrix-matrix'>{renderEquationInputs()}</div>
          
        </div>}
        {
          methodId == 2 && (<><div>
            <p>Maximum Allowed Error</p>
            <input
              className="integration-input"
              type="text"
              onChange={(e) => setAllowedError(e.target.value)}
            />
          </div>
          <div>
            <p>Maximum Numner of Iteration</p>
            <input
              className="integration-input"
              type="text"
              onChange={(e) => setMaximumIteration(e.target.value)}
            />
          </div></>)
        }
        
        <button onClick={handelSubmit} className="outer-buttons">
          Solve
        </button>
      </div>
      {
        dataFetching ? <Loader />
        : (result.solutions && <DisplayResult result={result} methodName={methodName}/>)
      }
    </div>
  );
};

  const DisplayResult = ({ result, methodName }) => {
    const variables = [], solution = [];
    const len = result.inputMatrix[0].length;
    const char = 'a'
    for(let i = 0; i < len; ++i) {
      variables.push(String.fromCharCode(char.charCodeAt(0)+i));
    }
    for(let i = 0; i < len-1; ++i) {
      solution.push({"a":variables[i], "b" : result.solutions[i]});
    }
    return (
      <div className='tse-container'>
        <div className='tse-container-child'>
          <div className='question-header'>
            ❓❓ Find the solution of the system of linear equation 
             using {methodName}
          </div>
          <div className='tsce-header'>
            Input Matrix
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  {
                    variables.map((i)=>(
                      <th>{i}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {result.inputMatrix.map((element, index) => (
                  <tr key={index}>
                    <td>{element[0]}</td>
                    <td>{element[1]}</td>
                    <td>{element[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div>
            🎉🎉 The solution of the equations are 
            <table>
              <tbody>
                {solution.map((ele, index)=>(
                  <tr>
                    <td>{ele.a}</td>
                    <td>{ele.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    );
  };


export default AlgebricEquationSolver;

