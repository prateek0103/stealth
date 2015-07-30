var events=[];

  /** @type {string} */
  var update = "#events-mst";
  /** @type {string} */
  var tddiv = "#events #content";
  /** @type {string} */
  var hideId = "#events .spinner";
  /** @type {string} */
  var helpButton = "#events h6";
  /** @type {string} */
  var formIds = "#events article .overflow-toggle";
  /** @type {string} */
  var anUnique = "#events article .carousel";
  /** @type {string} */
  var theNode = "#events article .img";
  
    $.ajax({
             url: "https://graph.facebook.com/oauth/access_token?client_id=114225848922835&client_secret=c852eddfe1880ebc994210c0e29ac329&grant_type=client_credentials",
                 success: function(result){
                 var accessToken=result.slice(13,result.length);
                     console.log(accessToken);
                     $.ajax({
                     url: "https://graph.facebook.com/v2.4/gamingstealth/events?"+result+"&debug=all&format=json&method=get&pretty=0&suppress_http_code=1",
                         success: function(result){
                             console.log(result);
                             console.log(result.data[0].id);
                             console.log(result.data.length);
                             
                             for(i=0; i<result.data.length; i++){
                                $.ajax({
                                url: "https://graph.facebook.com/v2.4/"+result.data[i].id+"/?access_token="+accessToken+"&debug=all&fields=cover%2Cname%2Cdescription%2Cstart_time&format=json&method=get&pretty=0&suppress_http_code=1",
                                    async: false,
                                    success: function(result){
                                        events[i]=result;
                                        console.log(events[i]);
                                        
                                    }
                                });
                             }
                             console.log(events);
                            newEvents(events);
                             
                            
                             
                         }
                     });
                     
                 }
             });
      
      function newEvents(list) {
          console.log(list.length);
      /** @type {Date} */
      var now = new Date;
      /** @type {number} */
      var i = 0;
      for (;i < list.length;i++) {
        /** @type {Date} */
        var d = new Date(list[i].start_time);
        d.setHours(23);
        /** @type {Date} */
        list[i].dateObj = d;
        list[i].month = month[d.getMonth()];
        /** @type {number} */
        list[i].day = d.getDate();
        if (list[i].day < 10) {
          /** @type {string} */
          list[i].day = "0" + list[i].day;
        }
        if (list[i].dateObj < now) {
          /** @type {boolean} */
          list[i].past = true;
        } else {
          /** @type {boolean} */
          list[i].upcoming = true;
        }
        var choices = list[i].desc.split(" ");
        /** @type {number} */
        var wordStart = 100;
        /** @type {string} */
        var desc = "";
        /** @type {string} */
        var optsData = "";
        /** @type {number} */
        var index = 0;
        for (;index < choices.length;index++) {
          if (wordStart > 0) {
            desc += choices[index] + " ";
          } else {
            optsData += choices[index] + " ";
          }
          wordStart -= choices[index].length;
        }
        if (list[i].desc = desc, list[i].overflow = optsData, void 0 != list[i].img) {
          /** @type {number} */
          index = 0;
          for (;index < list[i].img.length;index++) {
            var type = list[i].img[index];
            type.web = appendPath(col, type.web);
            type.full = void 0 == type.full ? type.web : appendPath(col, type.full);
          }
        }
      }
      list.sort(function(next) {
        return now - next.dateObj;
      });
      var eventsArray = list.splice(0, 3);
      $(hideId).hide();
      $(tddiv).html(Mustache.render($(update).html(), {
        events : eventsArray
      }));
      $(helpButton).tooltip();
      $(formIds).each(function() {
        /** @type {number} */
        var a = 0;
        $(this).click(function() {
          $(this).prev(".overflow").toggle(a++ % 2 === 0);
          $(this).html(a % 2 === 1 ? value : response);
        });
      });
      $(anUnique).each(function() {
        $(this).slick({
          lazyLoad : "progressive",
          infinite : false,
          speed : 300,
          slidesToShow : 1,
          slidesToScroll : 1
        });
      });
      $(anUnique).each(function() {
        $(".img", this).magnificPopup({
          type : "image",
          gallery : {
            enabled : true
          }
        });
      });
      $(theNode).wrapInner("<div class='aspect-ratio-wrapper'></div>");
    };
  
