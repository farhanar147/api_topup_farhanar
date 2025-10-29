import express from "express";
import {
  getSaldo,
  createTransaction,
  topup,
  getHistory,
} from "../controllers/transactionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Transaction
 *     description: Endpoint untuk dompet digital (saldo, topup, transaksi)
 */

/**
 * @swagger
 * /api/transaction/balance:
 *   get:
 *     summary: Menampilkan saldo pengguna
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data saldo berhasil ditampilkan
 */
router.get("/balance", authMiddleware, getSaldo);

/**
 * @swagger
 * /api/transaction/transaction:
 *   post:
 *     summary: Melakukan transaksi (mengurangi saldo)
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: PULSA
 *     responses:
 *       200:
 *         description: Transaksi berhasil
 *       400:
 *         description: Saldo tidak cukup
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post("/transaction", authMiddleware, createTransaction);

/**
 * @swagger
 * /api/transaction/topup:
 *   post:
 *     summary: Top-up saldo user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               top_up_amount:
 *                 type: number
 *                 example: 100000
 *     responses:
 *       200:
 *         description: Top-up berhasil
 *       400:
 *         description: Request tidak valid
 *       401:
 *         description: Token tidak valid
 */
router.post("/topup", authMiddleware, topup);

/**
 * @swagger
 * /api/transaction/history:
 *   get:
 *     summary: Mendapatkan history transaksi pengguna
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Daftar transaksi berhasil didapatkan
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
 *                   example: "Data history berhasil didapatkan"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       invoice_number:
 *                         type: string
 *                       service_id:
 *                         type: integer
 *                       transaction_type:
 *                         type: string
 *                       total_amount:
 *                         type: number
 *                       created_on:
 *                         type: string
 *                         format: date-time
 */
router.get("/history", authMiddleware, getHistory);

export default router;
