import db from "../../config/db.js";
import { getImageUrl } from "../../helpers/fileHelper.js";

const MEMBER_FIELDS = `
    id,
    member_id,
    full_name,
    father_husband_name,
    gothram,
    surname,
    gender,
    date_of_birth,
    mobile_number,
    email,
    address,
    city,
    state,
    pincode,
    photo,
    status,
    created_at,
    updated_at
`;

export const getMembers =
async (req, res) => {

  try {

    const [rows] =
    await db.query(
      `
      SELECT ${MEMBER_FIELDS}
      FROM membership_registrations
      ORDER BY created_at DESC
      `
    );

    const data = rows.map((row) => ({
      ...row,
      photo: getImageUrl("membership", row.photo)
    }));

    return res.status(200).json({
      success: true,
      message: "Members fetched successfully",
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const updateMemberStatus =
async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {

      return res.status(400).json({
        success: false,
        message:
        "Status must be one of pending, approved, rejected"
      });

    }

    const [result] =
    await db.query(
      `
      UPDATE membership_registrations
      SET status = ?, updated_by = ?
      WHERE id = ?
      `,
      [status, `admin:${req.user.id}`, id]
    );

    if (!result.affectedRows) {

      return res.status(404).json({
        success: false,
        message: "Member not found"
      });

    }

    return res.status(200).json({
      success: true,
      message: "Member status updated successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const updateMember =
async (req, res) => {

  try {

    const { id } = req.params;

    const {
      full_name,
      father_husband_name,
      gothram,
      surname,
      gender,
      date_of_birth,
      mobile_number,
      email,
      address,
      city,
      state,
      pincode
    } = req.body;

    if (
      !full_name ||
      !father_husband_name ||
      !gothram ||
      !surname
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Full Name, Father/Husband Name, Gothram and Surname are required"
      });

    }

    const [result] =
    await db.query(
      `
      UPDATE membership_registrations
      SET
        full_name = ?,
        father_husband_name = ?,
        gothram = ?,
        surname = ?,
        gender = ?,
        date_of_birth = ?,
        mobile_number = ?,
        email = ?,
        address = ?,
        city = ?,
        state = ?,
        pincode = ?,
        updated_by = ?
      WHERE id = ?
      `,
      [
        full_name,
        father_husband_name,
        gothram,
        surname,
        gender || null,
        date_of_birth || null,
        mobile_number || null,
        email || null,
        address || null,
        city || null,
        state || null,
        pincode || null,
        `admin:${req.user.id}`,
        id
      ]
    );

    if (!result.affectedRows) {

      return res.status(404).json({
        success: false,
        message: "Member not found"
      });

    }

    return res.status(200).json({
      success: true,
      message: "Member updated successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const deleteMember =
async (req, res) => {

  try {

    const { id } = req.params;

    const [result] =
    await db.query(
      `
      DELETE FROM membership_registrations
      WHERE id = ?
      `,
      [id]
    );

    if (!result.affectedRows) {

      return res.status(404).json({
        success: false,
        message: "Member not found"
      });

    }

    return res.status(200).json({
      success: true,
      message: "Member deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
