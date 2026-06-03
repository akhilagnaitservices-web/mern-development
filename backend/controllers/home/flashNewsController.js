import db from "../../config/db.js";
import { getImageUrl } from "../../helpers/fileHelper.js";

// GET ALL ACTIVE FLASH NEWS
export const getFlashNews = async (req, res) => {

  try {

    const query = `
      SELECT *
      FROM flash_news
      WHERE status = 'active'
      ORDER BY news_date DESC
    `;

    const [rows] = await db.query(query);

    const news = rows.map((item) => ({
      ...item,

      news_image: item.news_image
        ? getImageUrl(
            "flash-news",
            item.news_image
          )
        : null
    }));

    return res.status(200).json({
      success: true,
      message: "Flash news fetched successfully",
      data: news
    });

  } catch (error) {

    console.log(
      "GET FLASH NEWS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};


// GET FLASH NEWS BY SLUG
export const getFlashNewsBySlug = async (
  req,
  res
) => {

  try {

    const { slug } = req.params;

    const query = `
      SELECT *
      FROM flash_news
      WHERE news_slug = ?
      LIMIT 1
    `;

    const [rows] = await db.query(
      query,
      [slug]
    );

    if (rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Flash news not found"
      });

    }

    const news = {
      ...rows[0],

      news_image: rows[0].news_image
        ? getImageUrl(
            "flash-news",
            rows[0].news_image
          )
        : null
    };

    return res.status(200).json({
      success: true,
      message: "Flash news fetched successfully",
      data: news
    });

  } catch (error) {

    console.log(
      "GET FLASH NEWS BY SLUG ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// GET FLASH NEWS BY ID
export const getFlashNewsById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      SELECT *
      FROM flash_news
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
        message: "Flash news not found"
      });

    }

    const news = {
      ...rows[0],

      news_image: rows[0].news_image
        ? getImageUrl(
            "flash-news",
            rows[0].news_image
          )
        : null
    };

    return res.status(200).json({
      success: true,
      message: "Flash news fetched successfully",
      data: news
    });

  } catch (error) {

    console.log(
      "GET FLASH NEWS BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// CREATE FLASH NEWS
export const createFlashNews = async (
  req,
  res
) => {

  try {

    const {
      news_title,
      news_slug,
      short_description,
      full_description,
      news_date,
      status
    } = req.body;

    const news_image = req.file
      ? req.file.filename
      : null;

    const query = `
      INSERT INTO flash_news (
        news_title,
        news_slug,
        short_description,
        full_description,
        news_image,
        news_date,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      news_title,
      news_slug,
      short_description,
      full_description,
      news_image,
      news_date,
      status || "active"
    ];

    const [result] = await db.query(
      query,
      values
    );

    return res.status(201).json({
      success: true,
      message: "Flash news created successfully",
      news_id: result.insertId
    });

  } catch (error) {

    console.log(
      "CREATE FLASH NEWS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// UPDATE FLASH NEWS
export const updateFlashNews = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      news_title,
      news_slug,
      short_description,
      full_description,
      news_date,
      status
    } = req.body;

    let query = `
      UPDATE flash_news
      SET
        news_title = ?,
        news_slug = ?,
        short_description = ?,
        full_description = ?,
        news_date = ?,
        status = ?
    `;

    const values = [
      news_title,
      news_slug,
      short_description,
      full_description,
      news_date,
      status
    ];

    if (req.file) {

      query += `,
        news_image = ?
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
      message: "Flash news updated successfully"
    });

  } catch (error) {

    console.log(
      "UPDATE FLASH NEWS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// DELETE FLASH NEWS
export const deleteFlashNews = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      DELETE FROM flash_news
      WHERE id = ?
    `;

    await db.query(
      query,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Flash news deleted successfully"
    });

  } catch (error) {

    console.log(
      "DELETE FLASH NEWS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};