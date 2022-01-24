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

