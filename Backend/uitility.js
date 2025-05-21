const bcrypt = require('bcryptjs');

function hashpassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10)
      .then(salt => {
        return bcrypt.hash(password, salt);
      })
      .then(hash => {
        resolve(hash);
      })
      .catch(err => reject(err));
  });
}

module.exports = { hashpassword };


const findIndex = function (arr,start,end,target) {

    if(start > end){
        return -1;
     }
//      let start =0;  let end = arr.length;
    let mid = Math.floor((start+end)/2);

    if(arr[mid]==target){
        return mid;
    }else if(mid > arr.indexOf(target)){
        return findIndex(arr,start,mid-1,target);
    }else {
        return findIndex(arr,mid+1,end,target);
    }
}
module.exports = {hashpassword,findIndex};

