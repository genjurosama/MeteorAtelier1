Template.postSubmit.created = function() {
  Session.set('postSubmitErrors', {});
}

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var post = {
      name: $(e.target).find('[name=name]').val(),
      adress: $(e.target).find('[name=adress]').val(),
      type: $(e.target).find('[name=type]').val(),
      imageurl:$(e.target).find('[name=imageurl]').val(),
      lat:$(e.target).find('[name=lat]').val(),
      long:$(e.target).find('[name=long]').val(),
    };
    
    var errors = validatePost(post);
    if (errors.name || errors.adress)
      return Session.set('postSubmitErrors', errors);
    
    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');
      
      Router.go('postPage', {_id: result._id});  
    });
  }
});