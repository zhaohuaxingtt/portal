/*
 * @Author: YoHo
 * @Date: 2022-12-28 21:34:09
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\supplierManagement\NTier\supplyChainMap\components\worker.js
 */
// worker.js
onmessage = function(e) {
    console.log('e=====>',e);
    console.log('Worker: Message received from main script');
    const result = e.data[0] + e.data[1];
    if (isNaN(result)) {
      postMessage('Please write two numbers');
    } else {
      const workerResult = 'Result: ' + result;
      console.log('Worker: Posting message back to main script');
      postMessage(workerResult);
    }
  }