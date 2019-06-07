import { GradientColors } from "../const/Colors";
import { loaiNhanVien }   from "../const/AppConfig";
import LogUtil, { printLog }       from "./LogUtil";
import { ApiAppTools } from "../api/SoapApi";
import DeviceInfo from "../const/DeviceInfo";
import MenuStorage from "../storage/MenuStorage";

// ===============================================================================
// ## DANH SACH MENU ## ----------------------------------------------------------
// ===============================================================================

const menuTaiKhoan = {
  GradientColors  : GradientColors.taiKhoanMenu,
  iconName        : 'account-settings',
  title           : 'Tài khoản',
  screenName      : 'TaiKhoan'
};

const menuKpiNVBH = {
  GradientColors  : GradientColors.menuKpi,
  iconName        : 'finance',
  title           : 'KPI',
  screenName      : 'KPI'
}

const menuKpiTNBH = {
  GradientColors  : GradientColors.menuKpi,
  iconName        : 'finance',
  title           : 'KPI',
  screenName      : 'KPIDanhSach'
}

const menuKpiGSKPP = {
  GradientColors  : GradientColors.menuKpi,
  iconName        : 'finance',
  title           : 'KPI',
  screenName      : 'KPIDanhSach'
}

const menuKpiGDV = {
  GradientColors  : GradientColors.menuKpi,
  iconName        : 'finance',
  title           : 'KPI',
  screenName      : 'KPIDanhSach'
}

const menuChamSocDBL = {
  GradientColors  : GradientColors.menuChamSocDBL,
  iconName        : 'car-connected',
  title           : 'Chăm sóc\nĐBL',
  screenName      : 'ChamSocDBL'
};

const menuLichChamSoc = {
  GradientColors  : GradientColors.menuLichChamSoc,
  iconName        : 'calendar',
  title           : 'Lịch',
  screenName      : 'LichChamSoc'
};

const menuLichSuChamSoc = {
  GradientColors  : GradientColors.menuLichSu,
  iconName        : 'history',
  title           : 'Lịch sử',
  screenName      : 'LichSuChamSoc'
};

const menuDongBo = {
  GradientColors  : GradientColors.menuDongBo,
  iconName        : 'cloud-sync',
  title           : 'Đồng bộ',
  screenName      : 'DongBo'
};

const menuDatHang = {
  GradientColors  : GradientColors.taiKhoanMenu,
  iconName        : 'cart-plus',
  title           : 'Đặt hàng',
  screenName      : 'DatHang'
};

const menuQuayThuong = {
  GradientColors  : GradientColors.menuQuayThuong,
  iconName        : 'gift',
  title           : 'Thần Tài\n3 Khía',
  screenName      : 'QuayThuong'
};

const menuKiemTraGoi = {
  GradientColors  : GradientColors.menuKiemTraGoi,
  iconName        : 'format-list-checks',
  title           : 'Kiểm tra gói',
  screenName      : 'KiemTraGoi'
};

const menuBaoCao3Khia = {
  GradientColors  : GradientColors.menuBaoCao3Khia,
  iconName        : 'book-open',
  title           : 'Báo cáo\n3Khía Online',
  screenName      : 'BaoCao3Khia'
};

const menuQuetMaThietBi = {
  GradientColors  : GradientColors.menuQuetMaThietBi,
  iconName        : 'barcode-scan',
  title           : 'Quét mã\nthiết bị',
  screenName      : 'QuetMaThietBi'
};

const menuDiemDanh = {
  GradientColors  : GradientColors.menuDatHang,
  iconName        : 'calendar-check',
  title           : 'Điểm danh',
  screenName      : 'DiemDanh'
};

const dsMenuNVBH = [
  menuKpiNVBH, menuQuayThuong, menuBaoCao3Khia, menuQuetMaThietBi, menuDiemDanh, menuDatHang, menuKiemTraGoi, menuChamSocDBL, menuLichChamSoc // , menuDongBo // , menuLichSuChamSoc, 
];

