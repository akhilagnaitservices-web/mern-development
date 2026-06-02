import db from "../../config/db.js";
import { getImageUrl } from "../../helpers/fileHelper.js";


// GET ALL EVENTS
export const getEvents = async (req, res) => {

  try {

    const query = `
      SELECT *
      FROM events
      ORDER BY event_date DESC
    `;

    const [rows] = await db.query(query);

    const events = rows.map((event) => ({
      ...event,

      event_image: event.event_image
        ? getImageUrl(
            "events",
            event.event_image
          )
        : null
    }));

    return res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      data: events
    });

  } catch (error) {

    console.log(
      "GET EVENTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// GET EVENT BY ID
export const getEventById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      SELECT *
      FROM events
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
        message: "Event not found"
      });

    }

    const event = {
      ...rows[0],

      event_image: rows[0].event_image
        ? getImageUrl(
            "events",
            rows[0].event_image
          )
        : null
    };

    return res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      data: event
    });

  } catch (error) {

    console.log(
      "GET EVENT BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// CREATE EVENT
export const createEvent = async (
  req,
  res
) => {

  try {

    const {
      event_title,
      event_subtitle,
      short_description,
      full_description,
      event_date,
      event_time,
      venue,
      button_name,
      button_link,
      status
    } = req.body;

    const event_image = req.file
      ? req.file.filename
      : null;

    const query = `
      INSERT INTO events (
        event_title,
        event_subtitle,
        short_description,
        full_description,
        event_date,
        event_time,
        venue,
        event_image,
        button_name,
        button_link,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      event_title,
      event_subtitle,
      short_description,
      full_description,
      event_date,
      event_time,
      venue,
      event_image,
      button_name,
      button_link,
      status || "upcoming" 
    ];

    const [result] = await db.query(
      query,
      values
    );

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event_id: result.insertId
    });

  } catch (error) {

    console.log(
      "CREATE EVENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// UPDATE EVENT
export const updateEvent = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      event_title,
      event_subtitle,
      short_description,
      full_description,
      event_date,
      event_time,
      venue,
      button_name,
      button_link,
      status
    } = req.body;

    let query = `
      UPDATE events
      SET
        event_title = ?,
        event_subtitle = ?,
        short_description = ?,
        full_description = ?,
        event_date = ?,
        event_time = ?,
        venue = ?,
        button_name = ?,
        button_link = ?,
        status = ?
    `;

    const values = [
      event_title,
      event_subtitle,
      short_description,
      full_description,
      event_date,
      event_time,
      venue,
      button_name,
      button_link,
      status
    ];

    if (req.file) {

      query += `,
        event_image = ?
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
      message: "Event updated successfully"
    });

  } catch (error) {

    console.log(
      "UPDATE EVENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};




// DELETE EVENT
export const deleteEvent = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const query = `
      DELETE FROM events
      WHERE id = ?
    `;

    await db.query(
      query,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });

  } catch (error) {

    console.log(
      "DELETE EVENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }

};