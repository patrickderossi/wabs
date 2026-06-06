import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email and message are required." });
    return;
  }

  const host = process.env["SMTP_HOST"];
  const port = Number(process.env["SMTP_PORT"] ?? "465");
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  const to   = process.env["CONTACT_EMAIL"] ?? "patrick@wabd.com.au";

  if (!host || !user || !pass) {
    res.status(500).json({ error: "Email service is not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const html = `
    <h2 style="margin:0 0 16px">New enquiry from WA Building Design</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px">
      <tr><td style="padding:8px 12px;font-weight:600;width:120px">Name</td><td style="padding:8px 12px">${name}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:8px 12px;font-weight:600">Email</td><td style="padding:8px 12px"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px 12px;font-weight:600">Phone</td><td style="padding:8px 12px">${phone || "Not provided"}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:8px 12px;font-weight:600">Service</td><td style="padding:8px 12px">${service || "Not specified"}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:600;vertical-align:top">Message</td><td style="padding:8px 12px;white-space:pre-wrap">${message}</td></tr>
    </table>
  `;

  await transporter.sendMail({
    from: `"WA Building Design" <${user}>`,
    to,
    replyTo: email,
    subject: `New enquiry from ${name}`,
    html,
  });

  res.json({ ok: true });
});

export default router;
