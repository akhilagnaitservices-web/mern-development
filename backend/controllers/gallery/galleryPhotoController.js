import db from "../../config/db.js";
import fs from "fs";
import path from "path";

import { getImageUrl } from "../../helpers/fileHelper.js";

export const getGalleryPhotos =
async (
    req,
    res
) => {

    try {

        const {
            album_id
        } = req.query;

        let query = `
            SELECT

                gp.*,

                ga.album_title

            FROM gallery_photos gp

            LEFT JOIN gallery_albums ga
            ON gp.album_id = ga.album_id

            WHERE 1 = 1
        `;

        const params = [];

        if (album_id) {

            query += `
                AND gp.album_id = ?
            `;

            params.push(
                album_id
            );

        }

        query += `
            ORDER BY
            gp.image_order ASC,
            gp.photo_id DESC
        `;

        const [rows] =
        await db.query(
            query,
            params
        );

        const data =
        rows.map(item => ({

            ...item,

            photo_image:
            getImageUrl(
                "gallery-photos",
                item.photo_image
            )

        }));

        return res.status(200).json({

            success: true,

            message:
            "Gallery photos fetched successfully",

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

export const getGalleryPhotoById =
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

                gp.*,

                ga.album_title

            FROM gallery_photos gp

            LEFT JOIN gallery_albums ga
            ON gp.album_id = ga.album_id

            WHERE gp.photo_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Photo not found"

            });

        }

        const photo = {

            ...rows[0],

            photo_image:
            getImageUrl(
                "gallery-photos",
                rows[0].photo_image
            )

        };

        return res.status(200).json({

            success: true,

            data: photo

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const createGalleryPhoto =
async (
    req,
    res
) => {

    try {

        const {

            album_id,

            photo_title,

            photo_description,

            image_alt_tag,

            image_order,

            featured_photo,

            status

        } = req.body;

        if (
            !album_id
        ) {

            return res.status(400).json({

                success: false,

                message:
                "Album is required"

            });

        }

        if (
            !req.file
        ) {

            return res.status(400).json({

                success: false,

                message:
                "Photo image is required"

            });

        }

        const [result] =
        await db.query(
            `
            INSERT INTO gallery_photos
            (
                album_id,
                photo_title,
                photo_image,
                photo_description,
                image_alt_tag,
                image_order,
                featured_photo,
                status
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [

                album_id,

                photo_title,

                req.file.filename,

                photo_description,

                image_alt_tag,

                image_order || 0,

                featured_photo || "No",

                status || "active"

            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "Photo created successfully",

            photo_id:
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

export const updateGalleryPhoto =
async (
    req,
    res
) => {

    try {

        const {
            id
        } = req.params;

        const [existing] =
        await db.query(
            `
            SELECT *
            FROM gallery_photos
            WHERE photo_id = ?
            `,
            [id]
        );

        if (!existing.length) {

            return res.status(404).json({

                success: false,

                message:
                "Photo not found"

            });

        }

        let imageName =
        existing[0]
        .photo_image;

        if (req.file) {

            const oldImage =
            path.join(
                "uploads",
                "gallery-photos",
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

            album_id,

            photo_title,

            photo_description,

            image_alt_tag,

            image_order,

            featured_photo,

            status

        } = req.body;

        await db.query(
            `
            UPDATE gallery_photos
            SET

                album_id = ?,

                photo_title = ?,

                photo_image = ?,

                photo_description = ?,

                image_alt_tag = ?,

                image_order = ?,

                featured_photo = ?,

                status = ?

            WHERE photo_id = ?
            `,
            [

                album_id,

                photo_title,

                imageName,

                photo_description,

                image_alt_tag,

                image_order,

                featured_photo,

                status,

                id

            ]
        );

        return res.status(200).json({

            success: true,

            message:
            "Photo updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const deleteGalleryPhoto =
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
            FROM gallery_photos
            WHERE photo_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Photo not found"

            });

        }

        const imagePath =
        path.join(
            "uploads",
            "gallery-photos",
            rows[0].photo_image
        );

        if (
            rows[0].photo_image &&
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
            FROM gallery_photos
            WHERE photo_id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success: true,

            message:
            "Photo deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

