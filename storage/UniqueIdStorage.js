import { AsyncStorage } from 'react-native';
import { printLog } from '../utils/LogUtil';

const UNIQUE_ID_KEY = '@UniqueId';

const makeid = (length) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const generateUniqueId = () => {
  let id = `${makeid(6)}-${makeid(6)}-${makeid(6)}-${makeid(6)}`;
  return id;
}

export const getUniqueId = async () => {
  try {
    // Get id from Storage
    let id = await AsyncStorage.getItem(UNIQUE_ID_KEY);
    
    if (!id) {
      // Generate new Id
      id = generateUniqueId().toUpperCase();

      // Save id to local Storage // FIXME: Save to file
      await AsyncStorage.setItem(UNIQUE_ID_KEY, id);
    }

    id = id.toUpperCase();

    printLog('getUniqueId', id);

    return id;

  } catch (error) {
    throw error;
  }
}

export const saveUniqueId = async (id) => {
  printLog('saveUniqueId', id);
  
  try {
    // Save id to local Storage 
    // FIXME: Save to file
    await AsyncStorage.setItem(UNIQUE_ID_KEY, id);

  } catch (error) {
    console.error('saveUniqueId', error);
  }
}