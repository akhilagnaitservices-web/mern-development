import db from "../../config/db.js";

import fs from "fs";

import path from "path";

import { getImageUrl } from "../../helpers/fileHelper.js";

export const getEventGallery = async (req,res) => {

    try {

        const {
            event_id
        } = req.query;

        let query = `
            SELECT
                eg.*,
                em.event_title
            FROM event_gallery eg
            LEFT JOIN events_master em
            ON eg.event_id = em.event_id
            WHERE 1 = 1
        `;

        const params = [];

        if (event_id) {

            query += `
                AND eg.event_id = ?
            `;

            params.push(event_id);

        }

        query += `
            ORDER BY
            eg.sort_order ASC,
            eg.gallery_id DESC
        `;

        const [rows] =
        await db.query(
            query,
            params
        );

        const data =
        rows.map(item => ({

            ...item,

            image_path:
            getImageUrl(
                "event-gallery",
                item.image_path
            )

        }));

        return res.status(200).json({

            success: true,

            message:
            "Event gallery fetched successfully",

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

export const getEventGalleryById =async (req,res) => {

    try {

        const {
            id
        } = req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM event_gallery
            WHERE gallery_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Gallery image not found"

            });

        }

        const gallery = {

            ...rows[0],

            image_path:
            getImageUrl(
                "event-gallery",
                rows[0].image_path
            )

        };

        return res.status(200).json({

            success: true,

            data: gallery

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const createEventGallery =async (req,res) => {

    try {

        const {

            event_id,

            image_title,

            sort_order,

            status

        } = req.body;

        if (
            !event_id
        ) {

            return res.status(400).json({

                success: false,

                message:
                "Event is required"

            });

        }

        if (
            !req.file
        ) {

            return res.status(400).json({

                success: false,

                message:
                "Gallery image is required"

            });

        }

        const [result] =
        await db.query(
            `
            INSERT INTO event_gallery
            (
                event_id,
                image_title,
                image_path,
                sort_order,
                status
            )
            VALUES
            (?, ?, ?, ?, ?)
            `,
            [

                event_id,

                image_title,

                req.file.filename,

                sort_order || 0,

                status || "active"

            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "Gallery image created successfully",

            gallery_id:
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

export const updateEventGallery =async (req,res) => {

    try {

        const {
            id
        } = req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM event_gallery
            WHERE gallery_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Gallery image not found"

            });

        }

        let imageName =
        rows[0].image_path;

        if (req.file) {

            const oldImage =
            path.join(
                "uploads",
                "event-gallery",
                imageName
            );

            if (
                fs.existsSync(
                    oldImage
                )
            ) {

                fs.unlinkSync(
                    oldImage
                );

            }

            imageName =
            req.file.filename;

        }

        const {

            event_id,

            image_title,

            sort_order,

            status

        } = req.body;

        await db.query(
            `
            UPDATE event_gallery
            SET
                event_id = ?,
                image_title = ?,
                image_path = ?,
                sort_order = ?,
                status = ?
            WHERE gallery_id = ?
            `,
            [

                event_id,

                image_title,

                imageName,

                sort_order,

                status,

                id

            ]
        );

        return res.status(200).json({

            success: true,

            message:
            "Gallery image updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const deleteEventGallery =async (req,res) => {

    try {

        const {
            id
        } = req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM event_gallery
            WHERE gallery_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Gallery image not found"

            });

        }

        const imagePath =
        path.join(
            "uploads",
            "event-gallery",
            rows[0].image_path
        );

        if (
            rows[0].image_path &&
            fs.existsSync(
                imagePath
            )
        ) {

            fs.unlinkSync(
                imagePath
            );

        }

        await db.query(
            `
            DELETE
            FROM event_gallery
            WHERE gallery_id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success: true,

            message:
            "Gallery image deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};