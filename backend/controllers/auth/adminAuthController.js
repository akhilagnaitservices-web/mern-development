import db from "../../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../../helpers/generateToken.js";

export const registerAdmin =
async (req, res) => {

  try {

    const {
      full_name,
      username,
      email,
      phone_number,
      password
    } = req.body;

    if (
      !full_name ||
      !username ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Full Name, Username, Email and Password are required"
      });

    }

    const [exists] =
    await db.query(
      `
      SELECT id
      FROM user_signup
      WHERE email = ? OR username = ?
      `,
      [email, username]
    );

    if (exists.length) {

      return res.status(400).json({
        success: false,
        message:
        "Email or Username already exists"
      });

    }

    const hashedPassword =
    await bcrypt.hash(password, 10);

    const user_id = `ADM${Date.now()}`;

    const [result] =
    await db.query(
      `
      INSERT INTO user_signup
      (
        user_id,
        full_name,
        username,
        email,
        phone_number,
        password,
        role
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        full_name,
        username,
        email,
        phone_number || null,
        hashedPassword,
        "admin"
      ]
    );

    return res.status(201).json({
      success: true,
      message:
      "Admin registered successfully",
      id: result.insertId,
      user_id
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const changeAdminPassword =
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
      FROM user_signup
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message: "Admin not found"
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
      UPDATE user_signup
      SET password = ?
      WHERE id = ?
      `,
      [hashedPassword, id]
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

export const loginAdmin =
async (req, res) => {

  try {

    const {
      email,
      username,
      password
    } = req.body;

    if (
      (!email && !username) ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Email or Username and Password are required"
      });

    }

    const [rows] =
    await db.query(
      `
      SELECT *
      FROM user_signup
      WHERE email = ? OR username = ?
      LIMIT 1
      `,
      [email || null, username || null]
    );

    if (!rows.length) {

      return res.status(401).json({
        success: false,
        message:
        "Invalid credentials"
      });

    }

    const admin = rows[0];

    if (
      !["admin", "super_admin"].includes(admin.role)
    ) {

      return res.status(403).json({
        success: false,
        message: "Access denied"
      });

    }

    if (admin.status !== "active") {

      return res.status(403).json({
        success: false,
        message:
        "Account is not active"
      });

    }

    const isMatch =
    await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message:
        "Invalid credentials"
      });

    }

    await db.query(
      `
      UPDATE user_signup
      SET last_login = NOW()
      WHERE id = ?
      `,
      [admin.id]
    );

    const token = generateToken({
      id: admin.id,
      user_id: admin.user_id,
      role: admin.role
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: admin.id,
        user_id: admin.user_id,
        full_name: admin.full_name,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
