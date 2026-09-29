import pool from "../config/database.js";

export const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required."
      });
    }

    const result = await pool.query(
      `
        INSERT INTO inquiries
          (name, email, message)
        VALUES
          ($1, $2, $3)
        RETURNING
          id,
          name,
          email,
          message,
          status,
          created_at
      `,
      [name, email, message]
    );

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been received.",
      inquiry: result.rows[0]
    });

  } catch (error) {
    console.error("Create inquiry error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing your inquiry."
    });
  }
};


export const getInquiries = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT
          id,
          name,
          email,
          message,
          status,
          created_at,
          updated_at
        FROM inquiries
        ORDER BY created_at DESC
      `
    );

    return res.status(200).json({
      success: true,
      inquiries: result.rows
    });

  } catch (error) {
    console.error("Get inquiries error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve inquiries."
    });
  }
};