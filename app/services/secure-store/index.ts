import EncryptedStorage from 'react-native-encrypted-storage';

export async function set(key: string, value: string) {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.log('[EncryptedStorage] - Error: ', error);
  }
}

export async function get(key: string) {
  try {
    const value = await EncryptedStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('[EncryptedStorage] - Error: ', error);
  }
}

export async function del(key: string) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.log('[EncryptedStorage] - Error: ', error);
  }
}

export async function clearAll() {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.log('[EncryptedStorage] - Error: ', error);
  }
}
