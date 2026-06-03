import db from "../config/db.js";
import fs from "fs";
import path from "path";

import { getImageUrl } from "../helpers/fileHelper.js";



// GET ALL BANNERS
export const getPageBanners = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM page_banners
      ORDER BY id DESC
    `);

    const data = rows.map((item) => ({
      ...item,
      banner_image: getImageUrl(
        "page-banners",
        item.banner_image
      )
    }));

    return res.status(200).json({
      success: true,
      message: "Page banners fetched successfully",
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET BY ID
export const getPageBannerById = async (req, res) => {

  try {

    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT * FROM page_banners WHERE id = ?`,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });

    }

    const banner = {
      ...rows[0],
      banner_image: getImageUrl(
        "page-banners",
        rows[0].banner_image
      )
    };

    return res.status(200).json({
      success: true,
      data: banner
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET BY PAGE NAME
export const getBannerByPageName = async (req, res) => {

  try {

    const { pageName } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM page_banners
      WHERE page_name = ?
      AND status = 'active'
      `,
      [pageName]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });

    }

    const banner = {
      ...rows[0],
      banner_image: getImageUrl(
        "page-banners",
        rows[0].banner_image
      )
    };

    return res.status(200).json({
      success: true,
      data: banner
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// CREATE
export const createPageBanner = async (req, res) => {

  try {

    const {
      page_name,
      banner_title,
      banner_subtitle,
      status
    } = req.body;

    if (
      !page_name ||
      !banner_title ||
      !req.file
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Page name, title and image are required"
      });

    }

    const [exists] = await db.query(
      `
      SELECT id
      FROM page_banners
      WHERE page_name = ?
      `,
      [page_name]
    );

    if (exists.length) {

      return res.status(400).json({
        success: false,
        message:
          "Banner already exists for this page"
      });

    }

    const [result] = await db.query(
      `
      INSERT INTO page_banners
      (
        page_name,
        banner_title,
        banner_subtitle,
        banner_image,
        status
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        page_name,
        banner_title,
        banner_subtitle || null,
        req.file.filename,
        status || "active"
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
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
export const updatePageBanner = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      page_name,
      banner_title,
      banner_subtitle,
      status
    } = req.body;

    const [rows] = await db.query(
      `SELECT * FROM page_banners WHERE id = ?`,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });

    }

    let imageName = rows[0].banner_image;

    if (req.file) {

      const oldImage = path.join(
        "uploads",
        "page-banners",
        imageName
      );

      if (fs.existsSync(oldImage)) {

        fs.unlinkSync(oldImage);

      }

      imageName = req.file.filename;

    }

    await db.query(
      `
      UPDATE page_banners
      SET
        page_name = ?,
        banner_title = ?,
        banner_subtitle = ?,
        banner_image = ?,
        status = ?
      WHERE id = ?
      `,
      [
        page_name,
        banner_title,
        banner_subtitle,
        imageName,
        status,
        id
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DELETE
export const deletePageBanner = async (req, res) => {

  try {

    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM page_banners
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message: "Banner not found"
      });

    }

    const imagePath = path.join(
      "uploads",
      "page-banners",
      rows[0].banner_image
    );

    if (fs.existsSync(imagePath)) {

      fs.unlinkSync(imagePath);

    }

    await db.query(
      `
      DELETE FROM page_banners
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// STATUS UPDATE
export const updatePageBannerStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const { status } = req.body;

    await db.query(
      `
      UPDATE page_banners
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    );

    return res.status(200).json({
      success: true,
      message: "Status updated successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};