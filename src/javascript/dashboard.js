$(document).ready(function () {
  function forecastWidget () {
    var html = null

    /* CONVERT 12HR TO 24HR */
    function ConvertTime (t) {
      // Get your time (using a hard-coded year for parsing purposes)
      var time = new Date('0001-01-01 ' + t)

      // Output your formatted version (using your DateTime)
      var formatted = time.getHours() + ':' + ('0' + time.getMinutes()).slice(-2)

      // Return your formatted time
      return formatted
    }
    /* END CONVERT 12HR TO 24HR */

    $.simpleWeather({
      woeid: '554890',
      unit: 'c',
      success: function (weather) {
        html = '<h3 class="weather__title">Current</h3>'
        html += '<div class="weather__current">' // START current weather

        html += '<div class="current">' // START current
        html += '<span class="current__icon"><i class="wi wi-yahoo-' + weather.code + '"></i></span>' // current icon
        html += '<span class="current__temp">' + weather.temp + '&deg;C</span>' // current temperature
        html += '</div>' // END current

        html += '<div class="sun">' // START sun
        html += '<span class="sun__rise" title="sunrise time"><i class="wi wi-sunrise"></i>' + ConvertTime(weather.sunrise) + '</span>' // sunrise
        html += '<span class="sun__set" title="sunset time"><i class="wi wi-sunset"></i>' + ConvertTime(weather.sunset) + '</span>' // sunset
        html += '</div>' // END sun

        html += '</div>' // END today's weather

        html += '<h3 class="weather__title">Forecast</h3>'
        html += '<div class="weather__forecast">' // START forecast

        for (var i = 0; i < weather.forecast.length; i++) {
          html += '<div class="day">' // START day
          html += '<span class="day__high">' + weather.forecast[i].high + '</span>' // day high
          html += '<span class="day__icon"><i class="wi wi-yahoo-' + weather.forecast[i].code + '"></i></span>' // day icon
          html += '<span class="day__low">' + weather.forecast[i].low + '</span>' // day low
          html += '<span class="day__day">' + weather.forecast[i].day + '</span>' // day name
          html += '<span class="day__date">' + moment(weather.forecast[i].date).format('MMM Do') + '</span>' // day date
          html += '</div>' // END day
        }

        html += '</div>' // END forecast

        for (var k = 0; k < 100; k++) {
          html += '<i class="icon-' + k + '"></i>'
        }

        $('#weather').html(html)
      },
      error: function (error) {
        $('#weather').html('<p>' + error + '</p>')
      }
    })
  }

  forecastWidget()
})
