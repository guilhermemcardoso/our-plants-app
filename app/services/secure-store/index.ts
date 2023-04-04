import EncryptedStorage from 'react-native-encrypted-storage';
import { EncryptedKeys } from './constants';

export async function setKey(key: EncryptedKeys, value: string) {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.log('[EncryptedStorage] - setKey Error: ', error);
  }
}

export async function getKey(key: EncryptedKeys) {
  try {
    const value = await EncryptedStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('[EncryptedStorage] - getKey Error: ', error);
  }
}

export async function deleteKey(key: EncryptedKeys) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.log('[EncryptedStorage] - deleteKey Error: ', error);
  }
}

export async function clearAll() {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    console.log('[EncryptedStorage] - clearAll Error: ', error);
  }
}
