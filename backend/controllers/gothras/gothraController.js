import db from "../../config/db.js";

export const createGothra =
async (req, res) => {

  try {

    const {
      gothra_name,
      alphabetical_letter,
      short_description,
      icon,
      display_order,
      status
    } = req.body;

    if (
      !gothra_name ||
      !alphabetical_letter
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Gothra Name and Alphabetical Letter are required"
      });

    }

    const [exists] =
    await db.query(
      `
      SELECT id
      FROM gothras
      WHERE gothra_name = ?
      `,
      [gothra_name]
    );

    if (exists.length) {

      return res.status(400).json({
        success: false,
        message:
        "Gothra already exists"
      });

    }

    const [result] =
    await db.query(
      `
      INSERT INTO gothras
      (
        gothra_name,
        alphabetical_letter,
        short_description,
        icon,
        display_order,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        gothra_name,
        alphabetical_letter.toUpperCase(),
        short_description,
        icon,
        display_order || 0,
        status || "active"
      ]
    );

    return res.status(201).json({
      success: true,
      message:
      "Gothra created successfully",
      id: result.insertId
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const getGothras =
async (req, res) => {

  try {

    const {
      status,
      letter,
      search
    } = req.query;

    let query = `
      SELECT *
      FROM gothras
      WHERE 1=1
    `;

    const params = [];

    if (status) {

      query += `
        AND status = ?
      `;

      params.push(status);

    }

    if (letter) {

      query += `
        AND alphabetical_letter = ?
      `;

      params.push(letter);

    }

    if (search) {

      query += ` AND LOWER(gothra_name)
    LIKE LOWER(?)`;
      params.push(
        `%${search.trim()}%`
      );

    }

    query += `
      ORDER BY
      display_order ASC,
      gothra_name ASC
    `;

    const [rows] =
    await db.query(
      query,
      params
    );

    return res.status(200).json({
      success: true,
      message:
      "Gothras fetched successfully",
      data: rows
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



export const getGothraById =
async (req, res) => {

  try {

    const { id } =
    req.params;

    const [rows] =
    await db.query(
      `
      SELECT *
      FROM gothras
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message:
        "Gothra not found"
      });

    }

    return res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const updateGothra =
async (req, res) => {

  try {

    const { id } =
    req.params;

    const {
      gothra_name,
      alphabetical_letter,
      short_description,
      icon,
      display_order,
      status
    } = req.body;

    await db.query(
      `
      UPDATE gothras
      SET
        gothra_name = ?,
        alphabetical_letter = ?,
        short_description = ?,
        icon = ?,
        display_order = ?,
        status = ?
      WHERE id = ?
      `,
      [
        gothra_name,
        alphabetical_letter,
        short_description,
        icon,
        display_order,
        status,
        id
      ]
    );

    return res.status(200).json({
      success: true,
      message:
      "Gothra updated successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const deleteGothra =
async (req, res) => {

  try {

    const { id } =
    req.params;

    await db.query(
      `
      DELETE
      FROM gothras
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message:
      "Gothra deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};