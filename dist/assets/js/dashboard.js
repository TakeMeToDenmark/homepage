$(document).ready(function(){function s(){function s(s){var a=new Date("0001-01-01 "+s),e=a.getHours()+":"+("0"+a.getMinutes()).slice(-2);return e}var a=null;$.simpleWeather({woeid:"554890",unit:"c",success:function(e){a='<h3 class="weather__title">Current</h3>',a+='<div class="weather__current">',a+='<div class="current">',a+='<span class="current__icon"><i class="wi wi-yahoo-'+e.code+'"></i></span>',a+='<span class="current__temp">'+e.temp+"&deg;C</span>",a+="</div>",a+='<div class="sun">',a+='<span class="sun__rise" title="sunrise time"><i class="wi wi-sunrise"></i>'+s(e.sunrise)+"</span>",a+='<span class="sun__set" title="sunset time"><i class="wi wi-sunset"></i>'+s(e.sunset)+"</span>",a+="</div>",a+="</div>",a+='<h3 class="weather__title">Forecast</h3>',a+='<div class="weather__forecast">';for(var t=0;t<e.forecast.length;t++)a+='<div class="day">',a+='<span class="day__high">'+e.forecast[t].high+"</span>",a+='<span class="day__icon"><i class="wi wi-yahoo-'+e.forecast[t].code+'"></i></span>',a+='<span class="day__low">'+e.forecast[t].low+"</span>",a+='<span class="day__day">'+e.forecast[t].day+"</span>",a+='<span class="day__date">'+moment(e.forecast[t].date).format("MMM Do")+"</span>",a+="</div>";a+="</div>";for(var i=0;i<100;i++)a+='<i class="icon-'+i+'"></i>';$("#weather").html(a)},error:function(s){$("#weather").html("<p>"+s+"</p>")}})}s()});