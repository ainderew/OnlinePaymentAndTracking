export const fetcherGET = (ENDPOINT,cbFunction) =>{
    fetch(ENDPOINT,{
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "Application/json"
        }
    })
    .then(response => response.json())
    .then(data => cbFunction(data))
}

export const fetcherPOST = (endpoint,categoryID,cb) =>{
    
    const objData = {categoryID: categoryID.toString()};
    fetch(endpoint,{
        method: "POST",
        mode: "cors",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(objData)
    })
    .then(response => response.json())
    .then(parsedResponse => cb(parsedResponse))
}