import { useState } from 'react'
import './App.css'
import GoalForm from './GoalForm'
import GoalIndex from './GoalIndex'
function App() {

  return (
    <>
      <h1>Welcome to Goal App</h1>
      <GoalIndex />
      <GoalForm />
    </>
  )
}

export default App
