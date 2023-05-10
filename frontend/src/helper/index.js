const API_URL = "http://localhost:3000/api";

// Function to get the stored JWT token
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to create headers with the JWT token
const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  };
};

// Function to register a student
export const registerUser = async ({ firstName, lastName, email, password }) => {
  const response = await fetch(`${API_URL}/studentRoute/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return await response.json();
};

// Function to delete a student
export const deleteUser = async ({ email }) => {
  const response = await fetch(`${API_URL}/studentRoute/delete`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  });
  return await response.json();
};

// Function to update a student
export const updateUser = async ({ firstName, lastName, email, password }) => {
  const response = await fetch(`${API_URL}/studentRoute/update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return await response.json();
}

// Function to get all students
export const getAllStudents = async () => {
  const response = await fetch(`${API_URL}/studentRoute/get`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
};

// Function to login a student
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/studentRoute/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};

// Function to login admin
export const loginAdmin = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/adminRoute/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};