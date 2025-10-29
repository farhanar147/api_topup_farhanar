import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const register = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  try {
    if (!email || !first_name || !last_name || !password) {
      return res
        .status(400)
        .json({ status: 102, message: "Semua field wajib diisi", data: null });
    }

    if (!first_name) {
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        status: 102,
        message: "Parameter email tidak sesuai format",
        data: null,
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        status: 102,
        message:
          "Password minimal 8 karakter dan harus mengandung huruf besar, huruf kecil, serta angka",
        data: null,
      });
    }

    const [userExists] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (userExists.length)
      return res
        .status(400)
        .json({ status: 102, message: "Email sudah terdaftar", data: null });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)",
      [email, first_name, last_name, hashedPassword]
    );

    res.json({
      status: 0,
      message: "Registrasi berhasil silahkan login  ",
      data: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!isValidEmail(email)) {
      return res.status(400).json({
        status: 102,
        message: "Parameter email tidak sesuai format",
        data: null,
      });
    }

    // if (!users.length)
    //   return res
    //     .status(400)
    //     .json({ status: 103, message: "Email salah", data: null });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || !users.length)
      return res.status(400).json({
        status: 103,
        message: "Email atau Password salah",
        data: null,
      });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({ status: 0, message: "Login Sukses", data: { token: token } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
