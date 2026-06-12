import mongoose from 'mongoose';

const vaultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Username or Email is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    domain: {
      type: String,
      trim: true,
      default: '', // Optional field
    },
    notes: {
      type: String,
      default: '', // Optional field
    },
  },
  {
    timestamps: true,
  }
);

const Vault = mongoose.model('Vault', vaultSchema);
export default Vault;