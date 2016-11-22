var initData =[
  {
    "idProduct": 1,
    "name": "Chicken",
    "image": "http://del.h-cdn.co/assets/cm/15/10/54f64ad5e25cf_-_200102-omag-comfort-roasted-chicken-400x400.jpg",
    "price": 10000,
    "saleOff": -1,
    "description": "Garlic-Rosemary Roasted Chicken and Potatoes"
  },
  {
    "idProduct": 2,
    "name": "Hamburger",
    "image": "http://meltingpotdj.com/wp-content/uploads/2016/04/hamburger-1-bosse-400x400.jpg",
    "price": 12345,
    "saleOff": -1,
    "description": "Hamburger 1 bosse"
  },
  {
    "idProduct": 3,
    "name": "Apple",
    "image": "http://anacortesoilandvinegarbar.com/wp-content/uploads/2015/10/Gravenstien-Apple-400x400.jpg",
    "price": 21000,
    "saleOff": -1,
    "description": "Gravenstein Apple White Balsamic"
  },
  {
    "idProduct": 4,
    "name": "Beaf",
    "image": "http://media.cooky.vn/recipe/g2/14115/s400x400/recipe-635579305168168213.jpg",
    "price": 19000,
    "saleOff": -1,
    "description": "Garlic-Rosemary Roasted Chicken and Potatoes"
  },
  {
    "idProduct": 5,
    "name": "Bread",
    "image": "http://supremeflour.co.za/wp-content/uploads/2016/06/White-Bread-400x400.jpg",
    "price": 5000,
    "saleOff": -1,
    "description": "Here it is! supreme flour's legendary white bread. you."
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
