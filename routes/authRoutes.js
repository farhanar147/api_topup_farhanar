import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API untuk autentikasi user
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     description: Endpoint ini digunakan untuk mendaftar user baru. Semua field wajib diisi, password minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - first_name
 *               - last_name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: farhan@example.com
 *               first_name:
 *                 type: string
 *                 example: Farhan
 *               last_name:
 *                 type: string
 *                 example: Ar Rasyid
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Registrasi berhasil"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Input tidak valid / Email sudah terdaftar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: "Parameter email tidak sesuai format"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Endpoint ini digunakan untuk login dan mendapatkan JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: farhan@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Login berhasil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: "Email atau password salah"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */

router.post("/register", register);
router.post("/login", login);

export default router;
