import { printLog, printWarn, printError } from "../utils/LogUtil";
import { respXml2Json, toMonthForCallApi } from "../utils/Utils";
import { getLuongAsync }                   from "../utils/StorageUtils";

const ApiUrl      = 'https://staffmf9.mobifone9.vn/CSDBL.asmx';
const TestApiUrl  = 'http://10.32.10.81:9081/CSDBL.asmx';

// ---------------------------------------------------------------------------------------------------------------------------
// ## API ## -----------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------

/**
 * Hàm thực thi gọi Webservice qua giao thức SOAP (ASP.NET)
 * @param {String} data Soap Body
 * @param {String} url Url hàm thực thi
 * @param {Function} handleSuccess Hàm xử lý kết quả trả về khi thành công
 * @param {Function} handleError Hàm xử lý lỗi
 * @param {Number} timeout Thời gian kết thúc request
 */
const execSOAPWebService = (data, handleSuccess, handleError, options = { timeout: 20000, test: false }) => {
  let url = options.test ? TestApiUrl : ApiUrl;
  let request = new XMLHttpRequest();

  // Xu ly gui request
  request.onreadystatechange = (e) => {
    if (request.readyState !== 4) return;
    if (request.status === 200) {
      let { responseText } = request;
      let result;

      try {
        result = respXml2Json(responseText);
      } catch (error) {
        result = JSON.stringify(error);
        printWarn('parse JSON error', responseText);
      }

      handleSuccess(result);

    } else {
      handleError(request._response);
      printWarn('execSOAPWebService', request);
    }
  };

  // Xu ly khi timeout
  request.ontimeout = (error) => {
    handleError('Timeout!!');
    printError('execSOAPWebService timeout', JSON.stringify({ error }));
  }

  request.open('POST', url);
  request.setRequestHeader("Content-Type", "text/xml");
  // request.timeout = timeout;
  request.send(data);
}

// ---------------------------------------------------------------------------------------------------------------------------
// ## HÀM THỰC THI ## --------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------

export const Login = (lat, lng, ez, handleSuccess, handleError) => {
  let data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Login xmlns="WSDBL">
          <lng>${lat}</lng>
          <lat>${lng}</lat>
          <ez>${ez}</ez>
        </Login>
      </soap:Body>
    </soap:Envelope>`;

  printLog('exec Login', { lat, lng, ez, handleSuccess, handleError });

  execSOAPWebService(data, handleSuccess, handleError);
}

export const CheckOTP = (lat, lng, imei, ez, otp, month, handleSuccess, handleError) => {
  let data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CheckOTP xmlns="WSDBL">
          <lat>${lat}</lat>
          <lng>${lng}</lng>
          <imei>${imei}</imei>
          <ez>${ez}</ez>
          <otp>${otp}</otp>
          <month>${month}</month>
        </CheckOTP>
      </soap:Body>
    </soap:Envelope>`;

  printLog('exec CheckOTPUrl', { lat, lng, imei, ez, otp, month, handleSuccess, handleError });

  execSOAPWebService(data, handleSuccess, handleError);
}

export const GetReportLuong = (lat, lng, imei, ez, month, reportType, handleSuccess, handleError) => {
  let monthApi = toMonthForCallApi(month);
  let data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetReportLuong xmlns="WSDBL">
          <lat>${lat}</lat>
          <lng>${lng}</lng>
          <imei>${imei}</imei>
          <ez>${ez}</ez>
          <month>${monthApi}</month>
          <reportType>${reportType}</reportType>
        </GetReportLuong>
      </soap:Body>
    </soap:Envelope>`;

  printLog('exec GetReportLuong', { lat, lng, imei, ez, monthApi, reportType, handleSuccess, handleError });

  getLuongAsync(reportType, ez, month).then(result => {
    if (result) handleSuccess(JSON.parse(result));
    else execSOAPWebService(data, handleSuccess, handleError);

  }).catch(error => {
    execSOAPWebService(data, handleSuccess, handleError);
  });
}

export const GetNhanVienCuaTNBH = (lat, lng, imei, ez, month, handleSuccess, handleError) => {
  let data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetNhanVienCuaTNBH xmlns="WSDBL">
          <lat>${lat}</lat>
          <lng>${lng}</lng>
          <imei>${imei}</imei>
          <ez>${ez}</ez>
          <month>${month}</month>
        </GetNhanVienCuaTNBH>
      </soap:Body>
    </soap:Envelope>`;

  printLog('exec GetNhanVienCuaTNBH', { lat, lng, imei, ez, month, handleSuccess, handleError });

  execSOAPWebService(data, handleSuccess, handleError);
}

// ============================================================================================================
// ## QUAY THUONG ## ==========================================================================================
// ============================================================================================================

