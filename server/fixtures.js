// Fixture data 
if (Posts.find().count() === 0) {
  var now = new Date().getTime();
  
  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);
  
  var telescopeId = Posts.insert({
    name: 'leoni cafe',
    userId: sacha._id,
    author: sacha.profile.name,
    adress: 'salmia 2',
     imageurl: 'http://vectorpage.com/uploads/2013/09/Cartoon-restaurant-vector-6.jpg',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [], votes: 0
  });
  
  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });
  
  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });
  
  Posts.insert({
    name: 'Meteor cafe',
    userId: tom._id,
    author: tom.profile.name,
    adress: 'casablanca',
     imageurl: 'http://vectorpage.com/uploads/2013/09/Cartoon-restaurant-vector-6.jpg',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [], votes: 0
  });
  
  Posts.insert({
    title: 'hay cafe',
    userId: tom._id,
    author: tom.profile.name,
    adress: 'hay mohammadi',
    imageurl: 'http://vectorpage.com/uploads/2013/09/Cartoon-restaurant-vector-6.jpg',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [], votes: 0
  });
  
  for (var i = 0; i < 10; i++) {
    Posts.insert({
      name: 'Test place #' + i,
      author: sacha.profile.name,
      userId: sacha._id,
      adress: 'quartier' + i,
       imageurl: 'http://vectorpage.com/uploads/2013/09/Cartoon-restaurant-vector-6.jpg',
      submitted: new Date(now - i * 3600 * 1000 + 1),
      commentsCount: 0,
      upvoters: [], votes: 0
    });
  }
}