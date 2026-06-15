import db from "../../config/db.js";
import fs from "fs";
import path from "path";

import { getImageUrl } from "../../helpers/fileHelper.js";

export const getLeadershipMembers =
async (req, res) => {

  try {

    const [rows] =
    await db.query(`
      SELECT *
      FROM leadership_members
      ORDER BY display_order ASC, id DESC
    `);

    const data =
    rows.map(member => ({

      ...member,

      profile_image:
      getImageUrl(
        "leadership-members",
        member.profile_image
      )

    }));

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const getLeadershipMemberById =
async (req, res) => {

  try {

    const { id } =
    req.params;

    const [rows] =
    await db.query(
      `
      SELECT *
      FROM leadership_members
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message:
        "Member not found"
      });

    }

    const member = {

      ...rows[0],

      profile_image:
      getImageUrl(
        "leadership-members",
        rows[0].profile_image
      )

    };

    return res.status(200).json({
      success: true,
      data: member
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const createLeadershipMember =
async (req, res) => {

  try {

    const {
      
      full_name,
      designation,
      mobile_number,
      email,
      display_order,
      status
    } = req.body;
   const member_id =`LM${Date.now()}`;
    if (
    
      !full_name ||
      !designation
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Member ID, Name and Designation are required"
      });

    }

    const [exists] =
    await db.query(
      `
      SELECT id
      FROM leadership_members
      WHERE member_id = ?
      `,
      [member_id]
    );

    if (exists.length) {

      return res.status(400).json({
        success: false,
        message:
        "Member ID already exists"
      });

    }

    const [result] =
    await db.query(
      `
      INSERT INTO leadership_members
      (
        member_id,
        full_name,
        designation,
        profile_image,
        mobile_number,
        email,
        display_order,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        member_id,
        full_name,
        designation,
        req.file
        ? req.file.filename
        : null,
        mobile_number,
        email,
        display_order || 0,
        status || "active"
      ]
    );

    return res.status(201).json({
      success: true,
      message:
      "Member created successfully",
      id: result.insertId
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// export const updateLeadershipMember =
// async (req, res) => {

//   try {

//     const { id } =
//     req.params;

//     const [rows] =
//     await db.query(
//       `
//       SELECT *
//       FROM leadership_members
//       WHERE id = ?
//       `,
//       [id]
//     );

//     if (!rows.length) {

//       return res.status(404).json({
//         success: false,
//         message:
//         "Member not found"
//       });

//     }

//     const member =
//     rows[0];

//     let imageName =
//     member.profile_image;

//     if (req.file) {

//       const oldImage =
//       path.join(
//         "uploads",
//         "leadership-members",
//         imageName
//       );

//       if (
//         fs.existsSync(oldImage)
//       ) {

//         fs.unlinkSync(
//           oldImage
//         );

//       }

//       imageName =
//       req.file.filename;

//     }

//     const {
    
//       full_name,
//       designation,
//       mobile_number,
//       email,
//       display_order,
//       status
//     } = req.body;

//     await db.query(
//       `
//       UPDATE leadership_members
//       SET
        
//         full_name = ?,
//         designation = ?,
//         profile_image = ?,
//         mobile_number = ?,
//         email = ?,
//         display_order = ?,
//         status = ?
//       WHERE id = ?
//       `,
//       [
        
//         full_name,
//         designation,
//         imageName,
//         mobile_number,
//         email,
//         display_order,
//         status,
//         id
//       ]
//     );

//     return res.status(200).json({
//       success: true,
//       message:
//       "Member updated successfully"
//     });

//   } catch (error) {

//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// };
export const updateLeadershipMember =
async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await db.query(
            `
            SELECT *
            FROM leadership_members
            WHERE id = ?
            `,
            [id]
        );

        if (!rows.length) {

            return res.status(404).json({
                success: false,
                message: "Member not found"
            });

        }

        const member = rows[0];

        let imageName = member.profile_image || null;

        // Handle new image upload
        if (req.file) {

            // Delete old image only if it exists
            if (imageName && typeof imageName === "string") {

                const oldImagePath = path.join(
                    "uploads",
                    "leadership-members",
                    imageName
                );

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }

            }

            imageName = req.file.filename;

        }

        const {

            full_name,
            designation,
            mobile_number,
            email,
            display_order,
            status

        } = req.body;

        await db.query(
            `
            UPDATE leadership_members
            SET
                full_name = ?,
                designation = ?,
                profile_image = ?,
                mobile_number = ?,
                email = ?,
                display_order = ?,
                status = ?
            WHERE id = ?
            `,
            [
                full_name,
                designation,
                imageName,
                mobile_number,
                email,
                display_order || 0,
                status || "Active",
                id
            ]
        );

        return res.status(200).json({

            success: true,
            message: "Member updated successfully"

        });

    } catch (error) {

        console.error("Update Leadership Member Error:", error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

export const deleteLeadershipMember =
async (req, res) => {

  try {

    const { id } =
    req.params;

    const [rows] =
    await db.query(
      `
      SELECT *
      FROM leadership_members
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message:
        "Member not found"
      });

    }

    const imagePath =
    path.join(
      "uploads",
      "leadership-members",
      rows[0].profile_image
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

    await db.query(
      `
      DELETE
      FROM leadership_members
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message:
      "Member deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};