import React, { useEffect, useState } from 'react';

const GoalIndex = () => {
    // Fetch the user's goals from the backend
    const [goals, setGoals] = useState([]);
    useEffect(()=> {
        fetch('http://localhost:8000/goals')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        // setGoal(res);
    }, [])

    return (
        <div>
            <h1>My Goals</h1>
            {goals?.map((goal) => (
                <div key={goal.id}>
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                </div>
            ))}
        </div>
    );
};

export default GoalIndex;