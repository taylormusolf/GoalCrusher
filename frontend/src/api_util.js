const API_URL = import.meta.env.VITE_API_URL;

export const createGoal = (goal)=> {
    fetch(`${API_URL}/goals?user_id=1`, {
        method: 'POST',
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: goal
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

export const getUsers = () => {
    fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}