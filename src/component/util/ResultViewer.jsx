import React from "react";
import '../../styles/InterpolationSolver.css'

const differentiation = ["y", "Δ'y", "Δ²y", "Δ³y", "Δ⁴y", "Δ⁵y", "Δ⁶y", "Δ⁷y"];    
const ResultViewer = ({ points, values, valuePoint, table, interpolationResult }) => {
  const n = table.length;
  let idx = 0;
  return (
    <div className="table-container">
      <div className="table-container-child">
        <div className="table-header">
          <h2>Result</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Points</th>
              <th>Values</th>
              {differentiation.map((element, index) =>
                index <= points.length - 1 ? (
                  <th key={index}>{element}</th>
                ) : null
              )}
            </tr>
          </thead>
          <tbody>
            
            {Array.from({ length: n }).map((_, index) => {
              if(index % 2 == 0) idx ++;
              return (<tr key={index}>
                {index % 2 == 0 ? (
                  <>
                    <td>{points[idx-1]}</td>
                    <td>{values[idx-1]}</td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td></td>
                  </>
                )}
                {table[index].map((item, colIndex) => (
                  <td key={colIndex}>{item}</td>
                ))}
              </tr>);
            })}
          </tbody>
        </table>
        <div className="value-point">y({valuePoint}) = {interpolationResult}</div>
      </div>
    </div>
  );
};

export default ResultViewer;
