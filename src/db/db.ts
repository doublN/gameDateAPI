import mysql from "mysql2/promise";

const environment = process.env.NODE_ENV || "production";

let database = "";

switch (environment) {
  case "test":
    database = "gamedate-test";
    break;
  case "development":
    database = "gamedate-local";
    break;
  default:
    database = "gamedate-prod";
}

export const connection = await mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: database,
});

connection.connect();

export const query = async (
  queryString: string,
  params: Array<string | number> = []
) => {
  const [result, fields] = await connection.query(queryString, params);
  return [result, fields];
};
