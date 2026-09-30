import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.post(
  '/',
  authenticateAdmin,
  upload.single('image'),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
    });
  }
);

export default router;
