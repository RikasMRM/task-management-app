// knexfile.ts
import type { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in the environment variables.");
  process.exit(1);
}

const parseDatabaseUrl = (url: string): Knex.PgConnectionConfig => {
  const [protocol, rest] = url.split("://");
  const [credentials, hostPortDb] = rest.split("@");
  const [user, password] = credentials.split(":");
  const [hostPort, database] = hostPortDb.split("/");
  const [host, port] = hostPort.split(":");

  return {
    host,
    port: parseInt(port, 10),
    user,
    password,
    database,
    ssl: { rejectUnauthorized: false },
  };
};

const connectionConfig = parseDatabaseUrl(process.env.DATABASE_URL);

console.log(
  "Attempting to connect to:",
  `${connectionConfig.user}:****@${connectionConfig.host}:${connectionConfig.port}/${connectionConfig.database}`
);

const config: Knex.Config = {
  client: "pg",
  connection: connectionConfig,
  migrations: {
    directory: "./src/db/migrations",
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default config;
