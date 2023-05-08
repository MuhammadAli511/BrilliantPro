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

// Function to register a user
export const registerUser = async ({ firstName, lastName, email, password }) => {
  const response = await fetch(`${API_URL}/customerRoute/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return response.json();
};

// Function to login a user
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/customerRoute/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// Function to get all products
export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/productRoute/getAllProducts`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
};

// Function to get men's products
export const getMensProducts = async () => {
  const response = await fetch(`${API_URL}/productRoute/getMensProducts`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
};

// Function to get women's products
export const getWomensProducts = async () => {
  const response = await fetch(`${API_URL}/productRoute/getWomensProducts`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
};

// Function to get electronic products
export const getElectronicProducts = async () => {
  const response = await fetch(`${API_URL}/productRoute/getElectronicProducts`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
};

// Function to get jewelry products
export const getJeweleryProducts = async () => {
  const response = await fetch(`${API_URL}/productRoute/getJeweleryProducts`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
};

// Function to get single product
export const getSingleProduct = async (id) => {
  const response = await fetch(`${API_URL}/productRoute/getSingleProduct/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
};

// Function to place order
export const addNewCart = async (order) => {
  const response = await fetch(`${API_URL}/cartRoute/addNewCart`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(order),
  });
  return await response.json();
};