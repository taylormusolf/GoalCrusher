import React, { createContext, useState, useContext } from 'react';

const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const getGoals = goals => {
    setGoals(goals);
  }
  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const removeGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const updateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, removeGoal, updateGoal, getGoals }}>
      {children}
    </GoalsContext.Provider>
  );
};

// Custom hook for using the context
export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};
