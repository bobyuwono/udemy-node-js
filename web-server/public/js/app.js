console.log('client side javascript is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // providing loading message
    messageOne.textContent = "Loading.. please wait"
    messageTwo.textContent = ""

    const location = search.value
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent =data.error
            }
            else { 
                console.log(data.location)
                console.log(data.forecastData)
                messageOne.textContent = data.location
                messageTwo.textContent = "Today's temperature is "+data.forecastData.temperature +". It will be "+ data.forecastData.summary 
            } 
        }))
    })

    console.log(location)
})


