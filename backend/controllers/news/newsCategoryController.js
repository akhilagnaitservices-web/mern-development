import db from "../../config/db.js";
import createSlug from "../../helpers/slugify.js";

export const createNewsCategory =async(req, res) => {

    try {

        const {

            category_name,
            display_order,
            status
        } = req.body;

        if (!category_name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }
        
        const category_slug =
        createSlug(category_name);

    

        

        const [result] =
        await db.query(
            `
            INSERT INTO news_categories
            (
                category_name,
                category_slug,
                display_order,
                status
            )
            VALUES
            (?, ?, ?, ?)
            `,
            [
                category_name,
                category_slug,
                display_order,
                status
            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "News category created successfully",

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

export const getNewsCategories =
async (req, res) => {

    try {

        const { status } =
        req.query;

        let query =
        `
        SELECT *
        FROM news_categories
        `;

        const values = [];

        if (status) {

            query +=
            `
            WHERE status = ?
            `;

            values.push(status);

        }

        query +=
        `
        ORDER BY
        display_order ASC
        `;

        const [rows] =
        await db.query(
            query,
            values
        );

        return res.status(200).json({

            success: true,

            message:
            "News categories fetched successfully",

            data:
            rows

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const getNewsCategoryById =
async (req, res) => {

    try {

        const { id } =
        req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM news_categories
            WHERE category_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Category not found"

            });

        }

        return res.status(200).json({

            success: true,

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

export const updateNewsCategory =
async (req, res) => {

    try {

        const { id } =
        req.params;

        const {

            category_name,
            display_order,
            status

        } = req.body;
        const category_slug =
createSlug(category_name);

        await db.query(
            `
            UPDATE news_categories
            SET

                category_name = ?,
                category_slug = ?,
                display_order = ?,
                status = ?

            WHERE category_id = ?
            `,
            [

                category_name,
                category_slug,
                display_order,
                status,

                id

            ]
        );

        return res.status(200).json({

            success: true,

            message:
            "Category updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const deleteNewsCategory =
async (req, res) => {

    try {

        const { id } =
        req.params;

        await db.query(
            `
            DELETE
            FROM news_categories
            WHERE category_id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success: true,

            message:
            "Category deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};