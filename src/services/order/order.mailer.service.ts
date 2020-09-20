import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { MailConfig } from "config/mail.config";
import { CartArticle } from "src/entities/cart-article.entity";
import { Order } from "src/entities/order.entity";

@Injectable()
export class OrderMailer {
    constructor(private readonly mailService: MailerService) {}

    async sendOrderEmail(order: Order) {
        await this.mailService.sendMail({
            to: order.cart.user.email,
            bcc: MailConfig.orderNotificationMail,
            subject: 'Order details',
            encoding: 'UTF-8',
            html: this.makeOrderHtml(order),
        });
    }

    private makeOrderHtml(order: Order): string {
        // eslint-disable-next-line prefer-const
        let suma = order.cart.cartArticles.reduce((sum, current: CartArticle) => {
            return sum + current.quantity * 
            current.article.articlePrices[current.article.articlePrices.length - 1].price
        }, 0)
        return `<p>Thank you for your order!</p>
                <p>This are details of your order</p>
                <ul>
                    ${ order.cart.cartArticles.map((cartArticle: CartArticle) => {
                        return `<li>
                            ${ cartArticle.article.name } x
                            ${ cartArticle.quantity }
                        </li>`
                    }).join("")}
                </ul>
                <p>Total amount: ${ suma.toFixed(2) } EUR </p>
                <p>Potpis...</p>`;
    }
}