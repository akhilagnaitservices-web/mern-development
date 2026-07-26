import db from "../../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../../helpers/generateToken.js";

export const getMyProfile =
async (req, res) => {

  try {

    const { id } = req.user;

    const [rows] =
    await db.query(
      `
      SELECT
        id,
        user_id,
        full_name,
        username,
        email,
        phone_number,
        role,
        status,
        created_at,
        updated_at,
        last_login
      FROM user_signup
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: rows[0]
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const updateMyProfile =
async (req, res) => {

  try {

    const { id } = req.user;

    const {
      full_name,
      username,
      email,
      phone_number
    } = req.body;

    if (
      !full_name ||
      !username ||
      !email
    ) {

      return res.status(400).json({
        success: false,
        message:
        "Full Name, Username and Email are required"
      });

    }

    const [existing] =
    await db.query(
      `
      SELECT id
      FROM user_signup
      WHERE id = ?
      `,
      [id]
    );

    if (!existing.length) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }

    const [emailDup] =
    await db.query(
      `
      SELECT id
      FROM user_signup
      WHERE email = ? AND id != ?
      `,
      [email, id]
    );

    if (emailDup.length) {

      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });

    }

    const [usernameDup] =
    await db.query(
      `
      SELECT id
      FROM user_signup
      WHERE username = ? AND id != ?
      `,
      [username, id]
    );

    if (usernameDup.length) {

      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });

    }

    await db.query(
      `
      UPDATE user_signup
      SET
        full_name = ?,
        username = ?,
        email = ?,
        phone_number = ?
      WHERE id = ?
      `,
      [
        full_name,
        username,
        email,
        phone_number || null,
        id
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const changePassword =
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
        message: "User not found"
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

export const registerUser =
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

    const user_id = `USR${Date.now()}`;

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
        "user"
      ]
    );

    return res.status(201).json({
      success: true,
      message:
      "User registered successfully",
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

export const loginUser =
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

    const user = rows[0];

    if (user.status !== "active") {

      return res.status(403).json({
        success: false,
        message:
        "Account is not active"
      });

    }

    const isMatch =
    await bcrypt.compare(
      password,
      user.password
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
      [user.id]
    );

    const token = generateToken({
      id: user.id,
      user_id: user.user_id,
      role: user.role
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user.id,
        user_id: user.user_id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
