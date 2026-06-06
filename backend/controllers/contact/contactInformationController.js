import db from "../../config/db.js";

export const getContactInformation =async (req,res) => {

    try {

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM contact_information
            LIMIT 1
            `
        );

        return res.status(200).json({

            success: true,

            message:
            "Contact information fetched successfully",

            data:
            rows.length
            ? rows[0]
            : null

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const createContactInformation =async (req,res) => {

    try {

        const {

            office_name,

            address,

            primary_phone,
            secondary_phone,

            primary_email,
            secondary_email,

            office_hours,

            google_map_url,

            membership_phone,
            matrimony_phone,
            events_phone,

            status

        } = req.body;

        const [existing] =
        await db.query(
            `
            SELECT id
            FROM contact_information
            LIMIT 1
            `
        );

        if (existing.length) {

            return res.status(400).json({

                success: false,

                message:
                "Contact information already exists"

            });

        }

        const [result] =
        await db.query(
            `
            INSERT INTO contact_information
            (
                office_name,
                address,

                primary_phone,
                secondary_phone,

                primary_email,
                secondary_email,

                office_hours,

                google_map_url,

                membership_phone,
                matrimony_phone,
                events_phone,

                status
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [

                office_name,
                address,

                primary_phone,
                secondary_phone,

                primary_email,
                secondary_email,

                office_hours,

                google_map_url,

                membership_phone,
                matrimony_phone,
                events_phone,

                status || "active"

            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "Contact information created successfully",

            id:
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

export const updateContactInformation =async (req,res) => {

    try {

        const {
            id
        } = req.params;

        const {

            office_name,

            address,

            primary_phone,
            secondary_phone,

            primary_email,
            secondary_email,

            office_hours,

            google_map_url,

            membership_phone,
            matrimony_phone,
            events_phone,

            status

        } = req.body;

        await db.query(
            `
            UPDATE contact_information
            SET

                office_name = ?,
                address = ?,

                primary_phone = ?,
                secondary_phone = ?,

                primary_email = ?,
                secondary_email = ?,

                office_hours = ?,

                google_map_url = ?,

                membership_phone = ?,
                matrimony_phone = ?,
                events_phone = ?,

                status = ?

            WHERE id = ?
            `,
            [

                office_name,
                address,

                primary_phone,
                secondary_phone,

                primary_email,
                secondary_email,

                office_hours,

                google_map_url,

                membership_phone,
                matrimony_phone,
                events_phone,

                status,

                id

            ]
        );

        return res.status(200).json({

            success: true,

            message:
            "Contact information updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const getContactInformationById =
async (
    req,
    res
) => {

    const { id } =
    req.params;

    const [rows] =
    await db.query(
        `
        SELECT *
        FROM contact_information
        WHERE id = ?
        `,
        [id]
    );

    return res.json({

        success: true,

        data:
        rows[0]

    });

};