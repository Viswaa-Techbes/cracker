import { IOrder } from '../models/Order';

export function generateWhatsAppOrderMessage(
  order: IOrder,
  storePhone?: string
): { message: string; url: string } {
  const phone = (storePhone || process.env.WHATSAPP_NUMBER || '919876543210').replace(/\D/g, '');

  let itemsText = '';
  order.items.forEach((item, index) => {
    itemsText += `${index + 1}. ${item.productName} (${item.packQuantity}) x ${item.quantity} = ₹${item.lineTotal}\n`;
  });

  const message = `✨ *ORDER CONFIRMATION ENQUIRY* ✨
-----------------------------
*Order Number:* ${order.orderNumber}
*Customer Name:* ${order.customerSnapshot.name}
*Mobile:* ${order.customerSnapshot.mobile}

*Items Ordered:*
${itemsText}
*Subtotal:* ₹${order.subtotal}
${order.deliveryFee > 0 ? `*Delivery Fee:* ₹${order.deliveryFee}\n` : ''}*Total Amount:* ₹${order.totalAmount}
*Order Type:* ${order.orderType}
*Payment Status:* ${order.paymentStatus} (Offline)
*Delivery Address:* ${order.deliveryAddress.address}, ${order.deliveryAddress.city} - ${order.deliveryAddress.pincode}
-----------------------------
Hello Team, I have placed this order on your website. Please confirm availability and offline payment instructions. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  return { message, url };
}
