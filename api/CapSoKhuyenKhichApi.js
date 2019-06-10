import ApiUtils from "./ApiUtils";
import { printLog } from "../utils/LogUtil";

function MNG_CSKK_GetList( userid, handleSuccess, handleError) {
    let op = 'MNG_CSKK_GetList';
  
    let data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <MNG_CSKK_GetList xmlns="WSDBL">
          <userid>${userid}</userid>
        </MNG_CSKK_GetList>
      </soap:Body>
    </soap:Envelope>`;
  
    printLog('exec SOAP MNG_CSKK_GetList', { userid });
  
    ApiUtils.execSOAPWebServiceWithOperation(op, data, handleSuccess, handleError, { test: true });
  }

export default {
    MNG_CSKK_GetList
 }