import { Request, Response, NextFunction } from 'express';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';

export class CustomerController {
  static async getCustomers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { search, page = '1', limit = '20' } = req.query;
      const filter: any = {};

      if (search && (search as string).trim()) {
        const s = (search as string).trim();
        const searchRegex = new RegExp(s, 'i');
        filter.$or = [{ name: searchRegex }, { mobile: searchRegex }, { city: searchRegex }];
      }

      const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
      const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
      const skip = (pageNum - 1) * limitNum;

      const [customers, total] = await Promise.all([
        Customer.find(filter)
          .sort({ totalOrders: -1, createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Customer.countDocuments(filter),
      ]);

      res.json({
        success: true,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
        limit: limitNum,
        data: customers,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCustomerById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const customer = await Customer.findById(String(id)).lean();

      if (!customer) {
        res.status(404).json({ success: false, message: 'Customer not found' });
        return;
      }

      const orders = await Order.find({ customerId: customer._id })
        .sort({ createdAt: -1 })
        .lean();

      res.json({
        success: true,
        data: {
          ...customer,
          orders,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
