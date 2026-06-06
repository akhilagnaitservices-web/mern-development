import db from "../../config/db.js";
import fs from "fs";
import path from "path";

import {getImageUrl} from "../../helpers/fileHelper.js"
import createSlug from "../../helpers/slugify.js";

export const getEvents = async (req,res) => {

    try {

        const {
            status,
            category,
            type,
            city,
            search
        } = req.query;

        let query = `
            SELECT *
            FROM events_master
            WHERE 1 = 1
        `;

        const params = [];

        if (status) {

            query += `
                AND status = ?
            `;

            params.push(status);

        }

        if (category) {

            query += `
                AND event_category = ?
            `;

            params.push(category);

        }

        if (type) {

            query += `
                AND event_type = ?
            `;

            params.push(type);

        }

        if (city) {

            query += `
                AND city = ?
            `;

            params.push(city);

        }

        if (search) {

            query += `
                AND event_title LIKE ?
            `;

            params.push(
                `%${search}%`
            );

        }

        query += `
            ORDER BY
            event_date DESC,
            display_order ASC
        `;

        const [rows] =
        await db.query(
            query,
            params
        );

        const data =
        rows.map(event => ({

            ...event,

            event_image:
            getImageUrl(
                "events",
                event.event_image
            )

        }));

        return res.status(200).json({

            success: true,

            message:
            "Events fetched successfully",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const getEventById = async (req,res) => {

    try {

        const {
            id
        } = req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM events_master
            WHERE event_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Event not found"

            });

        }

        const event = {

            ...rows[0],

            event_image:
            getImageUrl(
                "events",
                rows[0].event_image
            )

        };

        return res.status(200).json({

            success: true,

            data: event

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const createEvent = async (req,res) => {

    try {

        const {

            event_title,
            event_category,
            event_type,

            short_description,
            event_description,

            event_date,
            start_time,
            end_time,

            venue_name,
            venue_address,
            city,
            state,
            pincode,

            organized_by,
            open_to,

            contact_person,
            contact_phone,
            contact_email,

            registration_link,

            display_order,
            status

        } = req.body;

        if (!event_title) {

            return res.status(400).json({

                success: false,

                message:
                "Event title is required"

            });

        }

        const event_slug =
          createSlug(
            event_title
        );

        const [result] =
        await db.query(
            `
            INSERT INTO events_master
            (
                event_title,
                event_slug,
                event_category,
                event_type,
                event_image,

                short_description,
                event_description,

                event_date,
                start_time,
                end_time,

                venue_name,
                venue_address,
                city,
                state,
                pincode,

                organized_by,
                open_to,

                contact_person,
                contact_phone,
                contact_email,

                registration_link,

                display_order,
                status
            )
            VALUES
            (
             ?, ?, ?, ?, ?,?, ?,?, ?, ?,?, ?, ?, ?, ?,?, ?,?, ?, ?,?,?, ?)`,
            [

                event_title,
                event_slug,

                event_category,
                event_type,

                req.file
                ? req.file.filename
                : null,

                short_description,
                event_description,

                event_date,
                start_time,
                end_time,

                venue_name,
                venue_address,
                city,
                state,
                pincode,

                organized_by,
                open_to,

                contact_person,
                contact_phone,
                contact_email,

                registration_link,

                display_order || 0,

                status || "upcoming"

            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "Event created successfully",

            event_id:
            result.insertId

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const updateEvent = async (req,res) => {

    try {

        const { id } =
        req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM events_master
            WHERE event_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Event not found"

            });

        }

        const existingEvent =
        rows[0];

        let imageName =
        existingEvent.event_image;

        if (req.file) {

            if (imageName) {

                const oldImagePath = path.join( "uploads", "events", imageName );

                if (
                    fs.existsSync(
                        oldImagePath
                    )
                ) {

                    fs.unlinkSync(
                        oldImagePath
                    );

                }

            }

            imageName = req.file.filename;

        }

        const {

            event_title,
            event_category,
            event_type,

            short_description,
            event_description,

            event_date,
            start_time,
            end_time,

            venue_name,
            venue_address,
            city,
            state,
            pincode,

            organized_by,
            open_to,

            contact_person,
            contact_phone,
            contact_email,

            registration_link,

            display_order,
            status

        } = req.body;

        const event_slug =
          createSlug(
            event_title
        );

        await db.query(
            `
            UPDATE events_master
            SET

                event_title = ?,
                event_slug = ?,

                event_category = ?,
                event_type = ?,
                event_image = ?,

                short_description = ?,
                event_description = ?,

                event_date = ?,
                start_time = ?,
                end_time = ?,

                venue_name = ?,
                venue_address = ?,
                city = ?,
                state = ?,
                pincode = ?,

                organized_by = ?,
                open_to = ?,

                contact_person = ?,
                contact_phone = ?,
                contact_email = ?,

                registration_link = ?,

                display_order = ?,
                status = ?

            WHERE event_id = ?
            `,
            [

                event_title,
                event_slug,

                event_category,
                event_type,
                imageName,

                short_description,
                event_description,

                event_date,
                start_time,
                end_time,

                venue_name,
                venue_address,
                city,
                state,
                pincode,

                organized_by,
                open_to,

                contact_person,
                contact_phone,
                contact_email,

                registration_link,

                display_order,
                status,

                id

            ]
        );

        return res.status(200).json({

            success: true,

            message:
            "Event updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const deleteEvent = async (req,res) => {

    try {

        const { id } =
        req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM events_master
            WHERE event_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,
                message:
                "Event not found"

            });

        }

        const event =
        rows[0];

        if (
            event.event_image
        ) {

            const imagePath =
            path.join(
                "uploads",
                "events",
                event.event_image
            );

            if (
                fs.existsSync(
                    imagePath
                )
            ) {

                fs.unlinkSync(
                    imagePath
                );

            }

        }

        await db.query(
            `
            DELETE
            FROM events_master
            WHERE event_id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success: true,
            message:
            "Event deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};