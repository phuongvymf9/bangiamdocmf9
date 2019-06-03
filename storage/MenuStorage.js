import StorageCore from './StorageCore';
import { MenuListCache, setMenuListCache } from '../const/AllCache';

const menuKey = '@MenuList';

const saveMenuAsync = async (data) => {
  setMenuListCache(data);
  return await StorageCore.saveAsync(menuKey, data);
}

const getMenuAsync = async () => {
  let menuList = MenuListCache || await StorageCore.getAsync(menuKey, { resultIsObject: true });
  setMenuListCache(menuList);
  return menuList;
}

export default {
  saveMenuAsync,
  getMenuAsync
}