function getWeather(city) {

    const url = `https://wttr.in/${city}?format=j1`;

    fetch(url)
    .then(res => res.json())
    .then(data => {

        const temp = data.current_condition[0].temp_C;
        const desc = data.current_condition[0].weatherDesc[0].value.toLowerCase();

        document.getElementById("cityName").innerText = city;
        document.getElementById("temp").innerText = "Temperature: " + temp + "°C";
        document.getElementById("desc").innerText = desc;

        // 🔥 Dynamic background
        if (desc.includes("sunny") || desc.includes("clear")) {
            document.body.style.background = "linear-gradient(135deg, #f7971e, #ffd200)";
        } 
        else if (desc.includes("cloud")) {
            document.body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
        } 
        else if (desc.includes("rain")) {
            document.body.style.background = "linear-gradient(135deg, #373b44, #4286f4)";
        } 
        else {
            document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
        }

    })
    .catch(() => {
        alert("City not found");
    });
}

// 🔍 Manual search
function searchWeather() {
    const city = document.getElementById("city").value;
    getWeather(city);
}

// ⌨️ Enter key
document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchWeather();
    }
});

// 📍 Auto location
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://wttr.in/${lat},${lon}?format=j1`;

            fetch(url)
            .then(res => res.json())
            .then(data => {
                const temp = data.current_condition[0].temp_C;
                const desc = data.current_condition[0].weatherDesc[0].value;

                document.getElementById("cityName").innerText = "Your Location";
                document.getElementById("temp").innerText = "Temperature: " + temp + "°C";
                document.getElementById("desc").innerText = desc;
            });

        });
    }
};