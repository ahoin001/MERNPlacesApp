import React from 'react';

import './GoalList.css'


const GoalList = (props) => {

  return (
   <ul className="goal-list">
    {props.List.map((listItem) => {
      return <li key={listItem.id}>{listItem.task}</li>
    })}
   </ul>
  )

};

export default GoalList;