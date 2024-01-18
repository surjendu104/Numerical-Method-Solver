import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import data from "../../assets/Procedure.json";
import axios from 'axios';
import { server } from '../../index';
import Loader from './Loader';
import '../../styles/IntegrationSolver.css'
import Chart from '../util/Chart';

const NumericalIntegrationSolver = () => {
  const {procedureId, methodId} = useParams();
  const [expression, setExpression] = useState('');
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(Number.MAX_SAFE_INTEGER);
  const [partitionNumber, setPartitionNumber] = useState(6);
  const [dataFetching, setDataFetching] = useState(false);
  const [result, setResult] = useState({});

  const methodTag = data.find(proc => proc.procedureId == procedureId).methods.find(meth=> meth.methodId == methodId).tag;
  const methodName = data.find(proc => proc.procedureId == procedureId).methods.find(meth=> meth.methodId == methodId).methodName;

  const prepareData = () => {
    return {expression : expression, lowerBound : lowerBound, upperBound: upperBound, partitionNumber : partitionNumber};
  }

  const handelSubmit = async () => {
    const isEmpty = expression.length == 0;
    if (isEmpty) {
      console.log("Error in table data");
    } else {
      try {
        setDataFetching(true);
        const data = prepareData();
        const { data : response } = await axios.post(`${server}/numericalIntegration/${methodTag}`,
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
          <p>Expression</p>
          <input className='integration-input' type='text' onChange={(e) => setExpression(e.target.value)}/>
        </div>
        <div>
          <p>Lower Bound</p>
          <input className='integration-input' type='text' onChange={(e) => setLowerBound(e.target.value)}/>
        </div>
        <div>
          <p>Upper Bound</p>
          <input className='integration-input' type='text' onChange={(e) => setUpperBound(e.target.value)}/>
        </div>
        <div>
          <p>Partition Number</p>
          <input className='integration-input' type='text' onChange={(e) => setPartitionNumber(e.target.value)}/>
        </div>
        <button onClick={handelSubmit} className="outer-buttons">Solve</button>
      </div>
      {
          dataFetching ? <Loader /> : 
          (
            result.result && 
            <div>
              <DisplayResult result={result} methodName={methodName} />
              <Chart arr={result.table} xLabel={"Intervals"} yLabel={"Function Value"}/>
            </div>
          )
        }
    </div>
  )
}


const DisplayResult = ({ result, methodName }) => {
  return (
    <div className='tse-container'>
      <div className='tse-container-child'>
        <div className='question-header'>
          ❓❓ Find the value of integration of the expression {result.expression} in the
          range [{result.lowerBound},{result.upperBound}] using {methodName}
        </div>
        <div className='tsce-header'>
          Result Table
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Intervals</th>
                <th>x</th>
                <th>f(x)</th>
              </tr>
            </thead>
            <tbody>
              {result.table.map((element, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{element[0]}</td>
                  <td>{element[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div>
          🎉🎉 Hence integration of the expression  <span className='question-header'>{result.expression}</span> in the range <span className='question-header'>[{result.lowerBound}, {result.upperBound}]</span> is <span className='question-header'>{result.result}</span>
        </div>
      </div>
    </div>
  );
};


export default NumericalIntegrationSolver;