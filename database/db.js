import OracleDB from "oracledb";
import dotenv from "dotenv";
dotenv.config();

if (process.env.ORACLE_LIB_DIR) {
  try {
    OracleDB.initOracleClient({ libDir: process.env.ORACLE_LIB_DIR });
  } catch (err) {
    console.error("❌ Eroare initOracleClient:", err);
  }
}

export async function getConnection() {
  return await OracleDB.getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING,
  });
}
