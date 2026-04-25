import pools from "../config/db.js";

export const createUserRollServices = async (
  user_email,
  role_name,
  created_by
) => {
  // Step 1: Get user_id
  const userResult = await pools.query(
    `SELECT id FROM login_user WHERE email = $1`,
    [user_email]
  );

  if (userResult.rows.length === 0) {
    throw new Error("User not found with this email");
  }

  const user_id = userResult.rows[0].id;

  // Step 2: Check if role already exists
  const existingRole = await pools.query(
    `SELECT * FROM user_role 
     WHERE user_id = $1`,
    [user_id]
  );

  let result;

  // Step 3: Update if exists, else insert
  if (existingRole.rows.length > 0) {
    result = await pools.query(
      `UPDATE user_role
       SET is_active = true,
           created_by = $3,
           role_name = $2,
           created_date = NOW()
       WHERE user_id = $1 
       RETURNING *`,
      [user_id, role_name, created_by]
    );
  } else {
    result = await pools.query(
      `INSERT INTO user_role 
       (user_id, user_email, role_name, created_by, created_date, is_active)
       VALUES ($1, $2, $3, $4, NOW(), true)
       RETURNING *`,
      [user_id, user_email, role_name, created_by]
    );
  }

  return result.rows[0];
};

// export const createUserRollServices = async (
//   user_email,
//   role_name,
//   created_by
// ) => {
//   const result = await pools.query(
//     `INSERT INTO user_role
//      (user_id, user_email, role_name, created_by, created_date, is_active)
//      VALUES (
//        (SELECT id FROM login_user WHERE email = $1),
//        $1,
//        $2,
//        $3,
//        NOW(),
//        true
//      )
//      RETURNING *`,
//     [user_email, role_name, created_by]
//   );

//   return result.rows[0];
// };
