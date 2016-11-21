var initData =[
  {
    "id": 1,
    "name": "Chicken",
    "image": "http://del.h-cdn.co/assets/cm/15/10/54f64ad5e25cf_-_200102-omag-comfort-roasted-chicken-400x400.jpg",
    "price": 10000,
    "description": "Garlic-Rosemary Roasted Chicken and Potatoes"
  },
  {
    "id": 2,
    "name": "Chicken",
    "image": "http://del.h-cdn.co/assets/cm/15/10/54f64ad5e25cf_-_200102-omag-comfort-roasted-chicken-400x400.jpg",
    "price": 10000,
    "description": "Garlic-Rosemary Roasted Chicken and Potatoes"
  },
  {
    "id": 3,
    "name": "Chicken",
    "image": "http://del.h-cdn.co/assets/cm/15/10/54f64ad5e25cf_-_200102-omag-comfort-roasted-chicken-400x400.jpg",
    "price": 10000,
    "description": "Garlic-Rosemary Roasted Chicken and Potatoes"
  },
  {
    "id": 4,
    "name": "Chicken",
    "image": "http://del.h-cdn.co/assets/cm/15/10/54f64ad5e25cf_-_200102-omag-comfort-roasted-chicken-400x400.jpg",
    "price": 10000,
    "description": "Garlic-Rosemary Roasted Chicken and Potatoes"
  },
  {
    "id": 5,
    "name": "Chicken",
    "image": "http://del.h-cdn.co/assets/cm/15/10/54f64ad5e25cf_-_200102-omag-comfort-roasted-chicken-400x400.jpg",
    "price": 10000,
    "description": "Garlic-Rosemary Roasted Chicken and Potatoes"
  }
];
var Cookie = {
  setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  getCookie: function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              var text = c.substring(name.length, c.length);
              var t = text.split('???');
              var result = [];
              for( var i = 0; i < t.length; i++){
                result.push(JSON.parse(t[i]));
              }
              return result;
          }
      }
      return "";
  },
  checkCookie: function() {
    var user = this.getCookie("dbmarket");
    if (user == "") {
      var len = initData.length;
      var text = '';
      for( var i = 0; i < len; i++){
        if ( i < len - 1 )
          text += JSON.stringify(initData[i]) + '???';
        else
          text += JSON.stringify(initData[i]);
      }
      this.setCookie("dbmarket", text, 365);
    }
}
}

Cookie.checkCookie();
