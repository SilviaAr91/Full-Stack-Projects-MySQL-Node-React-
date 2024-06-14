findMax = (array) => {
  let res = 0;
  for(let i = 0; i < array.length; i++){
    if (array[i] > res) {
      res = array[i]
    }
  }
  return res;
}