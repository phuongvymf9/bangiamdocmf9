import { captureError, captureWarning } from "./SentryUtil";

export const printLog = (funcName, logText) => {
  if (__DEV__) {
    console.log(funcName, logText);
  }
}

export const printWarn = (funcName, logText) => {
  logText = typeof logText === 'object' ? JSON.stringify(logText) : logText;
  
  if (__DEV__) {
    console.log(funcName + ' WARNING', logText);
  } else {
    captureWarning(logText);
  }
}

export const printError = (funcName, logText) => {
  logText = typeof logText === 'object' ? JSON.stringify(logText) : logText;

  if (__DEV__) {
    console.log(funcName + ' ERROR', logText);
  } else {
    captureError(logText);
  }
}

export default {
  log   : printLog,
  warn  : printWarn,
  error : printError
}