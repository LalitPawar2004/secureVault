import Vault from '../models/Vault.js';
import { encrypt, decrypt } from '../utils/cryptoUtils.js';

// @desc    Create a new vault item
// @route   POST /api/vault
// @access  Private
export const addVaultItem = async (req, res) => {
  const { title, username, password, domain, notes } = req.body;

  try {
    // Encrypt the plain-text password before saving it to the database
    const encryptedPassword = encrypt(password);

    const newItem = await Vault.create({
      userId: req.user._id, // Set by protect middleware
      title,
      username,
      password: encryptedPassword,
      domain,
      notes,
    });

    res.status(201).json({ ...newItem._doc, password: password }); // Return with original plain password for immediate frontend display
  } catch (error) {
    res.status(500).json({ message: 'Failed to add vault item', error: error.message });
  }
};

// @desc    Get all vault items for logged-in user
// @route   GET /api/vault
// @access  Private
export const getVaultItems = async (req, res) => {
  try {
    const items = await Vault.find({ userId: req.user._id });

    // Decrypt the passwords for each item on-the-fly before sending them back to the user
    const decryptedItems = items.map((item) => {
      const itemObj = item.toObject();
      itemObj.password = decrypt(itemObj.password);
      return itemObj;
    });

    res.status(200).json(decryptedItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve items', error: error.message });
  }
};

// @desc    Update a vault item
// @route   PUT /api/vault/:id
// @access  Private
export const updateVaultItem = async (req, res) => {
  const { title, username, password, domain, notes } = req.body;

  try {
    let item = await Vault.findById(req.params.id);

    if (!item || item.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Vault item not found' });
    }

    // Update fields
    item.title = title || item.title;
    item.username = username || item.username;
    item.domain = domain !== undefined ? domain : item.domain;
    item.notes = notes !== undefined ? notes : item.notes;

    // If password is updated, re-encrypt it
    if (password) {
      item.password = encrypt(password);
    }

    const updatedItem = await item.save();
    const result = updatedItem.toObject();
    result.password = decrypt(result.password); // send back decrypted for UI

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item', error: error.message });
  }
};

// @desc    Delete a vault item
// @route   DELETE /api/vault/:id
// @access  Private
export const deleteVaultItem = async (req, res) => {
  try {
    const item = await Vault.findById(req.params.id);

    if (!item || item.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Vault item not found' });
    }

    await item.deleteOne();
    res.status(200).json({ message: 'Vault item removed securely' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error: error.message });
  }
};