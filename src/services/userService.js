const API_URL = 'http://localhost:3000/users';

export const fetchUsers = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};

export const fetchUser = async (id) => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};

export const editUsers = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const data = await response.json();
    return data;
};

export const deleteUsers = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
};

export const createUsers = async (newUser) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    const data = await response.json();
    return data;
};

export default { fetchUsers, editUsers, deleteUsers, createUsers };