import 'react-native-get-random-values';
import storage from '@react-native-firebase/storage';
import { v4 as uuid } from 'uuid';

export async function uploadImage(imageUri: string) {
  const imageId = uuid();
  const reference = storage().ref(imageId);

  await reference.putFile(imageUri);
  const url = await storage().ref(imageId).getDownloadURL();
  return url;
}
