const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../config/db');
require('dotenv').config();

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateUserId() {
  return 'USR' + Date.now() + Math.floor(Math.random() * 1000);
}

function getMailTransporter() {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: process.env.MAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

// ─── Sign In ─────────────────────────────────────────────────────────────────

// POST /auth/signin
exports.signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  try {
    // Look up by username OR email
    const [rows] = await db.execute(
      'SELECT * FROM user_signup WHERE (username = ? OR email = ?) LIMIT 1',
      [username, username]
    );

    if (rows.length === 0) {
      await logSignin(null, username, req, 'failed');
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    const user = rows[0];

    // Check account status
    if (user.status === 'inactive') {
      return res.status(403).json({ success: false, message: 'Your account is inactive. Contact support.' });
    }
    if (user.status === 'blocked') {
      return res.status(403).json({ success: false, message: 'Your account has been blocked. Contact support.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await logSignin(user.user_id, user.username, req, 'failed');
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    // Update last_login
    await db.execute(
      'UPDATE user_signup SET last_login = NOW() WHERE user_id = ?',
      [user.user_id]
    );

    // Log successful signin
    await logSignin(user.user_id, user.username, req, 'success');

    // Set session
    req.session.user = {
      user_id: user.user_id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      profile_image: user.profile_image,
    };

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: req.session.user,
      redirect: getDashboardByRole(user.role),
    });

  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// ─── Log Signin Helper ────────────────────────────────────────────────────────

async function logSignin(user_id, username, req, status) {
  if (!user_id) return;
  try {
    await db.execute(
      'INSERT INTO user_signin (user_id, username, login_time, user_agent, login_status) VALUES (?, ?, NOW(), ?, ?)',
      [user_id, username, req.headers['user-agent'] || '', status]
    );
  } catch (e) {
    console.error('Log signin error:', e);
  }
}

function getDashboardByRole(role) {
  const map = {
    super_admin: '/index.html',
    admin: '/index.html',
    manager: '/index.html',
    user: '/index.html',
  };
  return map[role] || '/index.html';
}

// ─── Logout ──────────────────────────────────────────────────────────────────

// POST /auth/logout
exports.logout = async (req, res) => {
  const user = req.session.user;

  if (user) {
    try {
      await db.execute(
        'INSERT INTO user_logout (user_id, user_agent) VALUES (?, ?)',
        [user.user_id, req.headers['user-agent'] || '']
      );
    } catch (err) {
      console.error('Logout log error:', err);
    }
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed.' });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ success: true, message: 'Logged out successfully.', redirect: '/auth-login.html' });
  });
};

// ─── Forgot Password ─────────────────────────────────────────────────────────

// POST /auth/forgot-password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM user_signup WHERE email = ? AND status = "active" LIMIT 1',
      [email]
    );

    // Always return same message to prevent email enumeration
    if (rows.length === 0) {
      return res.status(200).json({ success: true, message: 'If this email is registered, a reset link has been sent.' });
    }

    const user = rows[0];

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Expire any previous pending tokens for this user
    await db.execute(
      'UPDATE user_fp SET reset_status = "expired" WHERE user_id = ? AND reset_status = "pending"',
      [user.user_id]
    );

    // Insert new reset record
    await db.execute(
      'INSERT INTO user_fp (user_id, email, reset_token, token_expiry, reset_status) VALUES (?, ?, ?, ?, "pending")',
      [user.user_id, email, resetToken, tokenExpiry]
    );

    // Send reset email
    const resetLink = `${process.env.APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;

    const transporter = getMailTransporter();
    await transporter.sendMail({
      from: `"Matrimony Admin" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset Request</h2>
        <p>Hello ${user.full_name},</p>
        <p>Click the link below to reset your password. This link expires in 1 hour.</p>
        <a href="${resetLink}" style="background:#4f46e5;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;display:inline-block;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <br/>
        <small>Link: ${resetLink}</small>
      `,
    });

    return res.status(200).json({ success: true, message: 'If this email is registered, a reset link has been sent.' });

  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// ─── Validate Reset Token ─────────────────────────────────────────────────────

// GET /auth/reset-password?token=xxx  (called when user clicks email link)
exports.validateResetToken = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.redirect('/auth-login.html?error=invalid_token');
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM user_fp WHERE reset_token = ? AND reset_status = "pending" AND token_expiry > NOW() LIMIT 1',
      [token]
    );

    if (rows.length === 0) {
      return res.redirect('/auth-reset-password.html?error=expired');
    }

    // Redirect to reset password page with token
    return res.redirect(`/auth-reset-password.html?token=${token}`);

  } catch (err) {
    console.error('Validate token error:', err);
    return res.redirect('/auth-login.html?error=server_error');
  }
};

// ─── Reset Password ───────────────────────────────────────────────────────────

// POST /auth/reset-password
exports.resetPassword = async (req, res) => {
  const { token, new_password, confirm_password } = req.body;

  if (!token || !new_password || !confirm_password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  if (new_password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM user_fp WHERE reset_token = ? AND reset_status = "pending" AND token_expiry > NOW() LIMIT 1',
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Reset link is invalid or has expired.' });
    }

    const resetRecord = rows[0];

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 12);

    // Update password in user_signup
    await db.execute(
      'UPDATE user_signup SET password = ?, updated_by = ? WHERE user_id = ?',
      [hashedPassword, resetRecord.user_id, resetRecord.user_id]
    );

    // Log in user_cp (change password table)
    await db.execute(
      'INSERT INTO user_cp (user_id, username, new_password, confirm_password) VALUES (?, ?, ?, ?)',
      [resetRecord.user_id, resetRecord.email, hashedPassword, hashedPassword]
    );

    // Mark reset token as completed
    await db.execute(
      'UPDATE user_fp SET reset_status = "completed" WHERE reset_token = ?',
      [token]
    );

    return res.status(200).json({ success: true, message: 'Password reset successfully. You can now log in.', redirect: '/auth-login.html' });

  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// ─── Check Session (for frontend auth guard) ─────────────────────────────────

// GET /auth/session
exports.checkSession = (req, res) => {
  if (req.session && req.session.user) {
    return res.status(200).json({ success: true, user: req.session.user });
  }
  return res.status(401).json({ success: false, message: 'Not authenticated.' });
};

// ─── Register ─────────────────────────────────────────────────────────────────

// POST /auth/register
exports.register = async (req, res) => {
  const { full_name, username, email, phone_number, password, confirm_password } = req.body;

  // Validation
  if (!full_name || !username || !email || !password || !confirm_password) {
    return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
  }

  // Username: alphanumeric + underscore only
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(400).json({ success: false, message: 'Username can only contain letters, numbers, and underscores.' });
  }

  try {
    // Check if username already exists
    const [existingUsername] = await db.execute(
      'SELECT user_id FROM user_signup WHERE username = ? LIMIT 1',
      [username]
    );
    if (existingUsername.length > 0) {
      return res.status(409).json({ success: false, message: 'Username is already taken.' });
    }

    // Check if email already exists
    const [existingEmail] = await db.execute(
      'SELECT user_id FROM user_signup WHERE email = ? LIMIT 1',
      [email]
    );
    if (existingEmail.length > 0) {
      return res.status(409).json({ success: false, message: 'Email is already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate user ID
    const user_id = generateUserId();

    // Insert new user
    await db.execute(
      `INSERT INTO user_signup 
        (user_id, full_name, username, email, phone_number, password, role, status, email_verified) 
       VALUES (?, ?, ?, ?, ?, ?, 'user', 'active', 'no')`,
      [user_id, full_name, username, email, phone_number || null, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful! You can now log in.',
      redirect: '/auth-login.html'
    });

  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};
