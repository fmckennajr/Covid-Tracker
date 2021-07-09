const selectorURL = 'https://disease.sh/v3/covid-19/states/'
    
const select = document.getElementById("selectState")
const todayCases = document.getElementById("todayCases")
const percent = document.getElementById("percent")
const cases = document.getElementById("cases")
const deaths = document.getElementById("deaths")
const recovered = document.getElementById("recovered")
const active = document.getElementById("active")
const tests = document.getElementById("tests")
const todayDeaths = document.getElementById("todayDeaths")
const updated = document.getElementById("updated")
    
fetch(selectorURL).then(
        function(selectorResponse){ return selectorResponse.json()}
      ).then(
        function(json){   
            $.each(json, function (index, json) {
                select.innerHTML += `<option value = "${json.state}">${json.state}</option>`
            })
        }
    )

select.onchange = () =>{
    console.log(select.value)
    let apiURL = selectorURL + select.value
    fetch(apiURL).then(
        function(apiResponse){ return apiResponse.json()}
      ).then(
        function(json){   
            let date = new Date(json.updated).toLocaleString()
            let percents = (json.tests / json.population)*100
            updated.innerHTML = `Updated ${date}`
            cases.innerHTML = `Total Cases: ${json.cases}`
            todayCases.innerHTML = `Total Cases Today: ${json.todayCases}`
            deaths.innerHTML = `Total Deaths: ${json.deaths}`
            todayDeaths.innerHTML = `Total Deaths Today: ${json.todayDeaths}`
            recovered.innerHTML = `Total Recovered: ${json.recovered}`
            active.innerHTML = `Total Active Cases: ${json.active}`
            tests.innerHTML = `Total Tests Performed: ${json.tests}`
            percent.innerHTML = `Percent of Tests Performed per Population: ${percents.toFixed(2)}%`
                      
        }
    )
    

}

