import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const hasEmail = gmailPass && gmailPass !== "your_app_password_here";

    if (hasEmail) {
      const nodemailer = (await import("nodemailer")).default;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });
      await transporter.sendMail({
        from: `"Portfolio Contact" <${gmailUser}>`,
        to: "pratyakshbharadwaj@gmail.com",
        replyTo: email,
        subject: `[Portfolio] ${subject} — from ${name}`,
        html: `
          <div style="font-family:monospace;max-width:560px;padding:32px;background:#0f172a;color:#e2e8f0;border-radius:12px">
            <h2 style="color:#00dc82;margin:0 0 24px">&lt;new_message /&gt;</h2>
            <p><strong style="color:#94a3b8">From:</strong> ${name}</p>
            <p><strong style="color:#94a3b8">Email:</strong> <a href="mailto:${email}" style="color:#6366f1">${email}</a></p>
            <p><strong style="color:#94a3b8">Subject:</strong> ${subject}</p>
            <hr style="border-color:#1e293b;margin:20px 0"/>
            <p style="line-height:1.7;color:#cbd5e1">${message.replace(/\n/g, "<br/>")}</p>
          </div>
        `,
      });
    } else {
      const filePath = path.join(process.cwd(), "messages.json");
      const existing = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
        : [];
      existing.push({ name, email, subject, message, date: new Date().toISOString() });
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact route error]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
