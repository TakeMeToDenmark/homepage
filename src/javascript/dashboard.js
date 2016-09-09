$(document).ready(function () {
  function forecastWidget () {
    $.simpleWeather({
      woeid: '554890',
      unit: 'c',
      success: function (weather) {
        html = '<div class="weather__forecast">' // START forecast

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

  function concertsWidget () {
    var songkickApiKey = "M8RB64s5DjFzhNjB"
    var songkickResultsCount = 12
    var songkickMetroAreaCode = 28617

    $.ajax({
      url: 'http://api.songkick.com/api/3.0/metro_areas/' + songkickMetroAreaCode + '/calendar.json?apikey=' + songkickApiKey + '&per_page=' + songkickResultsCount + '&jsoncallback=?',
      dataType: 'jsonp',
      success: function(t) {
        $.each(t.resultsPage.results.event, function(t, e) {
          var eventMonth = moment(e.start.date).format('MMM')
          var eventDay = moment(e.start.date).format('D')
          var eventUrl = e.uri
          var eventArtist = e.performance[0].artist.displayName
          var eventVenue = e.venue.displayName


          $('#concerts').append(
            '<li>'
            + '<a href="' + eventUrl + '" target="_blank">' // START event link

            + '<div class="event">' // START event

            + '<div class="event__date">' // START date
            + '<div class="event__month">' + eventMonth + '</div>' // event month
            + '<div class="event__day">' + eventDay + '</div>' // event day
            + '</div>' // END date

            + '<div class="event__info">' // START event info
            + '<div class="event__artist">' + eventArtist + '</div>' // event artist
            + '<div class="event__location">' + eventVenue + '</div>' // event location
            + '</div>' // END event info

            + '</div>' // END event

            + '</a>' // END event link
            + '</li>'
          )
          // $("#concerts").append('<li><a href="' + e.uri + '" target="_blank"><div class="concert-date"><span class="concert-month">' + month + '</span><span class="concert-day">' + day + '</span></div><div class="concert-info"><span class="concert-artist">' + e.performance[0].artist.displayName + '</span><span class="concert-venue">@' + e.venue.displayName + "</span></div></a></li>")
          })
      }
    })
  }

  concertsWidget()
})
