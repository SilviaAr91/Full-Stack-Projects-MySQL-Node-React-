const nodemailer = require("nodemailer");
require("dotenv").config();



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true para el puerto 465, para el resto es false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

class EmailService {

    sendVerificationEmail = (email, verificationUrl) => {
        // Aquí iría la lógica para enviar el correo de verificación
        let msgHTML = `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <h1>Haz click en el enlace para verificar tu correo</h1>
          <div>${verificationUrl}</div>
      
        </body>
        </html>`;
        //verificacion de prueba para ver si hay conexion
        transporter.verify().then(console.log).catch(console.error);
        const info = transporter.sendMail({
          from: "Highsa System",
          to: email,
          subject: "Verifica tu correo",
          text: "Verifica tu correo",
          html: msgHTML,
        });
        info.then((res) => console.log(res)).catch((err) => console.log(err));
      };

      sendMail = (email, url, name) => {
        let msgHTML = `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Restablecer Contraseña</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #F4F4F4;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F4F4F4; padding: 20px;">
                <tr>
                    <td align="center">
                        <table width="600" border="0" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <tr>
                                <td style="background-color: #132234; padding: 20px; text-align: center; color: #FFFFFF; font-size: 24px;">
                                    <strong>Restablecer Contraseña</strong>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 30px; text-align: left; color: #333333;">
                                    <p style="font-size: 16px; line-height: 1.5;">
                                        Hola ${name},
                                    </p>
                                    <p style="font-size: 16px; line-height: 1.5;">
                                        Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz click en el siguiente enlace para restablecer tu contraseña:
                                    </p>
                                    <p style="text-align: center; margin: 30px 0;">
                                        <a href=${url} style="background-color: #E5B710; color: #FFFFFF; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Restablecer Contraseña</a>
                                    </p>
                                    <p style="font-size: 16px; line-height: 1.5;">
                                        Si no solicitaste un cambio de contraseña, puedes ignorar este correo. Tu contraseña actual no se verá afectada.
                                    </p>
                                    <p style="font-size: 16px; line-height: 1.5;">
                                        Gracias,
                                        <br>
                                        El equipo de HIGSA
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #F4F4F4; padding: 20px; text-align: center; color: #666666; font-size: 14px;">
                                    ©  HIGSA. Todos los derechos reservados.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`;
        //verificacion de prueba para ver si hay conexion
        transporter.verify().then(console.log).catch(console.error);
      
        const info = transporter.sendMail({
          from: "HIGSA",
          to: email,
          subject: "Restablecer Contraseña",
          html: msgHTML,
        });
        info.then((res) => console.log(res)).catch((err) => console.log(err));
      };
}

module.exports = new EmailService();

