import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOrderConfirmationEmail(order: any) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: order.customerEmail,
    subject: 'Order Confirmation',
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order (ID: ${order.id}) has been successfully placed.</p>
      <h2>Order Details:</h2>
      <ul>
        <li>Image: ${order.imageMetadata.prompt}</li>
        <li>Size: ${order.printOptions.size}</li>
        <li>Quantity: ${order.printOptions.quantity}</li>
      </ul>
      <p>We'll send you another email with tracking information once your print has been shipped.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
}