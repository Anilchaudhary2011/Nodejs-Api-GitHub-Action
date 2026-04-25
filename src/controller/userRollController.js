import { createUserRollServices } from "../models/createUserRoll.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUserRoll = async (req, res, next) => {
  const { user_email, role_name, created_by } = req.body;
  console.log(req.body);
  

  try {
    //  Validation
    if (!user_email || !role_name || !created_by) {
      return handleResponse(
        res,
        400,
        "All fields are required (user_email, role_name, created_by)",
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return handleResponse(res, 400, "Invalid email format");
    }

    // Call service
    const newUserRole = await createUserRollServices(
      user_email,
      role_name,
      created_by,
    );

    handleResponse(res, 201, "Role created successfully", newUserRole);
  } catch (err) {
    handleResponse(res, 500, err.message);
  }
};

// export const createUserRoll = async (req, res, next) => {
//   const { user_id, user_email, role_name, created_by } = req.body;

//   try {
//     // ✅ Validation
//     if (!user_id || !user_email || !role_name || !created_by) {
//       return handleResponse(
//         res,
//         400,
//         "All fields are required (user_id, user_email, role_name, created_by)"
//       );
//     }

//     // ✅ Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(user_email)) {
//       return handleResponse(res, 400, "Invalid email format");
//     }

//     // ✅ Call service
//     const newUserRole = await createUserRollServices(
//       user_id,
//       user_email,
//       role_name,
//       created_by
//     );

//     // ✅ Response
//     handleResponse(res, 201, "Role created successfully", newUserRole);

//   } catch (err) {
//     handleResponse(res, 500, err.message);
//   }
// };
