import crypto from "crypto";
import db from "../config/db.js";

export const getSaldo = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT  CAST(saldo AS SIGNED) AS saldo FROM wallets WHERE users_id = ?",
      [req.user.id]
    );
    if (!rows.length)
      return res.status(404).json({
        status: 102,
        message: "Data tidak ditemukan",
        data: null,
      });
    res.json({
      status: 0,
      message: "Sukses",
      data: {
        balance: rows[0].saldo,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const generateUniqueInvoice = async () => {
  let invoice;
  let isUnique = false;

  while (!isUnique) {
    invoice = crypto.randomBytes(5).toString("hex").toUpperCase();

    const [existing] = await db.query(
      "SELECT invoice_number FROM history WHERE invoice_number = ?",
      [invoice]
    );

    if (existing.length === 0) {
      isUnique = true;
    }
  }
  return invoice;
};

export const createTransaction = async (req, res) => {
  const { service_code } = req.body;
  try {
    const [service] = await db.query(
      "SELECT id, service_code, service_name,price FROM services WHERE service_code  = ? ",
      [service_code]
    );

    if (service.length === 0) {
      return res.status(404).json({
        status: 102,
        message: "Service atau Layanan tidak ditemukan",
        data: null,
      });
    }

    const [saldoRow] = await db.query(
      "SELECT saldo FROM wallets WHERE users_id = ?",
      [req.user.id]
    );
    const saldo = Number(saldoRow[0].saldo);
    const harga = Number(service[0].price);

    if (saldo < harga) {
      return res
        .status(400)
        .json({ status: 102, message: "Saldo tidak cukup", data: null });
    }

    const price = Number(service[0].price);
    await db.query("UPDATE wallets SET saldo = saldo - ? WHERE users_id = ?", [
      price,
      req.user.id,
    ]);

    const invoiceNumber = await generateUniqueInvoice();

    await db.query(
      "INSERT INTO payments (users_id, payments_amount, invoice_number) VALUES (?, ?, ?)",
      [req.user.id, service[0].price, invoiceNumber]
    );

    await db.query(
      `INSERT INTO history (service_id, transaction_type, total_amount, invoice_number, users_id)
       VALUES (?, ?, ?, ?, ?)`,
      [service[0].id, "PAYMENT", service[0].price, invoiceNumber, req.user.id]
    );

    res.json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: invoiceNumber,
        service_code: service[0].service_code,
        service_name: service[0].service_name,
        transaction_type: "PAYMENT",
        total_amount: service[0].price,
        created_on: new Date().toISOString(),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const topup = async (req, res) => {
  const { top_up_amount } = req.body;

  try {
    if (
      !top_up_amount ||
      typeof top_up_amount !== "number" ||
      isNaN(top_up_amount) ||
      top_up_amount <= 0
    ) {
      return res.status(400).json({
        status: 102,
        message:
          "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        data: null,
      });
    }

    const invoiceNumber = await generateUniqueInvoice();

    await db.query(
      "INSERT INTO topups (users_id, topup_amount, invoice_number) VALUES (?, ?, ?)",
      [req.user.id, top_up_amount, invoiceNumber]
    );

    const [walletRows] = await db.query(
      "SELECT * FROM wallets WHERE users_id = ?",
      [req.user.id]
    );

    if (walletRows.length === 0) {
      await db.query("INSERT INTO wallets (users_id, saldo) VALUES (?, ?)", [
        req.user.id,
        top_up_amount,
      ]);
    } else {
      await db.query(
        "UPDATE wallets SET saldo = saldo + ? WHERE users_id = ?",
        [top_up_amount, req.user.id]
      );
    }

    await db.query(
      `INSERT INTO history (service_id, transaction_type, total_amount, invoice_number, users_id)
       VALUES (?, ?, ?, ?, ?)`,
      [1, "TOPUP", top_up_amount, invoiceNumber, req.user.id]
    );

    res.json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: {
        balance: top_up_amount,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getHistory = async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const [rows] = await db.query(
      `SELECT 
            hs.invoice_number, 
            hs.transaction_type, 
            s.service_name AS description,
            CAST(hs.total_amount AS SIGNED) AS total_amount,
            hs.created_on
        FROM history hs
        JOIN services s ON hs.service_id = s.id
        WHERE hs.users_id = ?
        ORDER BY hs.created_on DESC
        LIMIT ?, ?;
        `,
      [req.user.id, offset, limit]
    );

    res.json({
      status: 0,
      message: "Data history berhasil didapatkan",
      records: rows,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
      data: null,
    });
  }
};
