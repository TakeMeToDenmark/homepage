$(document).ready(function () {
  // OPEN EXTERNAL LINKS IN NEW TAB
  $('article a[href^="http://"]').not('a[href*=takemetodenmark]').attr('target','_blank')
  $('article a[href^="http://"]').not('a[href*=localhost]').attr('target','_blank')

  $('article a[href^="https://"]').not('a[href*=takemetodenmark]').attr('target','_blank')
  $('article a[href^="https://"]').not('a[href*=localhost]').attr('target','_blank')

  // SMOOTH SCROLL
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash)
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000)
          return false
        }
      }
    })
  })

  // REVEAL 'SCROLL-TO-TOP' BUTTON
  function update () {
    if ($(window).scrollTop() > 600) {
      $('.back-to-top').animate({
        'bottom': '2.4rem',
        'opacity': '1'
      }, 300)
    } else {
      $('.back-to-top').animate({
        'bottom': '-48px',
        'opacity': '0'
      }, 300)
    }
  }
  setInterval(update, 500)

  // DYNAMIC TABLE OF CONTENTS
  function dynamicToc () {
    // add id to headings
    $('h2').not('.toc-ignore').each(function (index, value) {
      var newId = $(this).text()
      var newIdNormalized = newId.replace(/\s+/g, '-').toLowerCase()
      $(this).attr('id', newIdNormalized)
    })

    // generate TOC
    $('h2').not('.toc-ignore').each(function (index, value) {
      var headingContent = $(this).text()
      var headingId = headingContent.replace(/\s+/g, '-').toLowerCase()

      $('.toc').append(
        '<li><a href="#' + headingId + '">' + headingContent + '</a></li>'
      )
    })
  }
  dynamicToc()

  $.bigfoot() // start up bigfoot plugin

  // SUGGESTION SLIDE OUT
  function suggestionSlide () {
    $('.suggestion__slide').hide() // hide slide

    $('.suggestion__activate .btn').click(function () { // slide out on click
      $('.suggestion__image img').animate({
        'opacity': '1'
      })
      $('.suggestion__activate').slideUp() // hide prompt
      $('.suggestion__slide').slideDown(600) // slide in the form
      $('#message-form input.name').select() // select first field
    })
  }
  suggestionSlide()

  // MESSAGE FORM
  $('#message-form').submit(function (e) {
    var submitUrl = 'https://formspree.io/hello@takemetodenmark.com'

    $('.message').animate({
      'height': '0',
      'opacity': '0'
    }, 500)

    $.ajax({
      url: submitUrl,
      method: 'POST',
      data: $('#message-form').serialize(),
      dataType: 'json',
      success: function (data) {
        setTimeout(function () {
          $('.form-success').fadeIn()
        }, 400)
      },
      error: function (data) {
      }
    })

    e.preventDefault()
  })

  var $loading = $('.spinner').hide()
  $(document).ajaxStart(function () {
    $loading.fadeIn()
  })
  .ajaxStop(function () {
    $loading.fadeOut()
  })
})
