
 

 jQuery(document).ready(function($) {
  $('#sel_city').select2();
  
  function getcountries(){
    new Promise((resolve,reject)=>{
  
    axios.get('./data.json')
    .then(
            function (response) {
                    // handle success
  
                    let sel_city = document.getElementById("sel_city");
                    sel_city.innerHTML = ""
                    console.log(response.data)
                    let countries = response.data;
                    for(country of countries){
                        sel_city.innerHTML+=`<option  city="${country.capital}" value="${country.alpha2Code}">
                                                ${country.name}
                                                </option>`

                    }
                    $('#sel_city').val('SA');
          }
          
    )
    resolve()
  }
  ).then(()=>{
    let sel_city = document.getElementById("sel_city");
    let parms={
      country:'',
      city:""
     }
    $("#sel_city").on("change",function(){
     parms.country =  sel_city.value;
     parms.city = this.options[this.selectedIndex].getAttribute("city");
     axios.get('http://api.aladhan.com/v1/timingsByCity',{params:parms})
     .then(function (response) {
       // handle success
       let options;
      console.log(response.data)
       let data = response.data.data.timings;
       var fajr = document.getElementById('fajr');
       var Sunrise = document.getElementById('Sunrise');
       var Zuhr = document.getElementById('Zuhr');
       var Asr = document.getElementById('Asr');
       var Maghrib = document.getElementById('Maghrib');
       var Isha = document.getElementById('Isha');
  
  
       fajr.innerHTML=`<span class="thm-clr title">Fajar</span><span class="">${data.Fajr}</span>`
       Sunrise.innerHTML=`<span class="thm-clr title">Sunrise</span><span class="">${data.Sunrise}</span>`
       Zuhr.innerHTML=`<span class="thm-clr title">Dhuhr</span><span class="">${data.Dhuhr}</span>`
       Asr.innerHTML=`<span class="thm-clr title">Asr</span><span class="">${data.Asr}</span>`
       Maghrib.innerHTML=`<span class="thm-clr title">Maghrib</span><span class="">${data.Maghrib}</span>`
       Isha.innerHTML=`<span class="thm-clr title">Isha</span><span class="">${data.Isha}</span>`
     })
    })
  }
  )
}

getcountries()


function getAzan(){
   let parms={
    country:'SA',
    city:"Riyadh"
   }
    axios.get('http://api.aladhan.com/v1/timingsByCity',{params:parms})
   .then(function (response) {
     // handle success
     let options;
    console.log(response.data)
     let data = response.data.data.timings;
     var fajr = document.getElementById('fajr');
     var Sunrise = document.getElementById('Sunrise');
     var Zuhr = document.getElementById('Zuhr');
     var Asr = document.getElementById('Asr');
     var Maghrib = document.getElementById('Maghrib');
     var Isha = document.getElementById('Isha');


     fajr.innerHTML=`<span class="thm-clr">Fajar</span><span class="">${data.Fajr}</span>`
     Sunrise.innerHTML=`<span class="thm-clr">Sunrise</span><span class="">${data.Sunrise}</span>`
     Zuhr.innerHTML=`<span class="thm-clr">Dhuhr</span><span class="">${data.Dhuhr}</span>`
     Asr.innerHTML=`<span class="thm-clr">Asr</span><span class="">${data.Asr}</span>`
     Maghrib.innerHTML=`<span class="thm-clr">Maghrib</span><span class="">${data.Maghrib}</span>`
     Isha.innerHTML=`<span class="thm-clr">Isha</span><span class="">${data.Isha}</span>`
   })
 }

 getAzan();
 

 });