$(document).ready(function () {
  $('article a[href^="http://"]').not('a[href*=takemetodenmark]').attr('target','_blank')
  $('article a[href^="http://"]').not('a[href*=localhost]').attr('target','_blank')

  $('article a[href^="https://"]').not('a[href*=takemetodenmark]').attr('target','_blank')
  $('article a[href^="https://"]').not('a[href*=localhost]').attr('target','_blank')
})
