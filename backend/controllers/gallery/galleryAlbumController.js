import db from "../../config/db.js";
import fs from "fs";
import path from "path";
import createSlug from "../../helpers/slugify.js";
import { getImageUrl } from "../../helpers/fileHelper.js";

export const getGalleryAlbums =
async (
    req,
    res
) => {

    try {

        const {
            category_id
        } = req.query;

        let query = `
            SELECT

                ga.*,

                gc.category_name

            FROM gallery_albums ga

            LEFT JOIN gallery_categories gc
            ON ga.category_id = gc.category_id

            WHERE 1 = 1
        `;

        const params = [];

        if (category_id) {

            query += `
                AND ga.category_id = ?
            `;

            params.push(
                category_id
            );

        }

        query += `
            ORDER BY
            ga.display_order ASC,
            ga.album_id DESC
        `;

        const [rows] =
        await db.query(
            query,
            params
        );

const data =
rows.map(item => ({

    ...item,

    event_date:
    item.event_date
    ? new Date(item.event_date)
        .toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        )
    : null,

    album_cover_image:
    getImageUrl(
        "gallery-albums",
        item.album_cover_image
    )

}));

        return res.status(200).json({

            success: true,

            message:
            "Gallery albums fetched successfully",

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

export const getGalleryAlbumById =
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
            FROM gallery_albums
            WHERE album_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Album not found"

            });

        }

  const album = {

    ...rows[0],

    event_date:
    rows[0].event_date
    ? new Date(rows[0].event_date)
        .toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        )
    : null,

    album_cover_image:
    getImageUrl(
        "gallery-albums",
        rows[0].album_cover_image
    )

};

        return res.status(200).json({

            success: true,

            data: album

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const createGalleryAlbum =
async (
    req,
    res
) => {

    try {

        const {

            category_id,

            album_title,

            album_description,

            event_date,

            location,

            display_order,

            status

        } = req.body;

        const album_slug =
        createSlug(
            album_title
        );

        const [result] =
        await db.query(
            `
            INSERT INTO gallery_albums
            (
                category_id,
                album_title,
                album_slug,
                album_cover_image,
                album_description,
                event_date,
                location,
                display_order,
                status
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [

                category_id,

                album_title,

                album_slug,

                req.file
                ? req.file.filename
                : null,

                album_description,

                event_date,

                location,

                display_order || 0,

                status || "active"

            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "Gallery album created successfully",

            album_id:
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

export const updateGalleryAlbum =
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
            FROM gallery_albums
            WHERE album_id = ?
            `,
            [id]
        );

        if (!existing.length) {

            return res.status(404).json({

                success: false,

                message:
                "Album not found"

            });

        }

        let imageName =
        existing[0]
        .album_cover_image;

        if (req.file) {

            const oldImage =
            path.join(
                "uploads",
                "gallery-albums",
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

            category_id,

            album_title,

            album_description,

            event_date,

            location,

            display_order,

            status

        } = req.body;

        await db.query(
            `
            UPDATE gallery_albums
            SET
                category_id = ?,
                album_title = ?,
                album_slug = ?,
                album_cover_image = ?,
                album_description = ?,
                event_date = ?,
                location = ?,
                display_order = ?,
                status = ?
            WHERE album_id = ?
            `,
            [

                category_id,

                album_title,

                createSlug(album_title),

                imageName,

                album_description,

                event_date,

                location,

                display_order,

                status,

                id

            ]
        );

        return res.status(200).json({

            success: true,

            message:
            "Gallery album updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const deleteGalleryAlbum =
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
            FROM gallery_albums
            WHERE album_id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success: true,

            message:
            "Gallery album deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};