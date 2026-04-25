import pools from "../config/db.js";

export const getAllUserServices = async () => {
  const result = await pools.query("select * from users");
  return result.rows;
};

export const getUserByIdServices = async (id) => {
  const result = await pools.query("select * from users where id = $1", [id]);
  return result.rows[0];
};

export const createUserServices = async (name, email) => {
  const result = await pools.query(
    "insert into users (name, email) values ($1, $2) returning *",
    [name, email],
  );
  return result.rows[0];
};

export const updateUserByIdServices = async (id, name, email) => {
  const result = await pools.query(
    "update users set name = $1, email = $2 where id = $3 returning *",
    [name, email,id],
  );
  return result.rows[0];
};

export const deleteUserByIdServices = async (id) => {
  const result = await pools.query("delete from users where id = $1 returning *", [id]);
  return result.rows[0];
};
