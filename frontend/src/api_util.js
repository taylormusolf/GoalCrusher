const API_URL = import.meta.env.VITE_API_URL;
import { useGoals } from "./context/GoalsContext";

export const createGoal = async goal => {
    try {
        const res = await fetch(`${API_URL}/api/goals?user_id=1`, {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...goal})
        })
        const newGoal = await res.json();
        return newGoal;
    } catch (error) {
        console.error('Error:', error)
    }
}

export const modifyGoal = async (goal)=> {
    try {
        const res = await fetch(`${API_URL}/api/goals/${goal.id}`, {
            method: 'PATCH',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...goal})
        })
        const updatedGoal = await res.json();
        return updatedGoal;
    } catch (error) {
        console.error('Error:', error)
    }
}
export const deleteGoal = async (goal_id)=> {
    try{
        const res = await fetch(`${API_URL}/api/goals/${goal_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }catch(error){
        console.error('Error', error)
    }
}

export const getUsers = () => {
    fetch(`${API_URL}/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

export const getUserGoals = async(userId) => {
    try{
        const res = await fetch(`${API_URL}/api/goals/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const goals = await res.json();
        return goals;
    } catch(e){
        console.error('Error:', e)
    }
}