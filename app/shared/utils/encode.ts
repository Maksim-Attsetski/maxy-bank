// cryptoUtils.ts
export function isServer() {
  return typeof window === 'undefined'; // Проверяем, сервер это или клиент
}

export async function encode(text: string): Promise<string> {
  if (isServer()) {
    // 🚀 Серверный код (Node.js)
    const crypto = await import('node:crypto');
    const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'base64');
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    const authTag = cipher.getAuthTag();
    return Buffer.concat([iv, authTag, Buffer.from(encrypted, 'base64')]).toString('base64');
  } else {
    // 🌍 Клиентский код (WebCrypto API)
    const key = await getCryptoKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedText = new TextEncoder().encode(text);
    const encrypted = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encodedText);
    return btoa(String.fromCharCode(...iv, ...new Uint8Array(encrypted)));
  }
}

export async function decode(encryptedText: string): Promise<string> {
  if (isServer()) {
    // 🚀 Серверный код (Node.js)
    const crypto = await import('node:crypto');
    const key = Buffer.from(import.meta.env.VITE_PUBLIC_ENCRYPTION_KEY!, 'base64');
    const encryptedBuffer = Buffer.from(encryptedText, 'base64');
    const iv = encryptedBuffer.slice(0, 12);
    const authTag = encryptedBuffer.slice(12, 28);
    const encryptedData = encryptedBuffer.slice(28);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } else {
    // 🌍 Клиентский код (WebCrypto API)
    const key = await getCryptoKey();
    const bytes = Uint8Array.from(atob(encryptedText), (c) => c.charCodeAt(0));
    const iv = bytes.slice(0, 12);
    const encryptedData = bytes.slice(12);
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedData
    );
    return new TextDecoder().decode(decrypted);
  }
}

// 📌 Функция получения ключа для WebCrypto API (клиент)
async function getCryptoKey() {
  const rawKey = Uint8Array.from(atob(import.meta.env.VITE_PUBLIC_ENCRYPTION_KEY!), (c) =>
    c.charCodeAt(0)
  );
  return window.crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ]);
}
