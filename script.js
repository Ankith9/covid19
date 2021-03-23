let btn = document.getElementById("btn");

        btn.addEventListener("click",()=>{
        let text = document.getElementById("getText").value;
        document.getElementById("loader").innerHTML = "<i class='fa fa-spinner fa-spin' style='font-size:31px'></i>";
        
            fetch('https://api.covid19api.com/summary')
            .then((covidData)=>{
                return covidData.json();
            })
           //Fetches the Information from the API in JSON format
            .then((getData)=>{
              document.getElementById("loader").innerHTML = "";
                console.log(getData);
                var content = document.querySelector(".data");

                var box = content.lastElementChild;
                while (box) {
                    content.removeChild(box);
                    box = content.lastElementChild;
                }

                var index = 0;
                var totalCountries = getData.Countries.length;
              
              
              if('global'.toLowerCase() == text.toLowerCase())
              {
                
                    let Data = getData.Global;
                    let percentRecovered = (Data.TotalRecovered/Data.TotalConfirmed)*100;
                    let percentFatalities = (Data.TotalDeaths/Data.TotalConfirmed)*100;
                    let totalActive = Data.TotalConfirmed-(Data.TotalRecovered+Data.TotalDeaths);
                    let data = document.querySelector(".data");
                    data.innerHTML = `<div class="box">
                                    <div class="head">
                                        <span><strong>W O R L D</strong></span>
                                    </div>
                                    <div class="total">
                                        <div><p>TotalConfirmed</p> ${Data.TotalConfirmed}</div>
                                        <div><p>TotalDeaths</p> ${Data.TotalDeaths}</div>
                                        <div><p>TotalRecovered</p> ${Data.TotalRecovered}</div>
                                    </div>
                                    <div class="percent">
                                        <div><p>TotalActive</p> ${totalActive}</div>
                                        <div><p>Fatalities (%)</p> ${percentFatalities.toFixed(2)}</div>
                                        <div><p>Recovered (%)</p> ${percentRecovered.toFixed(2)}</div>
                                        </div>
                                    <div class="new">
                                        <div><p>NewConfirmed</p> ${Data.NewConfirmed}</div>
                                        <div><p>NewDeaths</p> ${Data.NewDeaths}</div>
                                        <div><p>NewRecovered</p> ${Data.NewRecovered}</div>
                                        </div>
                                    </div>`;
              }
            else{
                for(var i=0;i<totalCountries ;i++)
                {
                    if(getData.Countries[i].Country.toLowerCase() == text.toLowerCase())
                    {
                        index = i;
                        break;
                    } 
                    else {
                        index = -1;
                    }
                }
            
                
                if(index !== -1 )
                {
                    let countryData = getData.Countries[index];
                    let percentRecovered = (countryData.TotalRecovered/countryData.TotalConfirmed)*100;
                    let percentFatalities = (countryData.TotalDeaths/countryData.TotalConfirmed)*100;
                    let totalActive = countryData.TotalConfirmed-(countryData.TotalRecovered+countryData.TotalDeaths);
                    let data = document.querySelector(".data");
                    data.innerHTML = `<div class="box">
                                <div class="head">
                                    <span>COVID-19 Cases in ${countryData.Country}</span>
                                </div>
                                <div class="total">
                                    <div><p>TotalConfirmed</p> ${countryData.TotalConfirmed}</div>
                                    <div><p>TotalDeaths</p> ${countryData.TotalDeaths}</div>
                                    <div><p>TotalRecovered</p> ${countryData.TotalRecovered}</div>
                                </div>
                                <div class="percent">
                                    <div><p>TotalActive</p> ${totalActive}</div>
                                    <div><p>Fatalities (%)</p> ${percentFatalities.toFixed(2)}</div>
                                    <div><p>Recovered (%)</p> ${percentRecovered.toFixed(2)}</div>
                                    </div>
                                <div class="new">
                                    <div><p>NewConfirmed</p> ${countryData.NewConfirmed}</div>
                                    <div><p>NewDeaths</p> ${countryData.NewDeaths}</div>
                                    <div><p>NewRecovered</p> ${countryData.NewRecovered}</div>
                                    </div>
                                </div>`;
                }
                
                else 
                {
                    let data = document.querySelector(".data");
                    data.innerHTML = `<div class="box">
                                    <div class="head">
                                        <span>Data not found</span>
                                    </div>
                                    <div class="total">
                                        <div>-</div>
                                        <div>-</div>
                                        <div>-</div>
                                    </div>
                                    <div class="percent">
                                        <div>-</div>
                                        <div>-</div>
                                        <div>-</div>
                                        </div>
                                    <div class="new">
                                        <div>-</div>
                                        <div>-</div>
                                        <div>-</div>
                                        </div>
                                    </div>`
                }
            }
            })
        })
