const CryptoJS = require('crypto-js');  //引用AES源码js
const keystr = CryptoJS.enc.Utf8.parse("sitiits@sari@cai");  //十六位十六进制数作为密钥
const ivstr = CryptoJS.enc.Utf8.parse('kindness@its@tao');   //十六位十六进制数作为密钥偏移量
const key_base64 = CryptoJS.enc.Base64.stringify(keystr);
const iv_base64 = CryptoJS.enc.Base64.stringify(ivstr);
function encrypt(msg, key, iv) {
        return CryptoJS.AES.encrypt(msg, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
}
//解密方法
function Decrypt(word) {
    var key = CryptoJS.enc.Base64.parse(key_base64);
    var iv = CryptoJS.enc.Base64.parse(iv_base64);
    var decrypted = CryptoJS.AES.decrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);

}

//加密方法
function Encrypt(word) {
    let key = CryptoJS.enc.Base64.parse(key_base64);
    let iv = CryptoJS.enc.Base64.parse(iv_base64);
    let encrypted= encrypt(word, key, iv);
    let cipherText = encrypted.ciphertext.toString();
    //java 使用 34439a96e68b129093105b67de81c0fc
    // 拿到字符串类型的密文需要先将其用Hex方法parse一下
   let cipherTextHexStr = CryptoJS.enc.Hex.parse(cipherText);
    // 将密文转为Base64的字符串
   // 只有Base64类型的字符串密文才能对其进行解密
   let cipherTextBase64Str = CryptoJS.enc.Base64.stringify(cipherTextHexStr);
    return cipherTextBase64Str;

}

export default {
    Decrypt ,
    Encrypt
}
