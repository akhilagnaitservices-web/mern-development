import crypto from "crypto";
import db from "../../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../../helpers/generateToken.js";
import sendMail from "../../helpers/mailer.js";

export const registerMembership =
async (req, res) => {

  try {

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
      pincode,
      password
    } = req.body;

    if (
      !full_name ||
      !father_husband_name ||
      !gothram ||
      !surname ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Full Name, Father/Husband Name, Gothram, Surname and Password are required"
      });

    }

    if (email) {

      const [exists] =
      await db.query(
        `
        SELECT id
        FROM membership_registrations
        WHERE email = ?
        `,
        [email]
      );

      if (exists.length) {

        return res.status(400).json({
          success: false,
          message: "Email already registered"
        });

      }

    }

    const hashedPassword =
    await bcrypt.hash(password, 10);

    const member_id = `MEM${Date.now()}`;

    const photo =
    req.file ? req.file.filename : null;

    const [result] =
    await db.query(
      `
      INSERT INTO membership_registrations
      (
        member_id,
        full_name,
        father_husband_name,
        gothram,
        surname,
        gender,
        date_of_birth,
        mobile_number,
        email,
        password,
        address,
        city,
        state,
        pincode,
        photo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        member_id,
        full_name,
        father_husband_name,
        gothram,
        surname,
        gender || null,
        date_of_birth || null,
        mobile_number || null,
        email || null,
        hashedPassword,
        address || null,
        city || null,
        state || null,
        pincode || null,
        photo
      ]
    );

    return res.status(201).json({
      success: true,
      message:
      "Registration submitted successfully. Awaiting approval.",
      id: result.insertId,
      member_id
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const loginMembership =
async (req, res) => {

  try {

    const {
      email,
      mobile_number,
      password
    } = req.body;

    if (
      (!email && !mobile_number) ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Email or Mobile Number and Password are required"
      });

    }

    const [rows] =
    await db.query(
      `
      SELECT *
      FROM membership_registrations
      WHERE email = ? OR mobile_number = ?
      LIMIT 1
      `,
      [email || null, mobile_number || null]
    );

    if (!rows.length) {

      return res.status(401).json({
        success: false,
        message:
        "Invalid credentials"
      });

    }

    const member = rows[0];

    const isMatch =
    await bcrypt.compare(
      password,
      member.password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message:
        "Invalid credentials"
      });

    }

    if (member.status !== "approved") {

      return res.status(403).json({
        success: false,
        message:
        member.status === "pending"
          ? "Your membership is pending approval"
          : "Your membership request was rejected"
      });

    }

    const token = generateToken({
      id: member.id,
      member_id: member.member_id,
      role: "member"
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: member.id,
        member_id: member.member_id,
        full_name: member.full_name,
        email: member.email,
        mobile_number: member.mobile_number,
        status: member.status
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const forgotMembershipPassword =
async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {

      return res.status(400).json({
        success: false,
        message: "Email is required"
      });

    }

    const [rows] =
    await db.query(
      `
      SELECT id, full_name
      FROM membership_registrations
      WHERE email = ?
      `,
      [email]
    );

    // Always return a generic success message,
    // regardless of whether the email exists — avoids leaking account existence.
    const genericResponse = {
      success: true,
      message:
      "If an account with that email exists, a password reset link has been sent."
    };

    if (!rows.length) {
      return res.status(200).json(genericResponse);
    }

    const member = rows[0];

    const resetToken =
    crypto.randomBytes(32).toString("hex");

    const resetTokenExpiry =
    new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.query(
      `
      UPDATE membership_registrations
      SET reset_token = ?, reset_token_expiry = ?
      WHERE id = ?
      `,
      [resetToken, resetTokenExpiry, member.id]
    );

    const resetLink =
    `${process.env.FRONTEND_URL}/membership/reset-password?token=${resetToken}`;

    await sendMail({
      to: email,
      subject: "VRKSS Membership - Password Reset",
      html: `
        <p>Hello ${member.full_name},</p>
        <p>We received a request to reset your Membership account password.</p>
        <p><a href="${resetLink}">Click here to reset your password</a></p>
        <p>This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
      `
    });

    return res.status(200).json(genericResponse);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const resetMembershipPassword =
async (req, res) => {

  try {

    const {
      token,
      new_password
    } = req.body;

    if (
      !token ||
      !new_password
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Reset token and New Password are required"
      });

    }

    const [rows] =
    await db.query(
      `
      SELECT id
      FROM membership_registrations
      WHERE reset_token = ? AND reset_token_expiry > NOW()
      `,
      [token]
    );

    if (!rows.length) {

      return res.status(400).json({
        success: false,
        message:
        "Invalid or expired reset link"
      });

    }

    const member = rows[0];

    const hashedPassword =
    await bcrypt.hash(new_password, 10);

    await db.query(
      `
      UPDATE membership_registrations
      SET
        password = ?,
        reset_token = NULL,
        reset_token_expiry = NULL,
        updated_by = ?
      WHERE id = ?
      `,
      [hashedPassword, `member:${member.id}`, member.id]
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const changeMembershipPassword =
async (req, res) => {

  try {

    const { id } = req.user;

    const {
      current_password,
      new_password
    } = req.body;

    if (
      !current_password ||
      !new_password
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Current Password and New Password are required"
      });

    }

    if (current_password === new_password) {

      return res.status(400).json({
        success: false,
        message:
        "New password must be different from the current password"
      });

    }

    const [rows] =
    await db.query(
      `
      SELECT password
      FROM membership_registrations
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

    const isMatch =
    await bcrypt.compare(
      current_password,
      rows[0].password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message:
        "Current password is incorrect"
      });

    }

    const hashedPassword =
    await bcrypt.hash(new_password, 10);

    await db.query(
      `
      UPDATE membership_registrations
      SET password = ?, updated_by = ?
      WHERE id = ?
      `,
      [hashedPassword, `member:${id}`, id]
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
