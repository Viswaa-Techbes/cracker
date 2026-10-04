import { CartItemType } from './cartContext';
import { STORE_CONTACT } from './catalogueData';

export interface CustomerEnquiryDetails {
  name: string;
  mobile: string;
  address: string;
  message?: string;
}

export function generateWhatsAppMessage(
  items: CartItemType[],
  details: CustomerEnquiryDetails,
  totalAmount: number
): string {
  const lineSeparator = '------------------------------------------';

  let msg = `✨ *SRI SAI TRADERS - CRACKER ENQUIRY* ✨\n`;
  msg += `${STORE_CONTACT.subtitle}\n`;
  msg += `${lineSeparator}\n\n`;

  msg += `👤 *CUSTOMER DETAILS:*\n`;
  msg += `• *Name:* ${details.name.trim()}\n`;
  msg += `• *Mobile:* ${details.mobile.trim()}\n`;
  msg += `• *Delivery Address:* ${details.address.trim()}\n`;
  if (details.message && details.message.trim()) {
    msg += `• *Special Note:* ${details.message.trim()}\n`;
  }
  msg += `\n${lineSeparator}\n`;

  msg += `📦 *ORDER ENQUIRY ITEMS (${items.length} Products):*\n`;
  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    msg += `${index + 1}. *${item.name}*\n`;
    const catInfo = item.category ? `Category: ${item.category} | ` : '';
    msg += `   └ ${catInfo}Pack: ${item.packQuantity} | Qty: ${item.quantity} x Rs.${item.price}/- = *Rs.${itemTotal}/-*\n`;
  });

  msg += `${lineSeparator}\n`;
  msg += `💰 *ESTIMATED TOTAL (FOR ENQUIRY):* *Rs.${totalAmount.toLocaleString('en-IN')}/-*\n`;
  msg += `${lineSeparator}\n\n`;

  msg += `_Note: This is an order enquiry. Final prices and delivery confirmation will be provided by Sri Sai Traders._\n`;
  msg += `📞 Contact: ${STORE_CONTACT.primaryPhone} | ${STORE_CONTACT.phones[1]}`;

  return msg;
}

export function openWhatsAppEnquiry(
  items: CartItemType[],
  details: CustomerEnquiryDetails,
  totalAmount: number,
  targetPhone: string = STORE_CONTACT.whatsappNumber
) {
  const message = generateWhatsAppMessage(items, details, totalAmount);
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank');
  }
}
