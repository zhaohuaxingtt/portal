import JSEncrypt from 'jsencrypt'
const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDtHWBZlZFuWCQmAqWGH5NaYimrmWHI8/BgHcorxAlq+5bCJyVe8VD9Zm4CRksP/yYPAqWB03B0wm1F1ePObs3ddhpk/MJ8GzbXJY0inj2J0n90QEzhebb/GpHt777EmfY/PuA4fGw8WtW6LHwkr+tnluKlR9f5ZgKByf3mBEge0wIDAQAB`

const privateKey = `MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAO0dYFmVkW5YJCYCpYYfk1piKauZYcjz8GAdyivECWr7lsInJV7xUP1mbgJGSw//Jg8CpYHTcHTCbUXV485uzd12GmT8wnwbNtcljSKePYnSf3RATOF5tv8ake3vvsSZ9j8+4Dh8bDxa1bosfCSv62eW4qVH1/lmAoHJ/eYESB7TAgMBAAECgYAvY5GgFd5s+TywRBMkzSa8B6ZgX1VFvksqSonfWVywfvvQbdZwNTaEjnYqCjZySgInOdYuLj3pd/oy3N6coVSPLdIUoYzMrWiNEoHHpHYWcHK7wx57Ct6K9jAci+N6Xi+TQzu8nB11B6QDlWjtApyOKLpVRiX2sIDS5VwqFjgKwQJBAPcrkikWz1spXcOTB1BgaSHL9Q09oN2UzpDi2n/T6WE4C6hb2lC4UKeLmk9A/4+Fxa3DtsrMki29D8Mnc4L5g/ECQQD1ldiUjS4iQvqX54k4aJ9Aw4UG2BfkETBT/g/1SrMpObKJSP5JNuOCVBuJVYXEEzc/if+3u8K4YOX2wEFIi8MDAkBq+E1iQP/umSF+QcR5kbAOM2HToCddnkgjxjn/9mtbatEIxO/f3VTyneVjhWLU73UU9c3HSO++ocMPl6RTO79RAkAHM8fQQ3uw4Yn73nx1vQu+mH1UQA4jUCW8sNzC8tfiQ6Dqycs7VnLBpbnRA0MTBwU9xcxMFSOWyLC11dmUSRUFAkANs48gStbs23lMzPqq/eXBbIFTCKqLtluGZFq/gAHxPcx/PsKjHNNBqXKCzIx0X8MgzwZ4fTPZuuLCOoZfx62H`

/**
 * Rsa加密
 * @param {String} str
 * @returns String
 */
export function encryptRsa(str) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(str)
}

/**
 * 字符串转base64
 * @param {String} str
 * @returns String
 */
export function encryptBase64(str) {
  return window.btoa(str)
}

/**
 * 密码加密
 * @param {String} str 原始密码
 * @returns 加密后的密码
 */
export function encryptPwd(str) {
  const res = encryptBase64(encryptRsa(str))

  const decrypt = new JSEncrypt()
  decrypt.setPrivateKey(privateKey)
  let getWord = decrypt.decrypt(window.atob(res))
  console.log('getWord', getWord)
  return res
}
