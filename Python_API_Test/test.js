const url = "https://3fdpsseodc.execute-api.ap-south-1.amazonaws.com/dev/field_data";
const field_data = {
    "queryStringParameters": {
        "field": "Blockchain Technology"
    }
};

const headers = {
    "Content-Type": "application/json",
};

fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(field_data),
})
.then(response => response.json())
.then(data => {
    console.log("API Response:", data);
})
.catch(error => {
    console.log("Error", error);
});
