import db from "../../config/db.js";

import fs from "fs";
import path from "path";

import {
    getImageUrl
}
from "../../helpers/fileHelper.js";

import createSlug
from "../../helpers/slugify.js";



export const getNews =
async (req,res) => {

    try {

        const {

            status,
            category_id,
            search

        } = req.query;

        let query = `

            SELECT

                n.*,

                c.category_name

            FROM news_master n

            LEFT JOIN news_categories c

            ON n.category_id =
            c.category_id

            WHERE 1 = 1

        `;

        const params = [];

        if (status) {

            query += `
            AND n.status = ?
            `;

            params.push(status);

        }

        if (category_id) {

            query += `
            AND n.category_id = ?
            `;

            params.push(category_id);

        }

        if (search) {

            query += `
            AND n.news_title
            LIKE ?
            `;

            params.push(
                `%${search}%`
            );

        }

        query += `
        ORDER BY

            n.news_date DESC,

            n.display_order ASC
        `;

        const [rows] =
        await db.query(
            query,
            params
        );

        const data =
        rows.map(news => ({

            ...news,

            featured_image:
            getImageUrl(
                "news",
                news.featured_image
            )

        }));

        return res.status(200).json({

            success: true,

            message:
            "News fetched successfully",

            data

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const getNewsById =
async (req,res) => {

    try {

        const { id } =
        req.params;

        const [rows] =
        await db.query(
            `

            SELECT

                n.*,

                c.category_name

            FROM news_master n

            LEFT JOIN news_categories c

            ON n.category_id =
            c.category_id

            WHERE n.news_id = ?

            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success:false,

                message:
                "News not found"

            });

        }

        const news = {

            ...rows[0],

            featured_image:
            getImageUrl(
                "news",
                rows[0].featured_image
            )

        };

        return res.status(200).json({

            success:true,

            data:news

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const createNews =
async (req,res) => {

    try {

        const {

            category_id,

            news_title,

            short_description,

            news_content,

            author_name,

            news_date,

            popular_news,

            display_order,

            status

        } = req.body;

        const news_slug =
        createSlug(
            news_title
        );

        const [result] =
        await db.query(
            `
            INSERT INTO news_master
            (

                category_id,

                news_title,
                news_slug,

                featured_image,

                short_description,
                news_content,

                author_name,

                news_date,

                popular_news,

                display_order,

                status

            )

            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [

                category_id,

                news_title,
                news_slug,

                req.file
                ?
                req.file.filename
                :
                null,

                short_description,

                news_content,

                author_name,

                news_date,

                popular_news,

                display_order || 0,

                status ||
                "Published"

            ]
        );

        return res.status(201).json({

            success:true,

            message:
            "News created successfully",

            news_id:
            result.insertId

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const updateNews =
async (req,res) => {

    try {

        const { id } =
        req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM news_master
            WHERE news_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success:false,

                message:
                "News not found"

            });

        }

        const existingNews =
        rows[0];

        let imageName =
        existingNews.featured_image;

        if (req.file) {

            if (imageName) {

                const oldImagePath =
                path.join(
                    "uploads",
                    "news",
                    imageName
                );

                if (
                    fs.existsSync(
                        oldImagePath
                    )
                ) {

                    fs.unlinkSync(
                        oldImagePath
                    );

                }

            }

            imageName =
            req.file.filename;

        }

        const {

            category_id,

            news_title,

            short_description,

            news_content,

            author_name,

            news_date,

            popular_news,

            display_order,

            status

        } = req.body;

        const news_slug =
        createSlug(
            news_title
        );

        await db.query(
            `
            UPDATE news_master
            SET

                category_id = ?,

                news_title = ?,
                news_slug = ?,

                featured_image = ?,

                short_description = ?,

                news_content = ?,

                author_name = ?,

                news_date = ?,

                popular_news = ?,

                display_order = ?,

                status = ?

            WHERE news_id = ?
            `,
            [

                category_id,

                news_title,
                news_slug,

                imageName,

                short_description,

                news_content,

                author_name,

                news_date,

                popular_news,

                display_order,

                status,

                id

            ]
        );

        return res.status(200).json({

            success:true,

            message:
            "News updated successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const deleteNews =
async (req,res) => {

    try {

        const { id } =
        req.params;

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM news_master
            WHERE news_id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({

                success:false,

                message:
                "News not found"

            });

        }

        const news =
        rows[0];

        if (
            news.featured_image
        ) {

            const imagePath =
            path.join(
                "uploads",
                "news",
                news.featured_image
            );

            if (
                fs.existsSync(
                    imagePath
                )
            ) {

                fs.unlinkSync(
                    imagePath
                );

            }

        }

        await db.query(
            `
            DELETE
            FROM news_master
            WHERE news_id = ?
            `,
            [id]
        );

        return res.status(200).json({

            success:true,

            message:
            "News deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const getPopularNews =
async (req,res) => {

    try {

        const [rows] =
        await db.query(
            `
            SELECT *
            FROM news_master

            WHERE

                popular_news = 'Yes'

            AND

                status = 'Published'

            ORDER BY
                news_date DESC
            `
        );

        return res.status(200).json({

            success:true,

            data:rows

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};