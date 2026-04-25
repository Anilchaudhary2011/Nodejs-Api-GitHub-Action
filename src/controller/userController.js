import {
  createUserServices,
  getAllUserServices,
  updateUserByIdServices,
  getUserByIdServices,
  deleteUserByIdServices,
} from "../models/userModel.js";
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    // Validation
    if (!name || !email) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All fields are required (name, email)",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid email format",
      });
    }
    const newuser = await createUserServices(name, email);
    handleResponse(res, 201, "data created sucessfully", newuser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const alluser = await getAllUserServices();
    handleResponse(res, 200, "get all user data", alluser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdServices(id);
    if (!user) {
      handleResponse(res, 404, "User Not found");
    } else {
      handleResponse(res, 200, "get success.", user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserById = async (req, res, next) => {
  const { name, email } = req.body;
  const { id } = req.params;
  try {
    // Validation
    if (!name || !email) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All fields are required (name, email)",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid email format",
      });
    }
    const user = await updateUserByIdServices(id, name, email);
    handleResponse(res, 200, "data updated succesfully.", user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await deleteUserByIdServices(id);
    handleResponse(res, 200, "data deleted succesfully.", user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// app.post('/roles', async (req, res) => {
//   try {
//     const { user_id, user_email, role_name, created_by } = req.body;

//     const result = await db.query(
//       `INSERT INTO user_role (user_id, user_email, role_name, created_by, created_date, is_active)
//        VALUES ($1, $2, $3, $4, NOW(), true)
//        RETURNING *`,
//       [user_id, user_email, role_name, created_by]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
