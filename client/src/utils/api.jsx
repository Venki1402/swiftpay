const API_URL = "http://localhost:3000/api/v1";

// User APIs
export const signUp = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Sign up failed");
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Sign in failed");
  }
};

export const updateUser = async (userData, token) => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Update user failed");
  }
};

export const getUsers = async (filter, token) => {
  console.log("venki", "getUsercalled");
  try {
    const response = await fetch(`${API_URL}/user/bulk`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ filter }),
    });
    console.log("venki", response);
    return await response.json();
  } catch (error) {
    throw new Error("Get users failed");
  }
};

// Account APIs
export const getBalance = async (token) => {
  try {
    const response = await fetch(`${API_URL}/account/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error("Get balance failed");
  }
};

export const transferMoney = async (transferData, token) => {
  try {
    const response = await fetch(`${API_URL}/account/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transferData),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Transfer failed");
  }
};
