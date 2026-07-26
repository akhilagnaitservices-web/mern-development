import db from "../../config/db.js"

export const createContactMessage =async (req,res) => {

    try {

        const {

            full_name,

            email,

            phone_number,

            subject,

            message

        } = req.body;

        const contact_id =
        `CNT-${String(Date.now()).slice(-6)}`;

        const [result] =
        await db.query(
            `
            INSERT INTO contact_messages
            (
                contact_id,

                full_name,
                email,
                phone_number,

                subject,
                message,

                ip_address,
                user_agent
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [

                contact_id,

                full_name,

                email,

                phone_number,

                subject,

                message,

                req.ip,

                req.headers[
                    "user-agent"
                ]

            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "Message submitted successfully",

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

export const getContactMessages =async (req,res) => {

    try {

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM contact_messages
            ORDER BY
            id DESC
            `
        );

        return res.status(200).json({

            success: true,

            message:
            "Messages fetched successfully",

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

export const getContactMessageById =
async (
    req,
    res
) => {

    try {

        const { id } =
        req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM contact_messages
            WHERE id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Message not found"

            });

        }

        return res.status(200).json({

            success: true,

            message:
            "Message fetched successfully",

            data:
            rows[0]

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const updateContactMessageStatus =async (req,res) => {

    try {

        const {id} = req.params;

        const { status,admin_reply } = req.body;

      await db.query(
`
UPDATE contact_messages
SET

    status = ?,

    admin_reply = ?,

    replied_at =
    CASE
        WHEN ? <> ''
        THEN NOW()
        ELSE replied_at
    END

WHERE id = ?
`,
[
    status,
    admin_reply,
    admin_reply,
    id
]
);

        return res.status(200).json({

            success: true,

            message:
            "Message status updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const deleteContactMessage =async (
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
            FROM contact_messages
            WHERE id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success: true,

            message:
            "Message deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

