import 'regenerator-runtime/runtime'

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formUrl = document.getElementById('url').value
  if (Client.checkForURL(formUrl)) {
    document.getElementById('valid').style.display = 'none';
    document.getElementById('result2').style.display = 'block';
  }
  
  postData("http://localhost:8081/addAPIdata", {url:formUrl})
  .then(function (data) {
    updateUI(data); 
  })
  .catch(function(errorCode){
    //return an error if the zip code not found in the API
      if (errorCode.cod != 200){
      return alert("This submission is faild")
    }
  })
};

//Function to POST API data to the server
const postData = async ( url = "", data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    cache: "no-cache",   
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(data)        
  });
    try {
      const newData = await response.json();
      console.log('Data posted')
      return newData;
    }catch(error) {
    console.log("error", error);
    }
  };

//Function to Update the UI
function updateUI(newdata) {
  document.getElementById("polarity").innerHTML = `Polarity: ${newdata.score_tag}`
  document.getElementById("subjectivity").innerHTML = `Subjectivity: ${newdata.subjectivity}`
  document.getElementById("confidence").innerHTML = `Confidence: ${newdata.confidence}`
  document.getElementById("agreement").innerHTML = `Agreement: ${newdata.agreement}`
  document.getElementById("irony").innerHTML = `Irony: ${newdata.irony}`
}

export { handleSubmit };
    

