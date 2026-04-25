import pkg from "pg";
const {Pool} = pkg;
import dotenv from "dotenv";
dotenv.config();


// console.log(process.env.DB_USER);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_NAME);
// console.log(process.env.DB_PORT);

const pools = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});

pools.on("connect", ()=>{
    console.log("connected");
    
})

export default pools