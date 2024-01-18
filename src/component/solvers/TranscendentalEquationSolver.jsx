import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import data from '../../assets/Procedure.json';
import axios from 'axios';
import Loader from './Loader';
import { server } from '../../index.js';
import '../../styles/TranscendentalEquationSolver.css'

const TranscendentalEquationSolver = () => {
  const {procedureId, methodId} = useParams();
  const [equation, setEquation] = useState('');
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(0);
  const [numberOfIteration, setNumberOfIteration] = useState(0);
  const [dataFetching, setDataFetching] = useState(false);
  const [result, setResult] = useState({});

  const methodTag = data.find(proc => proc.procedureId == procedureId).methods.find(meth=> meth.methodId == methodId).tag;
  const methodName = data.find(proc => proc.procedureId == procedureId).methods.find(meth=> meth.methodId == methodId).methodName;

  const prepareData = () => {
    return {equation : equation, lowerLimit : parseFloat(lowerLimit), upperLimit: parseFloat(upperLimit), numberOfIteration: parseInt(numberOfIteration)};
  }

  const handelSubmit = async () => {
    const isEmpty = equation.length == 0;
    if (isEmpty) {
      console.log("Error in table data");
    } else {
      try {
        setDataFetching(true);
        const data = prepareData();
        const { data : response } = await axios.post(`${server}/algebraicAndTranscendentalEquation/${methodTag}`,
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
    <div className='data-container'>
      <div className='header'>{methodName} Solver</div>
      <div className='data-container-child'>
        <div>
          <p>Equation</p>
          <input className='input' type='text' onChange={(e) => setEquation(e.target.value)}/>
        </div>
        <div>
          <p>Lower Limit</p>
          <input className='input' type='text' onChange={(e) => setLowerLimit(e.target.value)}/>
        </div>
        <div>
          <p>Upper Limit</p>
          <input className='input' type='text' onChange={(e) => setUpperLimit(e.target.value)}/>
        </div>
        <div>
          <p>Number of Iteration</p>
          <input className='input' type='text' onChange={(e) => setNumberOfIteration(e.target.value)}/>
        </div>
        <button onClick={handelSubmit} className="outer-buttons">Solve</button>
      </div>
      {
          dataFetching ? <Loader /> : 
          (
            result.calculatedRoot && <DisplayResult result={result} methodId={methodId} methodName={methodName}/>
          )
        }
    </div>
  )
}

const DisplayResult = ({ result, methodId, methodName }) => {
  return (
    <div className='tse-container'>
      <div className='tse-container-child'>
        <div className='question-header'>
          ❓❓ Find the approximate root of the equation {result.equation} = 0 in the
          range [{result.lowerLimit},{result.upperLimit}] using {methodName}
        </div>
        <div className='tsce-header'>
          Result Table
        </div>
        {methodId == 3 ? (<div>
          <table>
            <thead>
              <tr>
                <th>Iteration Number</th>
                <th>x</th>
                <th>f(x)</th>
                <th>f'(x)</th>
              </tr>
            </thead>
            <tbody>
              {result.table.map((element, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{element[0]}</td>
                  <td>{element[1]}</td>
                  <td>{element[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>) : (<div>
          <table>
            <thead>
              <tr>
                <th>Iteration Number</th>
                <th>a</th>
                <th>b</th>
                <th>f(a)</th>
                <th>f(b)</th>
                <th>c</th>
                <th>f(c)</th>
              </tr>
            </thead>
            <tbody>
              {result.table.map((element, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{element[0]}</td>
                  <td>{element[1]}</td>
                  <td>{element[2]}</td>
                  <td>{element[3]}</td>
                  <td>{element[4]}</td>
                  <td>{element[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)}
        
        <div>
          🎉🎉 So the approximate root of the equation <span className='question-header'>{result.equation} = 0</span> is <span className='question-header'>{result.calculatedRoot}</span>
        </div>
      </div>
    </div>
  );
};

// x^3-4*x-9

export default TranscendentalEquationSolver;