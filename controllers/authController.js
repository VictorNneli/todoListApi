const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbPath = path.join(__dirname, '../database.json');
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const db = readDB();
    const user = db.users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // 🔐 Access Token (short-lived)
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // 🔁 Refresh Token (long-lived)
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // 💾 Save refresh token in DB
    user.refreshToken = refreshToken;
    writeDB(db);

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken
    });

  } catch (error) {
    next(error);
  }
};
exports.refreshToken = (req, res) => {
  try {
    const { refreshToken } = req.body;

    const db = readDB();

    const user = db.users.find(u => u.refreshToken === refreshToken);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken
    });

  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Expired or invalid refresh token'
    });
  }
};