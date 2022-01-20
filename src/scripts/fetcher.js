export const fetcher = (ENDPOINT,cbFunction) =>{
    fetch(ENDPOINT,{
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "Application/json"
        }
    })
    .then(response => response.json())
    .then(data => data.forEach((el,index) =>{
        cbFunction(el,index);
    }))
}