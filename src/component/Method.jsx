import React from 'react'
import { useParams } from 'react-router-dom';
import InterpolationSolver from './solvers/InterpolationSolver';
import NumericalIntegrationSolver from './solvers/NumericalIntegrationSolver';
import AlgebricEquationSolver from './solvers/AlgebricEquationSolver';
import ODESolver from './solvers/ODESolver';
import TranscendentalEquationSolver from './solvers/TranscendentalEquationSolver';

const Method = () => {
    const param = useParams();
    const procedureId = param.procedureId;
  return (
    <div className='method-card'>
    {
        procedureId == 1 ? <InterpolationSolver /> :
        procedureId == 2 ? <NumericalIntegrationSolver /> :
        procedureId == 3 ? <AlgebricEquationSolver /> :
        procedureId == 4 ? <ODESolver /> :
                           <TranscendentalEquationSolver />
    }
    </div>
  )
}

export default Method