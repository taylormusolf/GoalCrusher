import React from 'react';

const GoalIndex = () => {
    // Fetch the user's goals from the backend
    const userGoals = fetchUserGoals();

    return (
        <div>
            <h1>My Goals</h1>
            {userGoals.map((goal) => (
                <div key={goal.id}>
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                </div>
            ))}
        </div>
    );
};

export default GoalIndex;