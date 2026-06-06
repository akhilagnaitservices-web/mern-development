import db from "../../config/db.js";

import createSlug from "../../helpers/slugify.js";

export const getGalleryCategories =
async (
    req,
    res
) => {

    try {

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM gallery_categories
            ORDER BY
            display_order ASC,
            category_name ASC
            `
        );

        return res.status(200).json({

            success: true,

            message:
            "Gallery categories fetched successfully",

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

export const getGalleryCategoryById =
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
            SELECT *
            FROM gallery_categories
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

export const createGalleryCategory =
async (
    req,
    res
) => {

    try {

        const {

            category_name,

            category_icon,

            display_order,

            status

        } = req.body;

        if (!category_name) {

            return res.status(400).json({

                success: false,

                message:
                "Category name is required"

            });

        }

        const category_slug =
        createSlug(
            category_name
        );

        const [result] =
        await db.query(
            `
            INSERT INTO gallery_categories
            (
                category_name,
                category_slug,
                category_icon,
                display_order,
                status
            )
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [

                category_name,

                category_slug,

                category_icon,

                display_order || 0,

                status || "active"

            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "Gallery category created successfully",

            category_id:
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

export const updateGalleryCategory =
async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;

        const {

            category_name,

            category_icon,

            display_order,

            status

        } = req.body;

        const category_slug =
        createSlug(
            category_name
        );

        await db.query(
            `
            UPDATE gallery_categories
            SET

                category_name = ?,

                category_slug = ?,

                category_icon = ?,

                display_order = ?,

                status = ?

            WHERE category_id = ?
            `,
            [

                category_name,

                category_slug,

                category_icon,

                display_order,

                status,

                id

            ]
        );

        return res.status(200).json({

            success: true,

            message:
            "Gallery category updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const deleteGalleryCategory =
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
            FROM gallery_categories
            WHERE category_id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success: true,

            message:
            "Gallery category deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};