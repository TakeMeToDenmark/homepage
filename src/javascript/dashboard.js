$(document).ready(function () {
  // WEATHER FORECAST WIDGET
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

  // CPHPOST NEWS WIDGET
  function newsWidget () {
    $('#news').rss('http://cphpost.dk/rss-feed/', {
      limit: 8,
      host: 'sheltered-tor-32039.herokuapp.com/',
      effect: 'slide',
      layoutTemplate: '<div class="feed">{entries}</div>',
      entryTemplate: '<article class="item"><div class="item__image"><a href="{url}" target="_blank"><img src="{teaserImageUrl}" alt="{title}" /></a></div><div class="item__body"><h3 class="item__title"><a href="{url}" target="_blank">{title}</a></h3><p class="item__text">{shortBodyPlain}</p></div></article>'
    })
  }
  newsWidget()

  // SONGKICK CONCERTS WIDGET
  function concertsWidget () {
    var songkickApiKey = 'M8RB64s5DjFzhNjB'
    var songkickResultsCount = 12
    var songkickMetroAreaCode = 28617

    $.ajax({
      url: 'http://api.songkick.com/api/3.0/metro_areas/' + songkickMetroAreaCode + '/calendar.json?apikey=' + songkickApiKey + '&per_page=' + songkickResultsCount + '&jsoncallback=?',
      dataType: 'jsonp',
      success: function (data) {
        $.each(data.resultsPage.results.event, function (data, e) {
          var eventMonth = moment(e.start.date).format('MMM')
          var eventDay = moment(e.start.date).format('D')
          var eventUrl = e.uri
          if (e.performance.length) {
            var eventArtist = e.performance[0].displayName
          } else {
            eventArtist = 'Unknown Artist'
          }
          var eventVenue = e.venue.displayName

          $('#concerts').append(
            '<li>' +
            '<a href="' + eventUrl + '" target="_blank">' + // START event link

            '<div class="event">' + // START event

            '<div class="event__date">' + // START date
            '<div class="event__month">' + eventMonth + '</div>' + // event month
            '<div class="event__day">' + eventDay + '</div>' + // event day
            '</div>' + // END date

            '<div class="event__info">' + // START event info

            '<div class="event__artist">' + eventArtist + '</div>' + // event artist
            '<div class="event__location">' + eventVenue + '</div>' + // event location
            '</div>' + // END event info

            '</div>' + // END event

            '</a>' + // END event link
            '</li>'
          )
        })
      }
    })
  }
  concertsWidget()
})
