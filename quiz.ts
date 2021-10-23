const fn = require('./util.ts');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export const writeDataInLocal = (
    data: string
): Boolean => {
    try {
        fn.FileManager(data);
        return true;
    } catch (error) {
        return false;
    }
}


export const fetchURL = (
  url: string
  ): Promise<string> => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = () => {
      if (200 <= req.status && req.status < 300) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}