// Storage interface for steganography application
// This is a simplified storage without user management for the personal project

export interface IStorage {
  // Add any storage methods here if needed in the future
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage if needed
  }
}

export const storage = new MemStorage();
