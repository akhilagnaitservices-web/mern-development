import db from "../../config/db.js";
import { getImageUrl } from "../../helpers/fileHelper.js";




// GET ALL GALLERY
export const getGallery = async (req, res) => {

  try {

    const query = `
      SELECT *
      FROM gallery
      WHERE status = 'active'
      ORDER BY id DESC
    `;

    const [rows] = await db.query(query);

    const gallery = rows.map((item) => ({
      ...item,

      gallery_image: item.gallery_image
        ? getImageUrl(
            "gallery",
            item.gallery_image
          )
        : null
    }));

    return res.status(200).json({
      success: true,
      message: "Gallery fetched successfully",
      data: gallery
    });

  } catch (error) {

    console.log(
      "GET GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// GET GALLERY BY ID
export const getGalleryById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      SELECT *
      FROM gallery
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
        message: "Gallery item not found"
      });

    }

    const gallery = {
      ...rows[0],

      gallery_image: rows[0].gallery_image
        ? getImageUrl(
            "gallery",
            rows[0].gallery_image
          )
        : null
    };

    return res.status(200).json({
      success: true,
      message: "Gallery item fetched successfully",
      data: gallery
    });

  } catch (error) {

    console.log(
      "GET GALLERY BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// CREATE GALLERY
export const createGallery = async (
  req,
  res
) => {

  try {

    const {
      gallery_title,
      gallery_subtitle,
      image_title,
      short_description,
      full_description,
      category,
      button_name,
      button_link,
      status
    } = req.body;

    const gallery_image = req.file
      ? req.file.filename
      : null;

    const query = `
      INSERT INTO gallery (
        gallery_title,
        gallery_subtitle,
        image_title,
        gallery_image,
        short_description,
        full_description,
        category,
        button_name,
        button_link,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      gallery_title,
      gallery_subtitle,
      image_title,
      gallery_image,
      short_description,
      full_description,
      category,
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
      message: "Gallery item created successfully",
      gallery_id: result.insertId
    });

  } catch (error) {

    console.log(
      "CREATE GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// UPDATE GALLERY
export const updateGallery = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      gallery_title,
      gallery_subtitle,
      image_title,
      short_description,
      full_description,
      category,
      button_name,
      button_link,
      status
    } = req.body;

    let query = `
      UPDATE gallery
      SET
        gallery_title = ?,
        gallery_subtitle = ?,
        image_title = ?,
        short_description = ?,
        full_description = ?,
        category = ?,
        button_name = ?,
        button_link = ?,
        status = ?
    `;

    const values = [
      gallery_title,
      gallery_subtitle,
      image_title,
      short_description,
      full_description,
      category,
      button_name,
      button_link,
      status
    ];

    if (req.file) {

      query += `,
        gallery_image = ?
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
      message: "Gallery item updated successfully"
    });

  } catch (error) {

    console.log(
      "UPDATE GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// DELETE GALLERY
export const deleteGallery = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      DELETE FROM gallery
      WHERE id = ?
    `;

    await db.query(
      query,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully"
    });

  } catch (error) {

    console.log(
      "DELETE GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};