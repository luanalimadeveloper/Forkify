//import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

let timeoutID;
const timeout = function (s) {
  return new Promise(function (_, reject) {
    timeoutID = setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(10)]);
    clearTimeout(timeoutID);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
