import db from "../../config/db.js";

// Columns that are safe to sort by (password is never exposed)
const SORTABLE_COLUMNS = [
    "id",
    "user_id",
    "full_name",
    "username",
    "email",
    "role",
    "status",
    "created_at",
    "updated_at",
    "last_login"
];

// Safe fields returned to the client — never includes password
const USER_FIELDS = `
    id,
    user_id,
    full_name,
    username,
    email,
    phone_number,
    role,
    status,
    created_at,
    updated_at,
    last_login
`;

export const getUsers =
async (req, res) => {

    try {

        const {
            search,
            role,
            status,
            page,
            limit,
            sort,
            order
        } = req.query;

        // Build filters
        let where = " WHERE 1 = 1 ";
        const params = [];

        if (search) {

            where += `
                AND (
                    full_name LIKE ? OR
                    username LIKE ? OR
                    email LIKE ? OR
                    phone_number LIKE ?
                )
            `;

            const term = `%${search}%`;
            params.push(term, term, term, term);

        }

        if (role) {

            where += ` AND role = ? `;
            params.push(role);

        }

        if (status) {

            where += ` AND status = ? `;
            params.push(status);

        }

        // Sorting (whitelisted column + safe direction)
        const sortColumn =
        SORTABLE_COLUMNS.includes(sort)
            ? sort
            : "created_at";

        const sortOrder =
        String(order).toLowerCase() === "asc"
            ? "ASC"
            : "DESC";

        // Pagination
        const currentPage =
        Math.max(parseInt(page) || 1, 1);

        const perPage =
        Math.max(parseInt(limit) || 10, 1);

        const offset =
        (currentPage - 1) * perPage;

        // Total count (with the same filters)
        const [countRows] =
        await db.query(
            `
            SELECT COUNT(*) AS total
            FROM user_signup
            ${where}
            `,
            params
        );

        const total = countRows[0].total;

        // Page data
        const [rows] =
        await db.query(
            `
            SELECT ${USER_FIELDS}
            FROM user_signup
            ${where}
            ORDER BY ${sortColumn} ${sortOrder}
            LIMIT ? OFFSET ?
            `,
            [...params, perPage, offset]
        );

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: rows,
            pagination: {
                total,
                page: currentPage,
                limit: perPage,
                totalPages: Math.ceil(total / perPage)
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getUserById =
async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] =
        await db.query(
            `
            SELECT ${USER_FIELDS}
            FROM user_signup
            WHERE id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: rows[0]
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateUser =
async (req, res) => {

    try {

        const { id } = req.params;

        const {
            full_name,
            username,
            email,
            phone_number,
            role,
            status
        } = req.body;

        if (
            !full_name ||
            !username ||
            !email ||
            !role ||
            !status
        ) {

            return res.status(400).json({
                success: false,
                message:
                "Full Name, Username, Email, Role and Status are required"
            });

        }

        // Ensure the user exists
        const [existing] =
        await db.query(
            `
            SELECT id
            FROM user_signup
            WHERE id = ?
            `,
            [id]
        );

        if (!existing.length) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // Reject email already used by another user
        const [emailDup] =
        await db.query(
            `
            SELECT id
            FROM user_signup
            WHERE email = ? AND id != ?
            `,
            [email, id]
        );

        if (emailDup.length) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        // Reject username already used by another user
        const [usernameDup] =
        await db.query(
            `
            SELECT id
            FROM user_signup
            WHERE username = ? AND id != ?
            `,
            [username, id]
        );

        if (usernameDup.length) {

            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });

        }

        await db.query(
            `
            UPDATE user_signup
            SET
                full_name = ?,
                username = ?,
                email = ?,
                phone_number = ?,
                role = ?,
                status = ?
            WHERE id = ?
            `,
            [
                full_name,
                username,
                email,
                phone_number || null,
                role,
                status,
                id
            ]
        );

        return res.status(200).json({
            success: true,
            message: "User updated successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const deleteUser =
async (req, res) => {

    try {

        const { id } = req.params;

        // Ensure the user exists
        const [existing] =
        await db.query(
            `
            SELECT id
            FROM user_signup
            WHERE id = ?
            `,
            [id]
        );

        if (!existing.length) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        await db.query(
            `
            DELETE FROM user_signup
            WHERE id = ?
            `,
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
