// Encryption/Decryption utilities using Web Crypto API

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const IV_LENGTH = 12;

// Generate a random key (in production, this should be provided by user or stored securely)
async function generateKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: ALGORITHM,
      length: KEY_LENGTH,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

// Derive key from password
async function deriveKeyFromPassword(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('steganography-salt'), // In production, use random salt
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptData(data: string, password?: string): Promise<string> {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  
  // Use provided password or generate random key
  const key = password ? await deriveKeyFromPassword(password) : await generateKey();
  
  // Generate random IV
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  
  // Encrypt data
  const encrypted = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv: iv,
    },
    key,
    encodedData
  );

  // Combine IV and encrypted data
  const combined = new Uint8Array(IV_LENGTH + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), IV_LENGTH);
  
  // Convert to base64 for storage
  return btoa(String.fromCharCode(...combined));
}

export async function decryptData(encryptedData: string, password?: string): Promise<string> {
  try {
    // Convert from base64
    const combined = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    );
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, IV_LENGTH);
    const encrypted = combined.slice(IV_LENGTH);
    
    // Use provided password or generate key (in production, key should be stored/provided)
    const key = password ? await deriveKeyFromPassword(password) : await generateKey();
    
    // Decrypt data
    const decrypted = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: iv,
      },
      key,
      encrypted
    );
    
    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    throw new Error('Failed to decrypt data - possibly wrong key or corrupted data');
  }
}
