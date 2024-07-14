import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from : "onboarding@pehalwan.co.in",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click  <a href="${confirmLink}">here</a> to confirm email.</p>`
    })
}

export const sendResetVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`
    await resend.emails.send({
        from : "onboarding@pehalwan.co.in",
        to: email,
        subject: "Reset your Password",
        html: `<p>Click  <a href="${confirmLink}">here</a> to reset Password.</p>`
    })
}

