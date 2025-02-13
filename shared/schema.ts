import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Stock Schema
const stockSchema = new mongoose.Schema({
  symbol: { 
    type: String, 
    required: true,
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  currentPrice: { 
    type: Number, 
    required: true 
  },
  change: { 
    type: Number, 
    required: true 
  },
  volume: { 
    type: Number, 
    required: true 
  },
  lastUpdated: { 
    type: Date, 
    required: true,
    default: Date.now 
  }
});

// Watchlist Schema
const watchlistSchema = new mongoose.Schema({
  stock: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Stock',
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  addedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create and export models
export const User = mongoose.model('User', userSchema);
export const Stock = mongoose.model('Stock', stockSchema);
export const Watchlist = mongoose.model('Watchlist', watchlistSchema);

// Type definitions for TypeScript
export type UserDocument = mongoose.Document & {
  username: string;
  password: string;
  createdAt: Date;
};

export type StockDocument = mongoose.Document & {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  volume: number;
  lastUpdated: Date;
};

export type WatchlistDocument = mongoose.Document & {
  stock: mongoose.Types.ObjectId | StockDocument;
  user: mongoose.Types.ObjectId | UserDocument;
  addedAt: Date;
};