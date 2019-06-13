import StorageCore from './StorageCore';

const CAPSO_KHUYENKHICH_GOICUOC  = '@CSKKMF9:GoiCuoc';

// ==============================================================================

export const saveGoiCuocAsync = async (data) => {
  try {
    return await StorageCore.saveAsync(CAPSO_KHUYENKHICH_GOICUOC, data, { showLog: true });
  } catch (error) {
    throw error;
  }
}

export const getGoiCuocObjectAsync = async () => {
  try {
    return await StorageCore.getAsync(CAPSO_KHUYENKHICH_GOICUOC, { resultIsObject: true });
  } catch (error) {
    throw error;
  }
}

export const deleteGoiCuocAsync = async () => {
  try {
    return await StorageCore.clearAsync(CAPSO_KHUYENKHICH_GOICUOC);
  } catch (error) {
    throw error;
  }
}

