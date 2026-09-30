import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';
import { Payment } from '../models/Payment';
import { Setting } from '../models/Setting';

export class AdminController {
  static async getDashboardStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const [
        totalOrders,
        pendingOrders,
        confirmedOrders,
        packedOrders,
        readyForPickupOrders,
        outForDeliveryOrders,
        completedOrders,
        cancelledOrders,
        paymentPendingOrders,
        paymentReceivedOrders,
        totalCustomers,
        totalProducts,
        recentOrders,
        recentCustomers,
        revenueAggregation,
        pendingAmountAggregation,
      ] = await Promise.all([
        Order.countDocuments(),
        Order.countDocuments({ orderStatus: 'PENDING' }),
        Order.countDocuments({ orderStatus: 'CONFIRMED' }),
        Order.countDocuments({ orderStatus: 'PACKED' }),
        Order.countDocuments({ orderStatus: 'READY_FOR_PICKUP' }),
        Order.countDocuments({ orderStatus: 'OUT_FOR_DELIVERY' }),
        Order.countDocuments({ orderStatus: 'COMPLETED' }),
        Order.countDocuments({ orderStatus: 'CANCELLED' }),
        Order.countDocuments({ paymentStatus: 'PENDING' }),
        Order.countDocuments({ paymentStatus: 'RECEIVED' }),
        Customer.countDocuments(),
        Product.countDocuments({ isActive: true }),
        Order.find().sort({ createdAt: -1 }).limit(6).lean(),
        Customer.find().sort({ createdAt: -1 }).limit(5).lean(),
        // IMPORTANT: Only count orders with paymentStatus === 'RECEIVED' towards actual sales revenue
        Order.aggregate([
          { $match: { paymentStatus: 'RECEIVED' } },
          { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } },
        ]),
        // Unpaid pipeline amount (clearly separated as pending)
        Order.aggregate([
          { $match: { paymentStatus: 'PENDING', orderStatus: { $ne: 'CANCELLED' } } },
          { $group: { _id: null, pendingSales: { $sum: '$totalAmount' } } },
        ]),
      ]);

      const totalReceivedRevenue = revenueAggregation[0]?.totalSales || 0;
      const totalPendingAmount = pendingAmountAggregation[0]?.pendingSales || 0;

      res.json({
        success: true,
        data: {
          metrics: {
            totalOrders,
            pendingOrders,
            confirmedOrders,
            packedOrders,
            readyForPickupOrders,
            outForDeliveryOrders,
            completedOrders,
            cancelledOrders,
            paymentPending: paymentPendingOrders,
            paymentReceived: paymentReceivedOrders,
            totalCustomers,
            totalProducts,
            totalReceivedRevenue, // Realized revenue from offline-confirmed payments
            totalPendingAmount, // Pipeline amount awaiting offline payment
          },
          statusBreakdown: {
            PENDING: pendingOrders,
            CONFIRMED: confirmedOrders,
            PACKED: packedOrders,
            READY_FOR_PICKUP: readyForPickupOrders,
            OUT_FOR_DELIVERY: outForDeliveryOrders,
            COMPLETED: completedOrders,
            CANCELLED: cancelledOrders,
          },
          recentOrders,
          recentCustomers,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPayments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { search, paymentMode, page = '1', limit = '20' } = req.query;
      const filter: any = {};

      if (paymentMode) {
        filter.paymentMode = paymentMode;
      }

      if (search && (search as string).trim()) {
        const s = (search as string).trim();
        const searchRegex = new RegExp(s, 'i');
        filter.$or = [{ orderNumber: searchRegex }, { referenceNumber: searchRegex }, { confirmedBy: searchRegex }];
      }

      const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
      const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
      const skip = (pageNum - 1) * limitNum;

      const [payments, total] = await Promise.all([
        Payment.find(filter)
          .sort({ confirmedAt: -1, createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .populate('orderId', 'orderNumber customerSnapshot totalAmount')
          .lean(),
        Payment.countDocuments(filter),
      ]);

      res.json({
        success: true,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
        limit: limitNum,
        data: payments,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSettings(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let settings: any = await Setting.findOne().lean();
      if (!settings) {
        settings = (await Setting.create({})).toObject();
      }

      res.json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let settings = await Setting.findOne();
      if (!settings) {
        settings = new Setting();
      }

      const fields = [
        'storeName',
        'phone',
        'whatsappNumber',
        'email',
        'address',
        'city',
        'state',
        'pincode',
        'pickupEnabled',
        'deliveryEnabled',
        'minimumOrderAmount',
        'freeDeliveryThreshold',
        'deliveryFee',
        'allowedPincodes',
        'bannerNotice',
        'legalDisclaimer',
      ];

      for (const field of fields) {
        if (req.body[field] !== undefined) {
          (settings as any)[field] = req.body[field];
        }
      }

      await settings.save();

      res.json({
        success: true,
        message: 'Settings updated successfully',
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  }
}
