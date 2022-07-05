import React from 'react'
import { Link } from 'react-router-dom'
import { Exercise } from '../../../types/exercises.types'

const ExerciseCard = ({ exercise}: any) => {

  return (
    <Link className='exercise-card' to={`/exercise/${exercise.id}`}>
    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
    </Link>
  )
}

export default ExerciseCard