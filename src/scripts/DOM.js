export const getColor = (counter) => {
  const P_colors = ["#D3A885", "#EB8683", "#809DB1", "#46AABD", "#75B6FD"];

  const numberOfOptions = P_colors.length;
  let result = counter;

  while (result > numberOfOptions - 1) {
    result = result - numberOfOptions;
  }

  return P_colors[result];
};

export const findRepeat = (orderArray, item) => {
  let index = orderArray.findIndex(el => el.name === item.name);
  return index;

}

export const getOrderPriceTotal = (dataSet) => {
  let sum = 0;
  dataSet.forEach(el => {
    sum = sum + (el.price * el.orderQty)
  })
  return sum;
}

export const toCurrencyString = (number) => {
  let formatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "PHP"
  })

  return formatter.format(number)

}


export const getDateAndTime = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const d = new Date();
  const monthName = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours();
  const min =  d.getMinutes();

  return `${monthName} ${day}, ${year} ${hour}:${min}`;
  
}

export const mergeSortTopDown = (array) => {
  if (array.length <= 1) {
      return array;
  }

  const middle = Math.floor(array.length / 2)
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right))
}

const mergeTopDown = (left, right) => {
  let temp = []

  while (left.length && right.length) {
      if (left[0][0].orderID<right[0][0].orderID) {
          temp.push(left.shift());
      } else {
          temp.push(right.shift());
      }
  }
  return temp.concat(left.slice()).concat(right.slice())
}