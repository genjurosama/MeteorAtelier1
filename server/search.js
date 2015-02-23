SearchSource.defineSource('places', function(searchText, options) {
  var searchoptions = {sort: {isoScore: -1}, limit: 20};
  
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {name: regExp},
      {adress: regExp}
    ]};

    return Posts.find(selector, searchoptions).fetch();
  } else {
    return Posts.find({}, searchoptions).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}