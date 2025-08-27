import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error("RESEND_API_KEY is not set in the environment variables.");
}

const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipientEmail, message, requestingUser } = body;

    if (!recipientEmail || !message || !requestingUser) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }
    
    const senderName = requestingUser.name;
    
    const senderEmail = "onboarding@resend.dev";

    const { data, error } = await resend.emails.send({
      from: `${senderName} <${senderEmail}>`,
      to: [recipientEmail],
      subject: `Recommendation Request from ${senderName}`,
      html: `<p>${message}</p>`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully!", data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
