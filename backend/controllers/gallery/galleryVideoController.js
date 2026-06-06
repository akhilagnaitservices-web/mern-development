import db from "../../config/db.js";
import fs from "fs";
import path from "path";
import { getImageUrl } from "../../helpers/fileHelper.js";

export const getGalleryVideos =
async (
    req,
    res
) => {

    try {

        const [rows] =
        await db.query(
            `
            SELECT

                gv.*,

                ga.album_title

            FROM gallery_videos gv

            LEFT JOIN gallery_albums ga
            ON gv.album_id = ga.album_id

            ORDER BY
            gv.display_order ASC,
            gv.video_id DESC
            `
        );

        const data =
        rows.map(item => ({

            ...item,

            thumbnail_image:
            getImageUrl(
                "gallery-videos",
                item.thumbnail_image
            )

        }));

        return res.status(200).json({

            success: true,

            message:
            "Gallery videos fetched successfully",

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

export const getGalleryVideoById =
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

                gv.*,

                ga.album_title

            FROM gallery_videos gv

            LEFT JOIN gallery_albums ga
            ON gv.album_id = ga.album_id

            WHERE gv.video_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success: false,

                message:
                "Video not found"

            });

        }

        const video = {

            ...rows[0],

            thumbnail_image:
            getImageUrl(
                "gallery-videos",
                rows[0].thumbnail_image
            )

        };

        return res.status(200).json({

            success: true,

            data: video

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const createGalleryVideo =
async (
    req,
    res
) => {

    try {

        const {

            album_id,

            video_title,

            video_url,

            video_description,

            display_order,

            status

        } = req.body;

        const [result] =
        await db.query(
            `
            INSERT INTO gallery_videos
            (
                album_id,
                video_title,
                video_url,
                thumbnail_image,
                video_description,
                display_order,
                status
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?)
            `,
            [

                album_id,

                video_title,

                video_url,

                req.file
                ? req.file.filename
                : null,

                video_description,

                display_order || 0,

                status || "active"

            ]
        );

        return res.status(201).json({

            success: true,

            message:
            "Video created successfully",

            video_id:
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

export const updateGalleryVideo =
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
            FROM gallery_videos
            WHERE video_id = ?
            `,
            [id]
        );

        let imageName =
        existing[0]
        .thumbnail_image;

        if (req.file) {

            const oldImage =
            path.join(
                "uploads",
                "gallery-videos",
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

            video_title,

            video_url,

            video_description,

            display_order,

            status

        } = req.body;

        await db.query(
            `
            UPDATE gallery_videos
            SET

                album_id = ?,

                video_title = ?,

                video_url = ?,

                thumbnail_image = ?,

                video_description = ?,

                display_order = ?,

                status = ?

            WHERE video_id = ?
            `,
            [

                album_id,

                video_title,

                video_url,

                imageName,

                video_description,

                display_order,

                status,

                id

            ]
        );

        return res.status(200).json({

            success: true,

            message:
            "Video updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

export const deleteGalleryVideo =
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
            FROM gallery_videos
            WHERE video_id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success: true,

            message:
            "Video deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
            error.message

        });

    }

};

