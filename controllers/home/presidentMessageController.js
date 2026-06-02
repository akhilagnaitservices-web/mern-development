import db from "../../config/db.js";
import { getImageUrl } from "../../helpers/fileHelper.js";


// GET ALL ACTIVE PRESIDENT MESSAGES
export const getPresidentMessage = async (req, res) => {
  try {
    // Removed LIMIT 1 to pull all matching records
    const query = `
      SELECT *
      FROM president_messages
      WHERE status = 'active'
      ORDER BY id DESC
    `;

    const [rows] = await db.query(query);

    // Using .map() to loop through all records and format each photo URL
    const presidents = rows.map((president) => ({
      ...president,
      president_photo: president.president_photo
        ? getImageUrl("president-message", president.president_photo)
        : null
    }));

    return res.status(200).json({
      success: true,
      message: "Active president messages fetched successfully",
      count: presidents.length,
      data: presidents // This will now return an array [ {}, {}, ... ]
    });

  } catch (error) {
    console.log("GET PRESIDENT MESSAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};



// GET PRESIDENT MESSAGE BY ID
export const getPresidentMessageById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      SELECT *
      FROM president_messages
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
        message: "President message not found"
      });

    }

    const president = {
      ...rows[0],

      president_photo: rows[0].president_photo
        ? getImageUrl(
            "president-message",
            rows[0].president_photo
          )
        : null
    };

    return res.status(200).json({
      success: true,
      message: "President message fetched successfully",
      data: president
    });

  } catch (error) {

    console.log(
      "GET PRESIDENT MESSAGE BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// CREATE PRESIDENT MESSAGE
export const createPresidentMessage = async (
  req,
  res
) => {

  try {

    const {
      president_name,
      designation,
      message_title,
      message_description,
      button_name,
      button_link,
      status
    } = req.body;

    const president_photo = req.file
      ? req.file.filename
      : null;

    const query = `
      INSERT INTO president_messages (
        president_name,
        designation,
        president_photo,
        message_title,
        message_description,
        button_name,
        button_link,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      president_name,
      designation,
      president_photo,
      message_title,
      message_description,
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
        "President message created successfully",
      president_message_id:
        result.insertId
    });

  } catch (error) {

    console.log(
      "CREATE PRESIDENT MESSAGE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// UPDATE PRESIDENT MESSAGE
export const updatePresidentMessage = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      president_name,
      designation,
      message_title,
      message_description,
      button_name,
      button_link,
      status
    } = req.body;

    let query = `
      UPDATE president_messages
      SET
        president_name = ?,
        designation = ?,
        message_title = ?,
        message_description = ?,
        button_name = ?,
        button_link = ?,
        status = ?
    `;

    const values = [
      president_name,
      designation,
      message_title,
      message_description,
      button_name,
      button_link,
      status
    ];

    if (req.file) {

      query += `,
        president_photo = ?
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
        "President message updated successfully"
    });

  } catch (error) {

    console.log(
      "UPDATE PRESIDENT MESSAGE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// DELETE PRESIDENT MESSAGE
export const deletePresidentMessage = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      DELETE FROM president_messages
      WHERE id = ?
    `;

    await db.query(
      query,
      [id]
    );

    return res.status(200).json({
      success: true,
      message:
        "President message deleted successfully"
    });

  } catch (error) {

    console.log(
      "DELETE PRESIDENT MESSAGE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};