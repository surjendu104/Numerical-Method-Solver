import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import data from '../../assets/Procedure.json';
import axios from 'axios';
import Loader from './Loader';
import { server } from '../../index.js';
import '../../styles/ODESolver.css'
import Chart from '../util/Chart';

const ODESolver = () => {
  const params = useParams();
  const [equation, setEquation] = useState('');
  const [valueOfX, setValueOfX] = useState(0);
  const [valueOfY, setValueOfY] = useState(0);
  const [height, setHeight] = useState(1);
  const [valuePoint, setValuePoint] = useState(0);
  const [dataFetching, setDataFetching] = useState(false);
  const [result, setResult] = useState({});

  const methodTag = data[params.procedureId - 1].methods[params.methodId - 1].tag;
  const methodName = data[params.procedureId - 1].methods[params.methodId - 1].methodName;

  const prepareData = () => {
    return {equation : equation, valueOfX : valueOfX, valueOfY: valueOfY, height: height, valuePoint: valuePoint};
  }

  const handelSubmit = async () => {
    const isEmpty = equation.length == 0;
    if (isEmpty) {
      console.log("Error in table data");
    } else {
      try {
        setDataFetching(true);
        const data = prepareData();
        const { data : response } = await axios.post(`${server}/solutionOfODE/${methodTag}`,
          data
        );
        setResult(response);
        console.log(response);
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
          <p>Expression</p>
          <input className='integration-input' type='text' onChange={(e) => setEquation(e.target.value)}/>
        </div>
        <div>
          <p>Value of X</p>
          <input className='integration-input' type='text' onChange={(e) => setValueOfX(e.target.value)}/>
        </div>
        <div>
          <p>Value of Y</p>
          <input className='integration-input' type='text' onChange={(e) => setValueOfY(e.target.value)}/>
        </div>
        <div>
          <p>Height</p>
          <input className='integration-input' type='text' onChange={(e) => setHeight(e.target.value)}/>
        </div>
        <div>
          <p>Point where value is want</p>
          <input className='integration-input' type='text' onChange={(e) => setValuePoint(e.target.value)}/>
        </div>
        <button onClick={handelSubmit} className="outer-buttons">Solve</button>
      </div>
      {
          dataFetching ? <Loader /> : 
          (
            result.result && (
              <div>
              <DisplayResult result={result}/>
              <Chart arr={result.result} xLabel={"Point"} yLabel={"Value"}/>
              </div>
            )
          )
        }
    </div>
  )
}


const DisplayResult = ({result}) => {

  return (
    <div className='table-container'>
      <div className='table-container-child'>
        <div className='table-header question'>❓❓ Given equation y'(x) = {result.equation} where y({result.valueOfX}) = {result.valueOfY}. Find the value of y({result.valuePoint}) when step size h = {result.height} </div>
        <div>
          <table>
            <thead>
              <th>ID</th>
              <th>X</th>
              <th>Y</th>
            </thead>
            <tbody>
              {result.result.map((element, index)=>(
                <tr>
                  <td key={index}>{index}</td>
                  <td>{element[0]}</td>
                  <td>{element[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='question'>
          So the answer of y({result.valuePoint}) = {result.resultAtPoint}
        </div>
      </div>
    </div>
  );
}

export default ODESolver;