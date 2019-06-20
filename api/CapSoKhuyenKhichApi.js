import ApiUtils from "./ApiUtils";
import { printLog } from "../utils/LogUtil";

function MNG_CSKK_GetList( userid, daduyet, handleSuccess, handleError) {
    let op = 'MNG_CSKK_GetList';
  
    let data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <MNG_CSKK_GetList xmlns="WSDBL">
          <userid>${userid}</userid>
          <daduyet>${daduyet}</daduyet>
        </MNG_CSKK_GetList>
      </soap:Body>
    </soap:Envelope>`;
  
    printLog('exec SOAP MNG_CSKK_GetList', { userid, daduyet });
  
    ApiUtils.execSOAPWebServiceWithOperation(op, data, handleSuccess, handleError, { test: true });
}

function MNG_CSKK_GetListGoiCuoc( userid, loaikh, handleSuccess, handleError) {
    let op = 'MNG_CSKK_GetListGoiCuoc';
  
    let data = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <MNG_CSKK_GetListGoiCuoc xmlns="WSDBL">
          <userid>${userid}</userid>
          <loaikh>${loaikh}</loaikh>
        </MNG_CSKK_GetListGoiCuoc>
      </soap:Body>
    </soap:Envelope>`;
  
    printLog('exec SOAP MNG_CSKK_GetListGoiCuoc', { userid, loaikh });
  
    ApiUtils.execSOAPWebServiceWithOperation(op, data, handleSuccess, handleError, { test: true });
}

function MNG_KPS_GetList( userid, daduyet, handleSuccess, handleError) {
  let op = 'MNG_KPS_GetList';

  let data = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <MNG_KPS_GetList xmlns="WSDBL">
        <userid>${userid}</userid>
        <daduyet>${daduyet}</daduyet>
      </MNG_KPS_GetList>
    </soap:Body>
  </soap:Envelope>`;

  printLog('exec SOAP MNG_KPS_GetList', { userid, daduyet });

  ApiUtils.execSOAPWebServiceWithOperation(op, data, handleSuccess, handleError, { test: true });
}

function MNG_CSKK_Duyet( userid, idyeucau, checkduyet, lydo, goi_camket, magoi_khac, 
                         tengoi_khac, muccuoc_khac, tg_camketkhac, capquanly, loaikh, handleSuccess, handleError) {
  let op = 'MNG_CSKK_Duyet';

  let data = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <MNG_CSKK_Duyet xmlns="WSDBL">
        <userid>${userid}</userid>
        <idyeucau>${idyeucau}</idyeucau>
        <checkduyet>${checkduyet}</checkduyet>
        <lydo>${lydo}</lydo>
        <goi_camket>${goi_camket}</goi_camket>
        <magoi_khac>${magoi_khac}</magoi_khac>
        <tengoi_khac>${tengoi_khac}</tengoi_khac>
        <muccuoc_khac>${muccuoc_khac}</muccuoc_khac>
        <tg_camketkhac>${tg_camketkhac}</tg_camketkhac>
        <capquanly>${capquanly}</capquanly>
        <loaikh>${loaikh}</loaikh>
      </MNG_CSKK_Duyet>
    </soap:Body>
  </soap:Envelope>`;

  printLog('exec SOAP MNG_CSKK_Duyet', { userid, idyeucau, checkduyet, lydo, goi_camket, magoi_khac, 
                                         tengoi_khac, muccuoc_khac, tg_camketkhac, capquanly, loaikh });

  ApiUtils.execSOAPWebServiceWithOperation(op, data, handleSuccess, handleError, { test: true });
}


export default {
    MNG_CSKK_GetList,
    MNG_CSKK_GetListGoiCuoc,
    MNG_KPS_GetList,
    MNG_CSKK_Duyet
}