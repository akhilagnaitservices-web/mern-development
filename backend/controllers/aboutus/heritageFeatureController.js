import db from "../../config/db.js";

// GET ALL
export const getHeritageFeatures =
async (req, res) => {

  try {

    const [rows] =
    await db.query(`
      SELECT *
      FROM heritage_features
      ORDER BY display_order ASC, id DESC
    `);

    return res.status(200).json({
      success: true,
      message:
      "Heritage features fetched successfully",
      data: rows
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET BY ID
export const getHeritageFeatureById =
async (req, res) => {

  try {

    const { id } =
    req.params;

    const [rows] =
    await db.query(
      `
      SELECT *
      FROM heritage_features
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message:
        "Feature not found"
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



// CREATE
export const createHeritageFeature =
async (req, res) => {

  try {

    const {
      title,
      description,
      icon,
      display_order,
      status
    } = req.body;

    if (
      !title ||
      !description
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Title and description are required"
      });

    }

    const [result] =
    await db.query(
      `
      INSERT INTO heritage_features
      (
        title,
        description,
        icon,
        display_order,
        status
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        title,
        description,
        icon || null,
        display_order || 0,
        status || "active"
      ]
    );

    return res.status(201).json({
      success: true,
      message:
      "Feature created successfully",
      id: result.insertId
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// UPDATE
export const updateHeritageFeature =
async (req, res) => {

  try {

    const { id } =
    req.params;

    const {
      title,
      description,
      icon,
      display_order,
      status
    } = req.body;

    const [rows] =
    await db.query(
      `
      SELECT id
      FROM heritage_features
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message:
        "Feature not found"
      });

    }

    await db.query(
      `
      UPDATE heritage_features
      SET
        title = ?,
        description = ?,
        icon = ?,
        display_order = ?,
        status = ?
      WHERE id = ?
      `,
      [
        title,
        description,
        icon,
        display_order,
        status,
        id
      ]
    );

    return res.status(200).json({
      success: true,
      message:
      "Feature updated successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};







// DELETE
export const deleteHeritageFeature =
async (req, res) => {

  try {

    const { id } =
    req.params;

    const [rows] =
    await db.query(
      `
      SELECT id
      FROM heritage_features
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message:
        "Feature not found"
      });

    }

    await db.query(
      `
      DELETE
      FROM heritage_features
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message:
      "Feature deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};