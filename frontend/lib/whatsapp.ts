import { CartItemType } from './cartContext';
import { STORE_CONTACT } from './catalogueData';

export interface CustomerEnquiryDetails {
  name: string;
  mobile: string;
  address: string;
  city?: string;
  pincode?: string;
  preferredDate?: string;
  message?: string;
}

export function generateWhatsAppMessage(
  items: CartItemType[],
  details: CustomerEnquiryDetails,
  subtotal: number,
  transportationCharge: number = 0
): string {
  const lineSeparator = '------------------------------------------';
  const grandTotal = subtotal + transportationCharge;

  let msg = `✨ *SRI SAI TRADERS - CRACKER ENQUIRY & BOOKING* ✨\n`;
  msg += `${STORE_CONTACT.subtitle}\n`;
  msg += `${lineSeparator}\n\n`;

  msg += `👤 *CUSTOMER & BOOKING DETAILS:*\n`;
  msg += `• *Name:* ${details.name.trim()}\n`;
  msg += `• *Mobile:* ${details.mobile.trim()}\n`;
  const fullAddress = [
    details.address.trim(),
    details.city ? details.city.trim() : '',
    details.pincode ? `PIN: ${details.pincode.trim()}` : '',
  ]
    .filter(Boolean)
    .join(', ');
  msg += `• *Delivery Address:* ${fullAddress}\n`;
  if (details.preferredDate && details.preferredDate.trim()) {
    msg += `• *Preferred Date:* ${details.preferredDate.trim()}\n`;
  }
  if (details.message && details.message.trim()) {
    msg += `• *Special Notes:* ${details.message.trim()}\n`;
  }
  msg += `\n${lineSeparator}\n`;

  msg += `📦 *BOOKED PRODUCTS (${items.length} Items):*\n`;
  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    msg += `${index + 1}. *${item.name}*\n`;
    const catInfo = item.category ? `Category: ${item.category} | ` : '';
    msg += `   └ ${catInfo}Pack: ${item.packQuantity} | Qty: ${item.quantity} x Rs.${item.price}/- = *Rs.${itemTotal}/-*\n`;
  });

  msg += `${lineSeparator}\n`;
  msg += `📊 *PRICE BREAKDOWN:*\n`;
  msg += `• *Subtotal:* Rs.${subtotal.toLocaleString('en-IN')}/-\n`;
  msg += `• *Transportation:* Rs.${transportationCharge.toLocaleString('en-IN')}/-\n`;
  msg += `💰 *GRAND TOTAL:* *Rs.${grandTotal.toLocaleString('en-IN')}/-*\n`;
  msg += `${lineSeparator}\n\n`;

  msg += `_Note: This is an order booking enquiry. Final billing, dispatch schedule, and stock verification will be confirmed by Sri Sai Traders._\n`;
  msg += `📞 Contact: ${STORE_CONTACT.primaryPhone} | ${STORE_CONTACT.phones[1]}`;

  return msg;
}

export function openWhatsAppEnquiry(
  items: CartItemType[],
  details: CustomerEnquiryDetails,
  subtotal: number,
  transportationCharge: number = 0,
  targetPhone: string = STORE_CONTACT.whatsappNumber
) {
  const message = generateWhatsAppMessage(items, details, subtotal, transportationCharge);
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank');
  }
}