export const ApiQuayThuong = {
  GetListDiemBan: function (lat, lng, imei, ez, mshuyen, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetListDiemBan xmlns="WSDBL">
            <lat>${lat}</lat>
            <lng>${lng}</lng>
            <imei>${imei}</imei>
            <ez>${ez}</ez>
            <mshuyen>${mshuyen}</mshuyen>
          </GetListDiemBan>
        </soap:Body>
      </soap:Envelope>`;
  
    printLog('exec SOAP GetListDiemBan', { lat, lng, ez, mshuyen });
  
    execSOAPWebService(data, handleSuccess, handleError);
  },

  GetDanhMucHuyen: function (lat, lng, imei, ez, month, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetDanhMucHuyen xmlns="WSDBL">
            <lat>${lat}</lat>
            <lng>${lng}</lng>
            <imei>${imei}</imei>
            <ez>${ez}</ez>
            <month>${month}</month>
          </GetDanhMucHuyen>
        </soap:Body>
      </soap:Envelope>`;
    
    printLog('exec SOAP GetDanhMucHuyen', { lat, lng, imei, ez, month });

    execSOAPWebService(data, handleSuccess, handleError);
  },

  GetGiaiThuong: function (lat, lng, imei, accountDB, mshuyen, groupid, ezNvQuayThuong, anhDb1, anhDb2, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetGiaiThuong_v03 xmlns="WSDBL">
            <lat>${lat}</lat>
            <lng>${lng}</lng>
            <imei>${imei}</imei>
            <accountDB>${accountDB}</accountDB>
            <mshuyen>${Number(mshuyen)}</mshuyen>
            <groupid>${Number(groupid)}</groupid>
            <ezNvQuayThuong>${ezNvQuayThuong}</ezNvQuayThuong>
            <anhDb1>${anhDb1}</anhDb1>
            <anhDb2>${anhDb2}</anhDb2>
          </GetGiaiThuong_v03>
        </soap:Body>
      </soap:Envelope>`;

    printLog('exec SOAP GetGiaiThuong', { lat, lng, imei, accountDB, mshuyen, groupid, ezNvQuayThuong, anhDb1, anhDb2 });

    execSOAPWebService(data, handleSuccess, handleError);  
  },

  UploadImageDiemBan: function (lat, lng, maDB, fileName, base64, platform, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <UploadImageDiemBan xmlns="WSDBL">
            <lat>${lat}</lat>
            <lng>${lng}</lng>
            <maDB>${maDB}</maDB>
            <fileName>${fileName}</fileName>
            <base64>${base64}</base64>
            <platform>${platform}</platform>
          </UploadImageDiemBan>
        </soap:Body>
      </soap:Envelope>`;

    printLog('exec SOAP UploadImageDiemBan', { lat, lng, maDB, fileName, base64: typeof base64 });

    execSOAPWebService(data, handleSuccess, handleError); 
  }
}

// ============================================================================================================
// ## Bao Cao 3 Khia ## =======================================================================================
// ============================================================================================================

export const ApiBaoCao = {
  GetKetQuaThanTai3Khia: function (lat, lng, mshuyen, ezDiemBan, thangnam, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetKetQuaThanTai3Khia xmlns="WSDBL">
            <lat>${lat}</lat>
            <lng>${lng}</lng>
            <mshuyen>${mshuyen}</mshuyen>
            <ezDiemBan>${ezDiemBan}</ezDiemBan>
            <thangnam>${thangnam}</thangnam>
          </GetKetQuaThanTai3Khia>
        </soap:Body>
      </soap:Envelope>`;

    printLog('exec SOAP GetKetQuaThanTai3Khia', { lat, lng, mshuyen, ezDiemBan, thangnam });

    execSOAPWebService(data, handleSuccess, handleError); 
  }
}

// ============================================================================================================
// ## Quet ma thiet bi ## =====================================================================================
// ============================================================================================================

export const ApiQuetMaThietBi = {
  SaveBarCodeData: function (lat, lng, ez, ngayquet, imeithietbi, imeiquet, phanLoaiNv, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <SaveBarCodeData_v02 xmlns="WSDBL">
            <lat>${lat}</lat>
            <lng>${lng}</lng>
            <ez>${ez}</ez>
            <ngayquet>${ngayquet}</ngayquet>
            <imeithietbi>${imeithietbi}</imeithietbi>
            <imeiquet>${imeiquet}</imeiquet>
            <phanLoaiNv>${phanLoaiNv}</phanLoaiNv>
          </SaveBarCodeData_v02>
        </soap:Body>
      </soap:Envelope>`;

    printLog('exec SOAP SaveBarCodeData', { lat, lng, ez, ngayquet, imeithietbi, imeiquet, phanLoaiNv, imeiquet });

    execSOAPWebService(data, handleSuccess, handleError, { test: false });
  },

  CheckQRCodeData: function (lat, lng, ez, imeis, qrData, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <CheckQRCodeData xmlns="WSDBL">
            <lat>${lat}</lat>
            <lng>${lng}</lng>
            <ez>${ez}</ez>
            <imeis>${imeis}</imeis>
            <qrData>${qrData}</qrData>
          </CheckQRCodeData>
        </soap:Body>
      </soap:Envelope>`;

    printLog('exec SOAP CheckQRCodeData', { lat, lng, ez, imeis, qrData });

    execSOAPWebService(data, handleSuccess, handleError, { test: false });
  }
}

// ============================================================================================================
// ## Cac cong cu cho ung dung ## =============================================================================
// ============================================================================================================

export const ApiAppTools = {
  CheckAppVersion: function (lat, lng, ez, versionCode, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <CheckAppVersion xmlns="WSDBL">
            <lat>${lat}</lat>
            <lng>${lng}</lng>
            <ez>${ez}</ez>
            <versionCode>${versionCode}</versionCode>
          </CheckAppVersion>
        </soap:Body>
      </soap:Envelope>`;

    printLog('exec SOAP CheckAppVersion', { lat, lng, ez, versionCode });

    execSOAPWebService(data, handleSuccess, handleError, { test: false });
  },

  LoadMenu: function (lat, lng, ez, imeis, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <LoadMenu xmlns="WSDBL">
            <lat>${lat}</lat>
            <lng>${lng}</lng>
            <ez>${ez}</ez>
            <imeis>${imeis}</imeis>
          </LoadMenu>
        </soap:Body>
      </soap:Envelope>`;

    printLog('exec SOAP LoadMenu', { lat, lng, ez, imeis });

    execSOAPWebService(data, handleSuccess, handleError, { test: false });
  },
}