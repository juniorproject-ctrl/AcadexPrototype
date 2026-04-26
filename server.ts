import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { createServer as createViteServer } from 'vite';

dotenv.config({ path: '.env.local' });

type PendingSignup = {
  name: string;
  email: string;
  password: string;
  role: 'Student' | 'Tutor' | 'Admin';
  code: string;
  expiresAt: number;
};

const allowedUniversityDomainPattern = /@(?:(?:[a-z0-9-]+\.)*ac\.ae|aus\.edu)$/i;
const pendingSignups = new Map<string, PendingSignup>();

function isAllowedUniversityEmail(email: string) {
  return allowedUniversityDomainPattern.test(email.trim());
}

function buildTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Missing SMTP configuration. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env.local.');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/auth/request-code', async (req, res) => {
    const { name, email, password, role } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: 'Student' | 'Tutor' | 'Admin';
    };

    if (!name?.trim() || !email?.trim() || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password, and role are required.' });
    }

    if (!isAllowedUniversityEmail(email)) {
      return res.status(400).json({ error: 'Please use a UAE university email from a .ac.ae campus domain or aus.edu.' });
    }

    const code = String(Math.floor(1000 + Math.random() * 9000));
    const normalizedEmail = email.trim().toLowerCase();

    pendingSignups.set(normalizedEmail, {
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    try {
      const transporter = buildTransporter();
      await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: normalizedEmail,
        subject: 'Your Acadex verification code',
        text: `Hello ${name.trim()}, your Acadex verification code is ${code}. It expires in 10 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #2D4B69;">
            <h2 style="margin-bottom: 12px;">Verify your Acadex account</h2>
            <p>Hello ${name.trim()},</p>
            <p>Your verification code is:</p>
            <div style="font-size: 32px; font-weight: 700; letter-spacing: 8px; margin: 24px 0; color: #D4AF37;">${code}</div>
            <p>This code expires in 10 minutes.</p>
          </div>
        `,
      });

      return res.json({ ok: true });
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return res.status(500).json({
        error: 'The signup code could not be emailed. Add working SMTP values to .env.local before trying again.',
      });
    }
  });

  app.post('/api/auth/verify-code', (req, res) => {
    const { email, code } = req.body as {
      email?: string;
      code?: string;
    };

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !code) {
      return res.status(400).json({ error: 'Email and code are required.' });
    }

    const pendingSignup = pendingSignups.get(normalizedEmail);

    if (!pendingSignup) {
      return res.status(400).json({ error: 'No pending signup was found for this email. Please request a new code.' });
    }

    if (Date.now() > pendingSignup.expiresAt) {
      pendingSignups.delete(normalizedEmail);
      return res.status(400).json({ error: 'This code has expired. Please request a new one.' });
    }

    if (pendingSignup.code !== code.trim()) {
      return res.status(400).json({ error: 'Incorrect verification code.' });
    }

    pendingSignups.delete(normalizedEmail);
    return res.json({ ok: true });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
