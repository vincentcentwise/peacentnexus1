import app from "./app.js";
import pool from "./config/database.js";

const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    // Test PostgreSQL connection
    await pool.query("SELECT NOW()");

    console.log("PostgreSQL connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Peacent Nexus API running on port ${PORT}`
      );
    });

  } catch (error) {
    console.error("PostgreSQL connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};

startServer();