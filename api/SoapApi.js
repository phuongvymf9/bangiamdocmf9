import { printLog, printWarn, printError } from "../utils/LogUtil";
import { respXml2Json, toMonthForCallApi } from "../utils/Utils";

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

  MNG_LoadMenu: function (lat, lng, ez, imeis, handleSuccess, handleError) {
    let data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <MNG_LoadMenu xmlns="WSDBL">
          <lat>${lat}</lat>
          <lng>${lng}</lng>
          <ez>${ez}</ez>
          <imeis>${imeis}</imeis>
        </MNG_LoadMenu>
      </soap:Body>
    </soap:Envelope>`;

    printLog('exec SOAP MNG_LoadMenu', { lat, lng, ez, imeis });

    execSOAPWebService(data, handleSuccess, handleError, { test: true });
  },
}