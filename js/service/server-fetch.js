import {siteurl} from './site-properties.js';

export const submitRequest = (type, url, data = null, isAsync = true) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(type, `${siteurl}${url}`, isAsync, data);
    if (["post", "patch", "put"].indexOf(type.toLowerCase()) !== -1) {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    } else {
      xhr.send();
    }

    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(this.status);
        }
      }
    };
  });
};
