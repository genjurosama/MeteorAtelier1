var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'adress'];

PlaceSearch = new SearchSource('places', fields, options);

Template.postsList.helpers({
   postsWithRank: function() {
    return this.posts.map(function(post, index, cursor) {
      post._rank = index;
      return post;
    });
  },
  getPlaces: function() {
    return PlaceSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return PlaceSearch.getStatus().loading;
  }
});

Template.postsList.rendered = function() {
  PlaceSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    PlaceSearch.search(text);
  }, 200)
});
