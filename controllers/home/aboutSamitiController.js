import db from "../../config/db.js";
import { getImageUrl } from "../../helpers/fileHelper.js";

// GET ACTIVE ABOUT SAMITI
export const getAboutSamiti = async (req, res) => {

  try {

    const query = `
      SELECT *
      FROM about_samiti
      WHERE status = 'active'
      ORDER BY id DESC
      LIMIT 1
    `;

    const [rows] = await db.query(query);

    const about = rows.length
      ? {
          ...rows[0],

          about_image: rows[0].about_image
            ? getImageUrl(
                "about-samiti",
                rows[0].about_image
              )
            : null
        }
      : null;

    return res.status(200).json({
      success: true,
      message: "About Samiti fetched successfully",
      data: about
    });

  } catch (error) {

    console.log(
      "GET ABOUT SAMITI ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// GET ABOUT SAMITI BY ID
export const getAboutSamitiById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      SELECT *
      FROM about_samiti
      WHERE id = ?
      LIMIT 1
    `;

    const [rows] = await db.query(
      query,
      [id]
    );

    if (rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "About Samiti not found"
      });

    }

    const about = {
      ...rows[0],

      about_image: rows[0].about_image
        ? getImageUrl(
            "about-samiti",
            rows[0].about_image
          )
        : null
    };

    return res.status(200).json({
      success: true,
      message: "About Samiti fetched successfully",
      data: about
    });

  } catch (error) {

    console.log(
      "GET ABOUT SAMITI BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// CREATE ABOUT SAMITI
export const createAboutSamiti = async (
  req,
  res
) => {

  try {

    const {
      about_title,
      about_subtitle,
      vision,
      mission,
      objectives,
      button_name,
      button_link,
      status
    } = req.body;

    const about_image = req.file
      ? req.file.filename
      : null;

    const query = `
      INSERT INTO about_samiti (
        about_title,
        about_subtitle,
        about_image,
        vision,
        mission,
        objectives,
        button_name,
        button_link,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      about_title,
      about_subtitle,
      about_image,
      vision,
      mission,
      objectives,
      button_name,
      button_link,
      status || "active"
    ];

    const [result] = await db.query(
      query,
      values
    );

    return res.status(201).json({
      success: true,
      message:
        "About Samiti created successfully",
      about_samiti_id:
        result.insertId
    });

  } catch (error) {

    console.log(
      "CREATE ABOUT SAMITI ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// UPDATE ABOUT SAMITI
export const updateAboutSamiti = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      about_title,
      about_subtitle,
      vision,
      mission,
      objectives,
      button_name,
      button_link,
      status
    } = req.body;

    let query = `
      UPDATE about_samiti
      SET
        about_title = ?,
        about_subtitle = ?,
        vision = ?,
        mission = ?,
        objectives = ?,
        button_name = ?,
        button_link = ?,
        status = ?
    `;

    const values = [
      about_title,
      about_subtitle,
      vision,
      mission,
      objectives,
      button_name,
      button_link,
      status
    ];

    if (req.file) {

      query += `,
        about_image = ?
      `;

      values.push(
        req.file.filename
      );

    }

    query += `
      WHERE id = ?
    `;

    values.push(id);

    await db.query(
      query,
      values
    );

    return res.status(200).json({
      success: true,
      message:
        "About Samiti updated successfully"
    });

  } catch (error) {

    console.log(
      "UPDATE ABOUT SAMITI ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// DELETE ABOUT SAMITI
export const deleteAboutSamiti = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      DELETE FROM about_samiti
      WHERE id = ?
    `;

    await db.query(
      query,
      [id]
    );

    return res.status(200).json({
      success: true,
      message:
        "About Samiti deleted successfully"
    });

  } catch (error) {

    console.log(
      "DELETE ABOUT SAMITI ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};