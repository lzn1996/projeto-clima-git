// Passo 1-  Pegar todos os botoes, inputs e divs que serão usados e armazenar em variáveis

//Interação
const citySearchInput = document.querySelector('#city-search-input')
const citySearchButton = document.querySelector('#city-search-button')
//Exibição
const currentDate = document.querySelector('#current-date')
const cityName = document.querySelector('#city-name')
const weatherIcon = document.querySelector('#weather-icon')
const weatherDescription = document.querySelector('#weather-description')
const currentTemperature = document.querySelector('#current-temperature')
const windSpeed = document.querySelector('#wind-speed')
const feelsLikeTemperature = document.querySelector('#feels-like-temperature')
const currentHumidity = document.querySelector('#current-humidity')
const sunriseTime = document.querySelector('#sunrise-time')
const sunsetTime = document.querySelector('#sunset-time')
const api_key = 'c2a2ef8a0498948988aa791a6f383c09'

// Passo 2- Adicionar evento de click (addeventlistener) na variavel q armazena o input que vai receber a cidade, e criar uma funçao anonima pra pegar o valor do input: adicionando uma proxima funçao q recebe como parametro do valor do input, criada logo depois, que vai pesquisar por esse valor atraves de uma API
citySearchButton.addEventListener('click', () => {
  let cityName = citySearchInput.value
  getCityWeather(cityName)
})
//https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appi=${6081e8071e88b1d5d97214a8be9141e6
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Passo 6 - usar a funçao getCurrentPosition do js pra pegar a posiçao atual do usuario, buscar pela latitude e longitude com a api
navigator.geolocation.getCurrentPosition(
  position => {
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`
    )
      .then(response => response.json())
      .then(data => displayWeather(data))
  },
  err => {
    if (err.code === 1) {
      alert('Geo negada pelo usuário')
    } else {
      console.log(err)
    }
  }
)

document.addEventListener('keypress', function (event) {
  let cityName = citySearchInput.value
  if (event.keyCode == 13) {
    getCityWeather(cityName)
  }
})

//https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appi=${6081e8071e88b1d5d97214a8be9141e6
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Passo 6 - usar a funçao getCurrentPosition do js pra pegar a posiçao atual do usuario, buscar pela latitude e longitude com a api
navigator.geolocation.getCurrentPosition(
  position => {
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`
    )
      .then(response => response.json())
      .then(data => displayWeather(data))
  },
  err => {
    if (err.code === 1) {
      alert('Geo negada pelo usuário')
    } else {
      console.log(err)
    }
  }
)

// Passo 3- Criar uma funçao que usa o metodo fetch para buscar uma api de clima, onde recebe o cityName (q é o valor do input, o useja, o que o usuario digitar, ex sao paulo)
function getCityWeather(cityName) {
  weatherIcon.src = `assets/loading-icon.svg`
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`
  ) // fetch = busque por > link da api. then>((pega a resposta)) => e faz ela virar json = resposta.json.then>((pega o dado q veio) => e faz algo)
    .then(response => response.json())
    .then(data => displayWeather(data))
}
//Passo 4 - Criar uma funçao "displayWeather, q recebe como parametro o dado vindo do json", e depois criar uma variavel que vai desestruturar ( quebrar o dado e selecionar apenas algumas partes) ex let {dt, name..} = data
function displayWeather(data) {
  let {
    dt,
    name,
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity },
    wind: { speed },
    sys: { sunrise, sunset },
  } = data

  // Passo 5 - Modificar o textContent das variáveis criadas acima para o valor vindo da desestruturaçao feita dos dados do json
  currentDate.textContent = formatDate(dt)
  cityName.textContent = name
  weatherIcon.src = `assets/${icon}.svg`
  weatherDescription.textContent = description
  currentTemperature.textContent = `${Math.round(temp)}ºC`
  windSpeed.textContent = speed
  feelsLikeTemperature.textContent = feels_like
  currentHumidity.textContent = humidity
  sunriseTime.textContent = formatTime(sunrise)
  sunsetTime.textContent = formatTime(sunset)
}

//    Passo 7 - Criar uma funçao q recebe um epochTime (epoch time é o valor recebido dos dados do json em relaçao a horas minutos etc), dps converte esse epochtime com o new Date * 1000
//    e  formata a data com LocaleDateString com parametros de pt-br e objeto de month > long pra ser por extenso e day numeric e entao retorna em template string. depois coloca essa funçao no text content q estava o dt

function formatDate(epochTime) {
  let date = new Date(epochTime * 1000)
  let formattedDate = date.toLocaleDateString('pt-BR', {
    month: 'long',
    day: 'numeric',
  })
  return `Hoje, ${formattedDate}`
}
// Passo 8 - criar uma funçao semelhante a anterior pra fazer o mesmo só que com minutos e horas usando funçoes do js getHours() e getMinutes(), retornando concatenado em template string e alterando depois no html
function formatTime(epochTime) {
  let date = new Date(epochTime * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  return `${hours}:${minutes}`
}
