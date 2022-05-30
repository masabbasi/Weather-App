const form = document.querySelector(".container form");
const inputSearch = document.querySelector(".app-input");
const clearBtn = document.querySelector(".clear-btn");
const alert = document.querySelector(".alert");
const listResult = document.querySelector(".list");

const apiKey = "2ae38f66191851a1729c1d10f72da2e9";

form.addEventListener("submit",e=>{
    e.preventDefault();
    let userCity = inputSearch.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`
    fetch(url)
        .then(response=>response.json())
        .then(info=>{
            const {main, name, sys, weather } = info;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
            const li = document.createElement("li");
            li.classList.add("list-item");
            const allLiCode = `
            <h2 class="city">${name}<sup>${sys.country}</sup></h2>
            <h2 class="temp">${main.temp}°C</h2>
            <figure>
                <img src="${icon}">
                <figurecaption>${weather[0]["description"]}</figurecaption>
            </figure>
            `;
            li.innerHTML=allLiCode;
            listResult.appendChild(li);
            alert.innerText="";
        })
        .catch(()=>{
            alert.innerText="Search for a valid city!";
        })
        inputSearch.value="";
})

clearBtn.addEventListener("click",function(){
    alert.innerText="";
    listResult.innerHTML="";
})