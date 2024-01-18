import React from 'react'
import { useParams } from 'react-router-dom';
import InterpolationSolver from './solvers/InterpolationSolver';
import NumericalIntegrationSolver from './solvers/NumericalIntegrationSolver';
import AlgebricEquationSolver from './solvers/AlgebricEquationSolver';
import ODESolver from './solvers/ODESolver';
import TranscendentalEquationSolver from './solvers/TranscendentalEquationSolver';

const Method = () => {
    const {procedureId} = useParams();
  return (
    <div className='method-card'>
    {
        procedureId === "interpolation" ? <InterpolationSolver /> :
        procedureId === "numerical-integration" ? <NumericalIntegrationSolver /> :
        procedureId === "linear-algebric-equation" ? <AlgebricEquationSolver /> :
        procedureId === "odinary-differential-equation" ? <ODESolver /> :
                           <TranscendentalEquationSolver />
    }
    </div>
  )
}

export default Method