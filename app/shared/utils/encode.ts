async function getCryptoKey(): Promise<CryptoKey> {
  const keyBase64 = process.env.VITE_PUBLIC_ENCRYPTION_KEY?.trim();

  if (!keyBase64) {
    throw new Error('🔴 VITE_PUBLIC_ENCRYPTION_KEY не задан!');
  }

  let rawKey;
  try {
    rawKey = Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0));
  } catch (e) {
    throw new Error('🔴 Ошибка декодирования ключа! Проверь, что это корректный base64.');
  }

  if (rawKey.length !== 32) {
    throw new Error(`🔴 Неправильная длина ключа: ${rawKey.length} байт (должно быть 32).`);
  }

  return crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function decode(encryptedText: string): Promise<string> {
  if (!encryptedText || encryptedText.length < 16) {
    // 🛑 Проверяем длину перед декодированием
    throw new Error('🔴 Некорректные зашифрованные данные!');
  }

  const key = await getCryptoKey();
  let bytes;

  try {
    bytes = Uint8Array.from(atob(encryptedText), (c) => c.charCodeAt(0));
  } catch (e) {
    throw new Error('🔴 Ошибка декодирования Base64! Данные повреждены.');
  }

  if (bytes.length < 13) {
    // 12 байт IV + минимум 1 байт данных
    throw new Error('🔴 Длина зашифрованных данных слишком мала!');
  }

  const iv = bytes.slice(0, 12); // ✅ Первые 12 байт — это IV
  const encryptedData = bytes.slice(12);

  // 🔓 Расшифровываем
  let decrypted;
  try {
    decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encryptedData);
  } catch (e) {
    throw new Error('🔴 Ошибка расшифровки! Возможно, данные повреждены.');
  }

  return new TextDecoder().decode(decrypted);
}

export async function encode(text: string): Promise<string> {
  const key = await getCryptoKey();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-байтовый IV
  const encodedText = new TextEncoder().encode(text);

  // 🔒 Шифруем
  const encrypted = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encodedText);

  // 🔄 Объединяем IV + зашифрованные данные
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined)); // ✅ Преобразуем в Base64
}
