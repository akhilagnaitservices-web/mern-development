import db from "../../config/db.js";
import { getImageUrl } from "../../helpers/fileHelper.js";


// GET ALL ACTIVE QUICK SERVICES
export const getQuickServices = async (req, res) => {

  try {

    const query = `
      SELECT *
      FROM home_quick_services
      WHERE status = 'active'
      ORDER BY display_order ASC
    `;

    const [rows] = await db.query(query);

    const services = rows.map((service) => ({
      ...service,

      service_icon: service.service_icon
        ? getImageUrl(
            "services",
            service.service_icon
          )
        : null
    }));

    return res.status(200).json({
      success: true,
      message: "Quick services fetched successfully",
      data: services
    });

  } catch (error) {

    console.log(
      "GET QUICK SERVICES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// GET QUICK SERVICE BY ID
export const getQuickServiceById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      SELECT *
      FROM home_quick_services
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
        message: "Quick service not found"
      });

    }

    const service = {
      ...rows[0],

      service_icon: rows[0].service_icon
        ? getImageUrl(
            "services",
            rows[0].service_icon
          )
        : null
    };

    return res.status(200).json({
      success: true,
      message: "Quick service fetched successfully",
      data: service
    });

  } catch (error) {

    console.log(
      "GET QUICK SERVICE BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// CREATE QUICK SERVICE
export const createQuickService = async (
  req,
  res
) => {

  try {

    const {
      service_name,
      short_description,
      redirect_url,
      display_order,
      status
    } = req.body;

    const service_icon = req.file
      ? req.file.filename
      : null;

    const query = `
      INSERT INTO home_quick_services (
        service_name,
        service_icon,
        short_description,
        redirect_url,
        display_order,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      service_name,
      service_icon,
      short_description,
      redirect_url,
      display_order || 0,
      status || "active"
    ];

    const [result] = await db.query(
      query,
      values
    );

    return res.status(201).json({
      success: true,
      message:
        "Quick service created successfully",
      service_id: result.insertId
    });

  } catch (error) {

    console.log(
      "CREATE QUICK SERVICE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// UPDATE QUICK SERVICE
export const updateQuickService = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      service_name,
      short_description,
      redirect_url,
      display_order,
      status
    } = req.body;

    let query = `
      UPDATE home_quick_services
      SET
        service_name = ?,
        short_description = ?,
        redirect_url = ?,
        display_order = ?,
        status = ?
    `;

    const values = [
      service_name,
      short_description,
      redirect_url,
      display_order,
      status
    ];

    if (req.file) {

      query += `,
        service_icon = ?
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
        "Quick service updated successfully"
    });

  } catch (error) {

    console.log(
      "UPDATE QUICK SERVICE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// DELETE QUICK SERVICE
export const deleteQuickService = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      DELETE FROM home_quick_services
      WHERE id = ?
    `;

    await db.query(
      query,
      [id]
    );

    return res.status(200).json({
      success: true,
      message:
        "Quick service deleted successfully"
    });

  } catch (error) {

    console.log(
      "DELETE QUICK SERVICE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};