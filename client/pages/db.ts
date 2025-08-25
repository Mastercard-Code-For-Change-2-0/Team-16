import {Pool} from "pg";

const pool= new Pool({
  user:"postgres",
  host:"localhost",
  database:"hackathon",
  password:"dev@2005",
  port:5432,
});

pool.connect().then(client=>{
  console.log("Connected");
  client.release();
})
  .catch(err=>{
    console.error("Connection Error",err.stack);
  });

export default pool;