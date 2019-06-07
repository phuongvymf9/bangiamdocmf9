export const SolidColors = {
  primary             : '#398FFF',
  primaryLight        : '#8FD2FF',
  secondary           : '#FF9800',
  // Grey
  grey                : '#455A64',
  greyLight           : '#EEEEFF',
  // Red
  primaryRed          : '#FF3636',
  // Green
  primaryGreen        : '#00CC87',

  loginPlacholderText : '#B7D6FF',
  appBarColor         : '#398FFF',
  borderColor         : '#E9E9FA',
  txtSignOutColor     : '#FF3636'
}

const start = [1, 0];
const end   = [0, 0]

export const GradientColors = {
  backgroundColor: {
    colors  : ['#398FFF', '#00CC87'],
    start   : [0.5, 0],
    end     : [0, 1]
  },
  taiKhoanMenu: {
    colors  : ['#6E81FF', '#71B3FF'],
    start   : start,
    end     : end
  },
  taiKhoanMenuOld: {
    colors  : ['#01CCDB', '#00CC87'],
    start   : start,
    end     : end
  },
  menuLogin: {
    colors  : ['#FFF', '#ECEFF1'],
    start   : start,
    end     : end
  },
  menuChamSocDBL: {
    colors  : ['#7EEDFF', '#71B3FF'],
    start   : start,
    end     : end
  },
  menuLichChamSoc: {
    colors  : ['#6E81FF','#B056FF'],
    start   : start,
    end     : end
  },
  menuLichSu: {
    colors  : ['#04befe', '#4481eb'],
    start   : start,
    end     : end
  },
  menuDongBo: {
    colors  : ['#FFEC71', '#FF855E'], 
    start   : start,
    end     : end
  },
  menuDatHang: {
    colors  : ['#ff9a44', '#fc6076'], 
    start   : start,
    end     : end
  },
  menuQuayThuong: {
    colors  : ['#DEFF94', '#6AD179'],
    start   : start,
    end     : end
  },
  menuKiemTraGoi: {
    colors  : ['#f093fb', '#f5576c'],
    start   : start,
    end     : end
  },
  menuBaoCao3Khia: {
    colors  : ['#00f2fe', '#4facfe'], 
    start   : start,
    end     : end
  },
  menuQuetMaThietBi: {
    colors  : ['#48c6ef', '#6f86d6'],
    start   : start,
    end     : end
  }
}

export const ButtonColors = {
  ButtonQuayThuong: {
    colors  : ['#4481eb', '#FF855E'],
    start   : [0.5, 0],
    end     : [0, 1]
  },
  ButtonCuaHang: {
    colors: ['#FF855E', '#ff9a44'], 
    start: [0, 0.5],
    end: [1, 1]
  },
  ButtonChupAnh: {
    colors: ['#4481eb', '#04befe'], 
    start: [0, 0.5],
    end: [1, 1]
  }
}

const createMenuGradientColor = (color1, color2) => {
  return {
    colors: [color1, color2],
    start : start,
    end   : end
  }
}

export default {
  createMenuGradientColor
}