import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from './constants';

export async function setKey(key: StorageKeys, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('[AsyncStorage] - setKey Error: ', error);
  }
}

export async function getKey(key: StorageKeys) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('[AsyncStorage] - getKey Error: ', error);
  }
}

export async function deleteKey(key: StorageKeys) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('[AsyncStorage] - deleteKey Error: ', error);
  }
}

export async function clearAll() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('[AsyncStorage] - clearAll Error: ', error);
  }
}
