import db from "../../config/db.js";
import { getImageUrl } from "../../helpers/fileHelper.js";



// GET ALL ACTIVE BANNERS
export const getBanners = async (req, res) => {

  try {

    const query = `
      SELECT *
      FROM banners
      WHERE status = 'active'
      ORDER BY id DESC
    `;

    const [rows] = await db.query(query);

    const banners = rows.map((banner) => ({
      ...banner,

      banner_image: banner.banner_image
        ? getImageUrl("banners", banner.banner_image)
        : null
    }));

    return res.status(200).json({
      success: true,
      message: "Banners fetched successfully",
      data: banners
    });

  } catch (error) {

    console.log("GET BANNERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};



// GET SINGLE BANNER
export const getBannerById = async (req, res) => {

  try {

    const { id } = req.params;

    const query = `
      SELECT *
      FROM banners
      WHERE id = ?
      LIMIT 1
    `;

    const [rows] = await db.query(query, [id]);

    if (rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });

    }

    const banner = {
      ...rows[0],

      banner_image: rows[0].banner_image
        ? getImageUrl("banners", rows[0].banner_image)
        : null
    };

    return res.status(200).json({
      success: true,
      message: "Banner fetched successfully",
      data: banner
    });

  } catch (error) {

    console.log("GET BANNER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};



// CREATE BANNER
export const createBanner = async (req, res) => {

  try {

    const {
      banner_title,
      banner_subtitle,
      button1_name,
      button1_link,
      button2_name,
      button2_link,
      button3_name,
      button3_link,
      status
    } = req.body;

    const banner_image = req.file
      ? req.file.filename
      : null;

    const query = `
      INSERT INTO banners (
        banner_title,
        banner_subtitle,
        banner_image,
        button1_name,
        button1_link,
        button2_name,
        button2_link,
        button3_name,
        button3_link,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      banner_title,
      banner_subtitle,
      banner_image,
      button1_name || null,
      button1_link || null,
      button2_name || null,
      button2_link || null,
      button3_name || null,
      button3_link || null,
      status || "active"
    ];

    const [result] = await db.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner_id: result.insertId
    });

  } catch (error) {

    console.log("CREATE BANNER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};



// UPDATE BANNER
export const updateBanner = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      banner_title,
      banner_subtitle,
      button1_name,
      button1_link,
      button2_name,
      button2_link,
      button3_name,
      button3_link,
      status
    } = req.body;

    let query = `
      UPDATE banners
      SET
        banner_title = ?,
        banner_subtitle = ?,
        button1_name = ?,
        button1_link = ?,
        button2_name = ?,
        button2_link = ?,
        button3_name = ?,
        button3_link = ?,
        status = ?
    `;

    const values = [
      banner_title,
      banner_subtitle,
      button1_name,
      button1_link,
      button2_name,
      button2_link,
      button3_name,
      button3_link,
      status
    ];

    if (req.file) {

      query += `,
        banner_image = ?
      `;

      values.push(req.file.filename);

    }

    query += ` WHERE id = ?`;

    values.push(id);

    await db.query(query, values);

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully"
    });

  } catch (error) {

    console.log("UPDATE BANNER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};



// DELETE BANNER
export const deleteBanner = async (req, res) => {

  try {

    const { id } = req.params;

    const query = `
      DELETE FROM banners
      WHERE id = ?
    `;

    await db.query(query, [id]);

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully"
    });

  } catch (error) {

    console.log("DELETE BANNER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};