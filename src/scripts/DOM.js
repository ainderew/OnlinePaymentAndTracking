export const getColor = (counter) => {
    const P_colors = ["#D3A885", "#EB8683", "#809DB1", "#46AABD", "#75B6FD"];
  
    const numberOfOptions = P_colors.length;
    let result = counter;
  
    while (result > numberOfOptions - 1) {
      result = result - numberOfOptions;
    }
  
    return P_colors[result];
  };
  

export const createCategoryContainer = (data,index) =>{
    let color = getColor(index)
    const parentNode = document.querySelector(".center_left_categories");
    
    let element = document.createElement("div");
    element.classList.add("container_category")
    element.innerHTML = `<span class="header_container">${data.name}</span>`;
    element.style.backgroundColor = color;

    parentNode.appendChild(element);
}

