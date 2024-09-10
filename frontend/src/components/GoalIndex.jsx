import React, { useEffect, useState } from 'react';
import { getUserGoals, deleteGoal, modifyGoal } from '../api_util';
import { useGoals } from '../context/GoalsContext';

const GoalIndex = () => {
    const { goals, getGoals, removeGoal,updateGoal } = useGoals(); 
    // const [goals, setGoals] = useState([]);

    useEffect(()=> {
        //fetch goals based on user Id
        getUserGoals(1).then(goals => getGoals(goals))
    }, [])

    const handleStatusChange = (goal) => async e => {
        const res = await modifyGoal({...goal, status: e.target.value})
        updateGoal(res);
    }

    const handleRemoveGoal = async goal_id => {
        const res = await deleteGoal(goal_id)
        removeGoal(goal_id);
    }

    return (
        <div>
            <h1>My Goals</h1>
            {goals?.map((goal) => (
                <div key={goal.id}>
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                    <select name="" id="" defaultValue={goal.status} onChange={handleStatusChange(goal)}>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="not-started">Not Started</option>
                    </select>
                    <button onClick={()=> handleRemoveGoal(goal.id)}>Delete Goal</button>
                </div>
            ))}
        </div>
    );
};

export default GoalIndex;