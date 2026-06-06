import db from "../../config/db.js";

export const getEventRegistrations =
async (
    req,
    res
) => {

    try {

        const {
            event_id
        } = req.query;

        let query = `
            SELECT

                er.*,

                em.event_title

            FROM event_registrations er

            LEFT JOIN events_master em
            ON er.event_id = em.event_id

            WHERE 1 = 1
        `;

        const params = [];

        if (event_id) {

            query += `
                AND er.event_id = ?
            `;

            params.push(
                event_id
            );

        }

        query += `
            ORDER BY
            er.registration_date DESC
        `;

        const [rows] =
        await db.query(
            query,
            params
        );

        return res.status(200).json({

            success: true,

            message:
            "Registrations fetched successfully",

            data: rows

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const getEventRegistrationById =
async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;

        const [rows] =
        await db.query(
            `
            SELECT

                er.*,

                em.event_title

            FROM event_registrations er

            LEFT JOIN events_master em
            ON er.event_id = em.event_id

            WHERE er.registration_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Registration not found"

            });

        }

        return res.status(200).json({

            success: true,

            data: rows[0]

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const createEventRegistration =
async (
    req,
    res
) => {

    try {

        const {

            event_id,

            full_name,

            mobile_number,

            email,

            members_count,

            remarks

        } = req.body;

        if (
            !event_id ||
            !full_name ||
            !mobile_number
        ) {

            return res.status(400).json({

                success: false,

                message:
                "Event, Name and Mobile Number are required"

            });

        }

        const [result] =
        await db.query(
            `
            INSERT INTO event_registrations
            (
                event_id,
                full_name,
                mobile_number,
                email,
                members_count,
                remarks
            )
            VALUES
            (?, ?, ?, ?, ?, ?)
            `,
            [

                event_id,

                full_name,

                mobile_number,

                email,

                members_count || 1,

                remarks

            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "Registration submitted successfully",

            registration_id:
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

export const deleteEventRegistration =
async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;

        await db.query(
            `
            DELETE
            FROM event_registrations
            WHERE registration_id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success: true,

            message:
            "Registration deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};