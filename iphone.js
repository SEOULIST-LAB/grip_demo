let clock = setInterval(function() {
    let now = new Date()
    hours = now.getHours()
    minutes = now.getMinutes()
    document.getElementById("clock").innerText = `${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}`
},1000)