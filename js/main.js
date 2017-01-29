var vistoEm = [
  {
    'canal': 'Wired',
    'url': 'http://www.wired.com/2014/12/empzeal-parable-polygons/'
  },
  {
    'canal': 'Washington Post',
    'url': 'http://www.washingtonpost.com/blogs/wonkblog/wp/2014/12/09/how-tiny-individual-biases-have-huge-cumulative-effects-on-racial-segregation/'
  },
  {
    'canal': 'BoingBoing',
    'url': 'http://www.wired.com/2014/12/empzeal-parable-polygons/'
  },
  {
    'canal': 'Creative Commons',
    'url': 'http://ccthing.tumblr.com/post/104764760336/parable-of-the-polygons-vi-hart-and-nicky-case'
  },
  {
    'canal': 'KillScreen',
    'url': 'http://killscreendaily.com/articles/parable-polygons-teaches-us-danger-and-power-individual-bias'
  },
  {
    'canal': 'JayIsGames',
    'url': 'http://jayisgames.com/archives/2014/12/parable_of_the_polygons.php'
  },
  {
    'canal': 'Hacker News',
    'url': 'https://news.ycombinator.com/item?id=8716538'
  },
  {
    'canal': 'MetaFilter',
    'url': 'http://www.metafilter.com/145147/Parable-of-the-Polygons'
  },
  {
    'canal': 'New York Magazine',
    'url': 'http://nymag.com/scienceofus/2014/12/these-cartoon-shapes-are-adorable-but-racist.html'
  },
];

var areaDasNoticias = document.querySelector('.visto-em');

var stringDeNoticias = vistoEm.map(function(noticia, index){
  var finalDaString = index === vistoEm.length-1 ? '' : ',';
  return '<a target="_blank" href="' + noticia.link + '">'+ noticia.canal +'</a>' + finalDaString ;
});

areaDasNoticias.innerHTML = stringDeNoticias.join(' ');
