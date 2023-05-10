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

// Function to add a course
export const addCourse = async ({ title, author, price, description, category, image, startDate, endDate }) => {
  const response = await fetch(`${API_URL}/courseRoute/add`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ title, author, price, description, category, image, startDate, endDate }),
  });
  return await response.json();
}

// Function to update a course
export const updateCourse = async ({ title, author, price, description, category, image, startDate, endDate }) => {
  const response = await fetch(`${API_URL}/courseRoute/update`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ title, author, price, description, category, image, startDate, endDate }),
  });
  return await response.json();
}

// Function to delete a course
export const deleteCourse = async ({ title }) => {
  const response = await fetch(`${API_URL}/courseRoute/delete`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ title }),
  });
  return await response.json();
}

// Function to get all courses
export const getAllCourses = async () => {
  const response = await fetch(`${API_URL}/courseRoute/getAll`, {
    method: "GET",
    headers: getHeaders(),
  });
  return await response.json();
}

// Function to get a course
export const getCourse = async ({ title }) => {
  const response = await fetch(`${API_URL}/courseRoute/get/`, {
    method: "GET",
    headers: getHeaders(),
    body: JSON.stringify({ title }),
  });
  return await response.json();
}