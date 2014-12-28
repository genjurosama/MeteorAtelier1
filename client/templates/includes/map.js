Template.map.rendered = function() {
      if (! Session.get('map'))
        gmaps.initialize();
 
  Tracker.autorun(function() {
       var pages = Posts.find().fetch();
        _.each(pages, function(page) {
          console.log("react");
            if (typeof page.adress !== 'undefined' &&
                typeof page.lat !== 'undefined' &&
                typeof page.long !== 'undefined') {
 
                var objMarker = {
                    id: page._id,
                    lat: page.lat,
                    lng: page.long,
                    title: page.name
                };
 
                // check if marker already exists
                if (!gmaps.markerExists('id', objMarker.id))
                    gmaps.addMarker(objMarker);
 
            }
        });
    });
  
}
 
Template.map.destroyed = function() {
    Session.set('map', false);
}