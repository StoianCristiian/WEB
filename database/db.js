import OracleDB from "oracledb";
import dotenv from "dotenv";
dotenv.config();

OracleDB.initOracleClient({ libDir: process.env.ORACLE_LIB_DIR });

export async function getConnection() {
    return await OracleDB.getConnection({
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectString: process.env.ORACLE_CONNECT_STRING
    });
}