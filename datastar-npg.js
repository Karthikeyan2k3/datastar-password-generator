"use strict";
let cryptoObject = null;

//define character_set
const CHAR_SETS = {
    numbers: "0123456789",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    ascii: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
    space: " ",
};

// Initialize character_set
function initCharSet(numbers, uppercase, lowercase, ascii, space, customcheck, customchar) {
    let rawCharset = "";
    if (numbers)
        rawCharset += CHAR_SETS.numbers;
    if (uppercase)
        rawCharset += CHAR_SETS.uppercase;
    if (lowercase)
        rawCharset += CHAR_SETS.lowercase;
    if (ascii)
        rawCharset += CHAR_SETS.ascii;
    if (space)
        rawCharset += CHAR_SETS.space;
    if (customcheck && customchar) {
        rawCharset += customchar.replace(/ /g, "\u00A0");
    }

    // Removes duplicate entries
const seen = new Set();
let charset = "";
for (const ch of rawCharset) {
    const cc = ch.codePointAt(0);
    if (cc >= 0xD800 && cc < 0xE000) {
        continue;
    }
    if (!seen.has(ch)) {
        seen.add(ch);
        charset += ch;
    }
}

return charset;
}

function initCrypto() {
    if ("crypto" in window) {
        cryptoObject = crypto;
    } else if ("msCrypto" in window) {
        cryptoObject = msCrypto;
    } else {
        return;
    }

    if (!("getRandomValues" in cryptoObject) || !("Uint32Array" in window) || typeof Uint32Array != "function") {
        cryptoObject = null;
    }
}

//  Calculate length 
function calcLength(type, len, entropy, charset) {
    if (type === "length") {
        return parseInt(len, 10);
    }
    if (type === "entropy") {
        if (!charset || charset.length < 2) {
            return 0;
        }
        return Math.ceil(parseFloat(entropy) * Math.log(2) / Math.log(charset.length));
    }
    throw new Error("Assertion error: unknown type");
}

// Calculate entropy for display 
function calcEntropy(charset, wholelen) {
    if (!charset || charset.length === 0 || wholelen <= 0) return "0";
    const entropy = Math.log(charset.length) * wholelen / Math.log(2);
    if (!isFinite(entropy) || isNaN(entropy)) return "0";
    if (entropy < 70) return entropy.toFixed(2);
    if (entropy < 200) return entropy.toFixed(1);
    return entropy.toFixed(0);
}
    
function generatePassword(charset, wholelen, _refresh) {
    if (wholelen < 0 || wholelen > 10000) {
        return "";
    }
    let result = "";
    for (let i = 0; wholelen > i; i++)
        result += charset[randomInt(charset.length)];
    return result;
}

function copy() {
    const text = document.getElementById("password").textContent;
    return navigator.clipboard.writeText(text);
}

// Returns a random integer in the range [0, n) using a variety of methods.
function randomInt(n) {
    let x = randomIntMathRandom(n);
    x = (x + randomIntBrowserCrypto(n)) % n;
    return x;
}

// Not secure or high quality, but always available.
function randomIntMathRandom(n) {
    const x = Math.floor(Math.random() * n);
    if (0 > x || x >= n)
        throw new Error("Arithmetic exception");
    return x;
}

// Uses a secure, unpredictable random number generator if available; otherwise returns 0.
function randomIntBrowserCrypto(n) {
    if (cryptoObject === null)
        return 0;
    // Generate an unbiased sample
    const x = new Uint32Array(1);
    do cryptoObject.getRandomValues(x);
    while (x[0] - x[0] % n > 4294967296 - n);
    return x[0] % n;
}

initCrypto();
