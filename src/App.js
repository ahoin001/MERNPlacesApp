import React from 'react';
import GoalList from './components/GoalList/GoalList'
import { NewGoal } from "./components/NewGoal/NewGoal";

import './App.css'

const App = () => {

  // Start Data
  const goalItems = [
    { id: 'g1', task: 'Understand React Workflow' },
    { id: 'g2', task: 'Understand Express Node workflow' },
    { id: 'g3', task: 'Be able to create MERN App' }
  ]

  // Recieves goal object and passes it to list data
  const addNewGoalHandler = (newGoal) => {
    goalItems.push(newGoal)
    console.log(goalItems);
  }


  return (

    <div className="course-goals">

      <h2>Course Goals</h2>

      {/* onAddGoal is naming convention but could be anything (Write nice code alex) */}
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList List={goalItems} />

    </div>

  )

};

export default App;
