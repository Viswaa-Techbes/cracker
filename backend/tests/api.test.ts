import request from 'supertest';
import { createApp } from '../src/app';
import { setupTestDB, teardownTestDB, clearTestDB } from './setup';
import { Category } from '../src/models/Category';
import { Product } from '../src/models/Product';
import { User } from '../src/models/User';
import { Setting } from '../src/models/Setting';
import { Order } from '../src/models/Order';
import { generateOrderNumber } from '../src/models/Counter';

const app = createApp();

beforeAll(async () => {
  await setupTestDB();
}, 120000);

afterAll(async () => {
  await teardownTestDB();
});

beforeEach(async () => {
  await clearTestDB();
});

describe('Cracker Catalogue & Offline Order System API Tests', () => {
  let adminToken: string;
  let testCategory: any;
  let testProduct1: any;
  let testProduct2: any;

  beforeEach(async () => {
    // 1. Create Default Settings
    await Setting.create({
      storeName: 'Test Crackers',
      minimumOrderAmount: 200,
      freeDeliveryThreshold: 2000,
      deliveryFee: 100,
      whatsappNumber: '919876543210',
    });

    // 2. Create Admin User
    const admin = new User({
      name: 'Admin Tester',
      email: 'admin@test.com',
      password: 'Password123!',
      role: 'ADMIN',
      isActive: true,
    });
    await admin.save();

    // 3. Login to get token
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'admin@test.com',
      password: 'Password123!',
    });
    adminToken = loginRes.body.token;

    // 4. Create Category
    testCategory = await Category.create({
      name: 'Sparkles',
      slug: 'sparkles',
      description: 'Festive sparkles',
      image: '/uploads/categories/sparkles.svg',
      isActive: true,
    });

    // 5. Create Products with authoritative database prices
    testProduct1 = await Product.create({
      name: '7 CM Valentine Red',
      slug: '7-cm-valentine-red',
      categoryId: testCategory._id,
      packQuantity: '1 Box – 10 pcs',
      price: 20, // Real DB price is ₹20
      image: '/uploads/categories/sparkles.svg',
      isActive: true,
      stockStatus: 'IN_STOCK',
    });

    testProduct2 = await Product.create({
      name: 'Flower Pot Big (Standard Company)',
      slug: 'flower-pot-big-standard-company',
      categoryId: testCategory._id,
      packQuantity: '1 Box – 10 pcs',
      price: 200, // Real DB price is ₹200
      image: '/uploads/categories/flower-pot.svg',
      isActive: true,
      stockStatus: 'IN_STOCK',
    });
  });

  // TEST 1: Categories API
  test('Category API: returns list and details', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].slug).toBe('sparkles');
    expect(res.body.data[0].productCount).toBe(2);

    const slugRes = await request(app).get('/api/categories/sparkles');
    expect(slugRes.status).toBe(200);
    expect(slugRes.body.data.name).toBe('Sparkles');
  });

  // TEST 2: Product API
  test('Product API: supports list, category filtering, search, and details', async () => {
    const listRes = await request(app).get('/api/products');
    expect(listRes.status).toBe(200);
    expect(listRes.body.data.length).toBe(2);

    // Search by name
    const searchRes = await request(app).get('/api/products?q=Valentine');
    expect(searchRes.status).toBe(200);
    expect(searchRes.body.data.length).toBe(1);
    expect(searchRes.body.data[0].name).toBe('7 CM Valentine Red');

    // Get single product
    const singleRes = await request(app).get('/api/products/7-cm-valentine-red');
    expect(singleRes.status).toBe(200);
    expect(singleRes.body.data.price).toBe(20);
  });

  // TEST 3 & 4: CRITICAL BACKEND PRICE CALCULATION & PRICE TAMPERING RESISTANCE
  test('Backend Price Calculation: MUST IGNORE spoofed frontend price and use DB price', async () => {
    // Malicious or misbehaving client attempts to send unitPrice = 1 instead of 200
    const spoofedOrderPayload = {
      customerName: 'Ramesh Kumar',
      mobile: '9876543210',
      whatsapp: '9876543210',
      address: '12 Gandhi Road',
      city: 'Sivakasi',
      pincode: '626123',
      orderType: 'DELIVERY',
      items: [
        {
          productId: testProduct2._id.toString(),
          quantity: 10,
          unitPrice: 1, // SPOOFED PRICE!
          lineTotal: 10, // SPOOFED TOTAL!
        },
      ],
    };

    const res = await request(app).post('/api/orders').send(spoofedOrderPayload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    const orderData = res.body.data;
    // Expected calculation:
    // Quantity 10 * Real DB Price 200 = 2000 subtotal.
    // Subtotal 2000 >= freeDeliveryThreshold (2000) => delivery fee = 0
    // Total Amount = 2000 (NOT 10 or 110!)
    expect(orderData.subtotal).toBe(2000);
    expect(orderData.totalAmount).toBe(2000);
    expect(orderData.order.items[0].unitPrice).toBe(200);
    expect(orderData.order.items[0].lineTotal).toBe(2000);
  });

  // TEST 5: Invalid product handling
  test('Invalid Product Handling: Rejects order with non-existent or out-of-stock product', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const invalidPayload = {
      customerName: 'Suresh',
      mobile: '9876543210',
      address: '45 Cross Street',
      city: 'Madurai',
      pincode: '625001',
      orderType: 'PICKUP',
      items: [{ productId: fakeId, quantity: 2 }],
    };

    const res = await request(app).post('/api/orders').send(invalidPayload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // TEST 6: Minimum Order Threshold
  test('Minimum Order Threshold: Rejects order below minimum order requirement', async () => {
    // testProduct1 price is 20. 2 * 20 = 40 < 200 minimum
    const belowMinPayload = {
      customerName: 'Anand',
      mobile: '9876543210',
      address: 'Street 1',
      city: 'Sivakasi',
      pincode: '626123',
      orderType: 'PICKUP',
      items: [{ productId: testProduct1._id.toString(), quantity: 2 }],
    };

    const res = await request(app).post('/api/orders').send(belowMinPayload);
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Minimum order');
  });

  // TEST 7: Admin Authentication & Guard
  test('Admin Auth: guards admin routes from unauthenticated users', async () => {
    const unauthRes = await request(app).get('/api/admin/orders');
    expect(unauthRes.status).toBe(401);

    const authRes = await request(app)
      .get('/api/admin/orders')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(authRes.status).toBe(200);
  });

  // TEST 8 & 9: Order Status Transitions & Offline Payment Confirmation
  test('Order Lifecycle: Status transitions and offline payment confirmation', async () => {
    // 1. Create an order
    const orderRes = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'Karthik',
        mobile: '9988776655',
        address: '10 Temple Street',
        city: 'Virudhunagar',
        pincode: '626001',
        orderType: 'DELIVERY',
        items: [{ productId: testProduct2._id.toString(), quantity: 2 }], // 2 * 200 = 400 + 100 delivery = 500
      });

    expect(orderRes.status).toBe(201);
    const orderId = orderRes.body.data.order._id;
    const orderNumber = orderRes.body.data.orderNumber;

    // Check initial status
    expect(orderRes.body.data.orderStatus).toBe('PENDING');
    expect(orderRes.body.data.paymentStatus).toBe('PENDING');

    // 2. Admin confirms offline payment
    const paymentRes = await request(app)
      .post(`/api/admin/orders/${orderId}/payment`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        paymentMode: 'UPI_OFFLINE',
        referenceNumber: 'UPI/2026/8947291',
        notes: 'GPay payment received at store desk',
      });

    expect(paymentRes.status).toBe(200);
    expect(paymentRes.body.data.order.paymentStatus).toBe('RECEIVED');
    expect(paymentRes.body.data.order.orderStatus).toBe('CONFIRMED');

    // 3. Admin transitions status: CONFIRMED -> PACKED -> OUT_FOR_DELIVERY -> COMPLETED
    const packedRes = await request(app)
      .patch(`/api/admin/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ orderStatus: 'PACKED', note: 'Boxed and ready for dispatcher' });
    expect(packedRes.body.data.orderStatus).toBe('PACKED');

    const completedRes = await request(app)
      .patch(`/api/admin/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ orderStatus: 'COMPLETED', note: 'Delivered to customer safely' });
    expect(completedRes.body.data.orderStatus).toBe('COMPLETED');

    // 4. Verify public order lookup
    const lookupRes = await request(app).get(`/api/orders/${orderNumber}`);
    expect(lookupRes.status).toBe(200);
    expect(lookupRes.body.data.orderStatus).toBe('COMPLETED');
    expect(lookupRes.body.data.paymentStatus).toBe('RECEIVED');
  });

  // TEST 10: Atomic Order Number Generation
  test('Order Number Generation: produces sequential ORD-YYYY-XXXXXX format', async () => {
    const num1 = await generateOrderNumber();
    const num2 = await generateOrderNumber();
    const currentYear = new Date().getFullYear();

    expect(num1).toMatch(new RegExp(`^ORD-${currentYear}-\\d{6}$`));
    expect(num2).toMatch(new RegExp(`^ORD-${currentYear}-\\d{6}$`));
    expect(num1).not.toBe(num2);
  });
});
