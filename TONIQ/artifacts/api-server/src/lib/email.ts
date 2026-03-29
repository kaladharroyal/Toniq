import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || ""
  }
});

interface ReservationEmail {
  to: string;
  name: string;
  date: string;
  time: string;
  tableNumber: string;
  guests: string;
}

export async function sendConfirmationEmail(data: ReservationEmail) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured — skipping email for", data.to);
    return;
  }

  const html = `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #09090b; color: #fff; border-radius: 8px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #78350f, #92400e); padding: 2rem; text-align: center;">
        <h1 style="margin: 0; font-size: 2rem; font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase; color: #fff;">TONIQUE</h1>
        <p style="margin: 0.5rem 0 0; font-size: 0.9rem; color: rgba(255,255,255,0.8);">Reservation Confirmation</p>
      </div>
      <div style="padding: 2rem;">
        <p style="color: rgba(255,255,255,0.8); font-size: 1rem;">Dear <strong style="color: #f59e0b;">${data.name}</strong>,</p>
        <p style="color: rgba(255,255,255,0.7);">Your reservation has been confirmed. Here are the details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 0.85rem;">Date</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-weight: 600;">${data.date}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 0.85rem;">Time</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; font-weight: 600;">${data.time}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 0.85rem;">Table</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: #f59e0b; font-weight: 600;">${data.tableNumber}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; color: rgba(255,255,255,0.5); font-size: 0.85rem;">Guests</td>
            <td style="padding: 0.75rem; color: #fff; font-weight: 600;">${data.guests}</td>
          </tr>
        </table>
        <p style="color: rgba(255,255,255,0.6); font-size: 0.85rem;">We look forward to hosting you for an unforgettable evening.</p>
      </div>
      <div style="background: rgba(255,255,255,0.03); padding: 1rem 2rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
        <p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 0.75rem;">&copy; Tonique Restaurant. All rights reserved.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Tonique Restaurant" <${process.env.SMTP_USER}>`,
    to: data.to,
    subject: `Reservation Confirmed — ${data.date} at ${data.time}`,
    html
  });

  console.log("Confirmation email sent to", data.to);
}
