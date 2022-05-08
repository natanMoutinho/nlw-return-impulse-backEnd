import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "de9b02a4b11524",
      pass: "9ffb64dbff2a0c"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        transport.sendMail({
            from: 'Equipe feedback <oi@feedget.com> ',
            to: 'Natan <natan.nt.iff@gmail.com>',
            subject,
            html: body
        })
    }
}