import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage'; // used only as a DEV fallback/migration

export async function secureSet(key, data) {
  const value = JSON.stringify(data);
  const available = await SecureStore.isAvailableAsync();
  if (!available && !__DEV__) throw new Error('Secure storage not available');
  if (available) return SecureStore.setItemAsync(key, value, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK });
  // dev-only fallback (prevent crashing on emulators without hardware backed store)
  return AsyncStorage.setItem(`DEV_${key}`, value);
}

export async function secureGet(key) {
  const available = await SecureStore.isAvailableAsync();
  const raw = available
    ? await SecureStore.getItemAsync(key)
    : await AsyncStorage.getItem(`DEV_${key}`);
  return raw ? JSON.parse(raw) : null;
}

export async function secureDelete(key) {
  const available = await SecureStore.isAvailableAsync();
  if (available) return SecureStore.deleteItemAsync(key);
  return AsyncStorage.removeItem(`DEV_${key}`);
}
