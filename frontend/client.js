const form = document.querySelector("form")
const loading = document.querySelector("#loading")
const tweetsElement = document.querySelector("#tweets")
const API_URL = "http://localhost:5000/tweets"

displayAllTweets()


form.addEventListener("submit", (event) =>{
    event.preventDefault()
    
    const formData = new FormData(form)
    const name = formData.get("name")
    const message = formData.get("message")

    const tweet = {name: name, message: message}

    
    form.style.display = "none"
    loading.style.display = ""

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(tweet),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())
      .then(createdTweet => {
        console.log(createdTweet)
        form.reset()
        form.style.display = ""
        displayAllTweets()
      })  
})


function displayAllTweets(){
    tweetsElement.innerHTML = ""
    fetch(API_URL)
        .then(response => response.json())
        .then(tweets => {
            tweets.reverse()
            tweets.forEach(tweet => {
                const div = document.createElement("div")
                const name = document.createElement("h3")
                const message = document.createElement("p")
                const date = document.createElement("small")
                const br = document.createElement("br")

                div.classList.add("tweet")
                div.classList.add("centered")

                name.textContent = tweet.name
                message.textContent = tweet.message
                date.textContent = new Date(tweet.date)

                div.append(name)
                div.append(message)
                div.append(date)

                tweetsElement.append(div)
                tweetsElement.append(br)
            }) 
        })
        loading.style.display = "none"
}

