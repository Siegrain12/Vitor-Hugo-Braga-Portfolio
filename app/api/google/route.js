import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  // A secret key nunca pode levar o prefixo NEXT_PUBLIC_: isso a enviaria
  // dentro do bundle do navegador e qualquer visitante poderia forjar a
  // verificação do captcha.
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({
      error: "Captcha não configurado no servidor.",
      success: false,
    }, { status: 503 });
  }

  try {
    const reqBody = await request.json();

    const res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({ secret: secretKey, response: reqBody.token })
    );

    if (res.data.success) {
      return NextResponse.json({
        message: "Captcha verification success!!",
        success: true,
      });
    }

    return NextResponse.json({
      error: "Captcha verification failed!",
      success: false,
    }, { status: 400 });
  } catch (error) {
    console.error("Captcha verification error:", error.message);
    return NextResponse.json({
      error: "Captcha verification failed!",
      success: false,
    }, { status: 500 });
  }
};