const dsMenuTNBHAndCVQL = [
  menuKpiTNBH, menuQuayThuong, menuBaoCao3Khia, menuQuetMaThietBi, menuDiemDanh, menuDatHang, menuKiemTraGoi, menuChamSocDBL, menuLichChamSoc // , menuDongBo // , menuLichSuChamSoc, 
];

const dsMenuGSKPP = [
  menuKpiGSKPP, menuQuayThuong, menuBaoCao3Khia, menuQuetMaThietBi, menuDiemDanh, menuDatHang, menuKiemTraGoi, menuChamSocDBL, menuLichChamSoc // , menuDongBo // , menuLichSuChamSoc, 
]

const dsMenuGDV = [
  menuKpiGDV, menuQuetMaThietBi
]

// ===============================================================================
// ## Tien ich ## ----------------------------------------------------------------
// ===============================================================================

/**
 * Hàm lấy danh sách menu hiển thị lên trang chủ theo loại nhân viên
 * @param {String} loaiNvText Loại nhân viên (EX: BHK || BHTT)
 */
export const getMenuListByStaffType = (loaiNvText) => {
  printLog('getMenuListByStaffType', { loaiNvText });

  let dsMenu = [];

  loaiNvText = loaiNvText.trim();

  switch (loaiNvText) {
    case loaiNhanVien.phanLoaiNVBHK   : dsMenu = dsMenuNVBH; break;
    case loaiNhanVien.phanLoaiNVBHTT  : dsMenu = dsMenuNVBH; break;
    case loaiNhanVien.phanLoaiTNBHK   : dsMenu = dsMenuTNBHAndCVQL; break;
    case loaiNhanVien.phanLoaiTNBHTT  : dsMenu = dsMenuTNBHAndCVQL; break;
    case loaiNhanVien.phanLoaiQLKV    : dsMenu = dsMenuTNBHAndCVQL; break;
    case loaiNhanVien.phanLoaiGSKPP   : dsMenu = dsMenuGSKPP; break;
    case loaiNhanVien.phanLoaiGDV     : dsMenu = dsMenuGDV; break;
    default: break;
  }

  return dsMenu;
}

const getMenuListByEz = async (ez, options = { online: false }, callback) => {
  if (options.online) {
    getMenuListByEzOnline(ez, callback);
  } else {
    let dsMenu = await MenuStorage.getMenuAsync();

    if (dsMenu) callback(dsMenu);
    else getMenuListByEzOnline(ez, callback);
  }
}

const getMenuListByEzOnline = async (ez, callback) => {
  printLog('getMenuListByEz', { ez });

  let dsMenu = [];
  let lat, lng;

  lat = lng = 'toado';

  DeviceInfo.getImeis(imeis => {
    ApiAppTools.MNG_LoadMenu(lat, lng, ez, imeis,
      reS => {
        if (typeof reS.result === 'string') {
          callback('Có lỗi trong quá trình tải danh sách Menu. Vui lòng khởi động lại ứng dụng.\n' + reS.result);
        } else if (!reS.result) {
          callback('Có lỗi trong quá trình tải danh sách Menu. Vui lòng khởi động lại ứng dụng.\n' + JSON.stringify(reS));
        } else {
          reS.result.map((value, index) => {
            dsMenu.push({
              key           : index + 1 + '',
              GradientColors: value.color1, // Colors.createMenuGradientColor(value.color1, value.color2),
              iconName      : value.iconname,
              title         : value.tenmenu.replace('\\n', '\n'),
              screenName    : value.routename
            });
          });
          MenuStorage.saveMenuAsync(dsMenu);
          callback(dsMenu);
        }
      },
      reE => {
        LogUtil.error('getMenuListByEz', reE);
        callback('Có lỗi trong quá trình tải danh sách Menu. Vui lòng khởi động lại ứng dụng');
      }
    );
  });
}

export default {
  getMenuListByEz,
  getMenuListByStaffType,
  getMenuListByEzOnline
}