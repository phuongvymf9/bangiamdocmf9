import { respXml2Json } from "../utils/Utils";
import { printWarn, printError } from "../utils/LogUtil";

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
function execSOAPWebService (data, handleSuccess, handleError, options = { timeout: 0, test: false }) {
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
      // printWarn('execSOAPWebService', request);
    }
  };

  // Xu ly khi timeout
  request.ontimeout = (error) => {
    handleError('Timeout!!');
    // printError('execSOAPWebService timeout', JSON.stringify({ error }));
  }

  request.open('POST', url);
  request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
  if (options.timeout) request.timeout = options.timeout;
  request.send(data);
}

/**
 * Hàm thực thi gọi Webservice qua giao thức SOAP (ASP.NET)
 * @param {String} op Function name of WS
 * @param {String} data Soap Body
 * @param {String} url Url hàm thực thi
 * @param {Function} handleSuccess Hàm xử lý kết quả trả về khi thành công
 * @param {Function} handleError Hàm xử lý lỗi
 * @param {Number} timeout Thời gian kết thúc request
 */
function execSOAPWebServiceWithOperation (op, data, handleSuccess, handleError, options = { timeout: 0, test: false }) {
  let url = (options.test ? TestApiUrl : ApiUrl) + `?op=${op}`;
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
      // printWarn('execSOAPWebService', request);
    }
  };

  // Xu ly khi timeout
  request.ontimeout = (error) => {
    handleError('Timeout!!');
    // printError('execSOAPWebService timeout', JSON.stringify({ error }));
  }

  request.open('POST', url);
  request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
  if (options.timeout) request.timeout = options.timeout;
  request.send(data);
}

/**
 * Hàm thực thi gọi Webservice qua giao thức SOAP (ASP.NET). Tham số truyền vào theo định dạng x-www-form-urlencoded
 * @param {String} data Soap Body
 * @param {String} url Url hàm thực thi
 * @param {Function} handleSuccess Hàm xử lý kết quả trả về khi thành công
 * @param {Function} handleError Hàm xử lý lỗi
 * @param {Number} timeout Thời gian kết thúc request
 */
const execSOAPWebServiceUrlEncoded = (funcName, data, handleSuccess, handleError, options = { timeout: 20000, test: false }) => {
  let url     = options.test ? TestApiUrl : ApiUrl;
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
      printWarn('execSOAPWebServiceUrlEncoded', request);
    }
  };

  // Xu ly khi timeout
  request.ontimeout = (error) => {
    handleError('Timeout!!');
    printError('execSOAPWebServiceUrlEncoded timeout', JSON.stringify({ error }));
  }

  request.open('POST', url + '?op=' + funcName);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  if (options.timeout) request.timeout = options.timeout;
  request.send(data);
}

export default {
  execSOAPWebService,
  execSOAPWebServiceUrlEncoded,
  execSOAPWebServiceWithOperation
}