import express from 'express';
import { addVaultItem, getVaultItems, updateVaultItem, deleteVaultItem } from '../controllers/vaultController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply route protection middleware to all vault endpoints
router.route('/')
  .post(protect, addVaultItem)
  .get(protect, getVaultItems);

router.route('/:id')
  .put(protect, updateVaultItem)
  .delete(protect, deleteVaultItem);

export default router;