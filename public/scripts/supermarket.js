// init the router ES5
var { Router, Route, IndexRoute, Link } = ReactRouter
var CustomFieldOfInformationProduct = React.createClass({
  changePrice: function(e){
    if ( e.target.value == "0" ||  e.target.value == "" )
    {
      console.log('==0');
      e.target.value = this.state.numberOfProduct;
      return;
    }
    this.setState({numberOfProduct: e.target.value});
    this.props.changePrice(this.props.product.idProduct, e.target.value);
  },
  cancalP: function(){
    console.log();
    this.props.cancelProduct(this.props.product.idProduct);
  },
  getInitialState: function(){
    if( this.props.type != "shop" && this.props.type != "basket"  ){
      return {
        numberOfProduct: this.props.product.number
      }
    }
    return {
    }
  },
  // componentDidUpdate: function(){
  //   console.log('render of custom fields');
  //   // this.setState({numberOfProduct: this.props.product.number});
  // },
  render: function(){
    if ( this.props.type == "shop"){
      return (
        <div className="infor">
          <img className="abstract-image" src={this.props.product.image} />
          <h3 className="headline"> {this.props.product.name} </h3>
          <p className="price">{this.props.product.price}$</p>
          <p className="description"> {this.props.product.description} </p>
          <input type="button" className="btn" value="Buy" onClick={this.props.sendToBasket}/>
        </div>
      )
    }else if ( this.props.type == "basket"){
      return (
        <div className="infor basket">
          <img className="abstract-image basket" src={this.props.product.image} />
          <h3 className="headline basket"> {this.props.product.name} </h3>
          <p className="price bakset">Price: {this.props.product.price}$</p>
          <p className="number bakset">Number: {this.props.product.number}</p>
          <input type="button" className="btn" value="Delete" onClick={this.props.delProduct}/>
        </div>
      )
    }else{
      return (
        <div className="infor">
          <img className="abstract-image" src={this.props.product.image} />
          <h3 className="headline "> {this.props.product.name} </h3>
          <p className="price ">Price: {this.props.product.price}$</p>
          <p className="number ">Number: <input type="number" min = "1" max = "100"  value={this.state.numberOfProduct} onChange={this.changePrice}/></p>
          <input type="button" className="btn" value="Delete" onClick={this.cancalP}/>
        </div>
      )
    }
  }
});
///////////////
/// render infor of a product
//////////////

var Product = React.createClass({
  sendToBasket: function(e){
    e.preventDefault();
    this.props.buyProduct(this.props.product.idProduct);
  },
  delProduct: function(e){
    e.preventDefault();
    this.props.delProductOfBasket(this.props.product.idProduct);
  },
  render: function(){
      // console.log('render of the Product component');
      return(
        <li className="product" id-product={this.props.product.idProduct} >
          <CustomFieldOfInformationProduct product = {this.props.product}  type={this.props.type}
          sendToBasket={this.sendToBasket} delProduct={this.delProduct} cancelProduct={this.props.cancelProduct} changePrice={this.props.changePrice} />
          <div className="clearFloat"></div>
        </li>
      )
  }
});
//////////////
/// manage the product list
/////////////
var ProductListOfShop = React.createClass({
  render: function(){
    var ProductListOfShop = this;
    return(
        <ul className="product-list shop">
          {
            this.props.products.map(function(product){
              return (
                  <Product product={product} key={product.idProduct} buyProduct={ProductListOfShop.props.buyProduct} type="shop"/>
              )
            })
          }
        </ul>
    );
  }
});
//////////////
/// the product list of the client buy
/////////////
var Basket = React.createClass({
  componentWillUpdate(prevProps, prevState) {
  },
   componentDidUpdate(prevProps, prevState) {
      $('#SuperBasket > div.image-basket ').addClass('vibrate');
      $('#SuperBasket > div.image-basket ').on(
    "transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
        function() {
          console.log('done animation');
            $(this).delay(1000).queue(function() {  // Wait for 1 second.
                $(this).removeClass("vibrate").dequeue();
            });
        }
    );
   },
  buy: function(e){
    e.preventDefault();
    this.props.updateProductOfClient(this.props.products);
  },
  render: function(){
    var basket = this;
    if ( this.props.products.length == 0){
      return(
        <div id="SuperBasket">
          <div className="image-basket"><span>{this.props.products.length}</span></div>
          <ul className="product-list basket">
            <li>Please buy something!</li>
          </ul>
        </div>
      );
    }else{
      return(
        <div id="SuperBasket">
          <div className="image-basket"><span>{this.props.products.length}</span></div>
          <ul className="product-list basket">
            {
              this.props.products.map(function(product){
                return (
                  <Product product={product} key={product.idProduct} type="basket" delProductOfBasket={basket.props.delProductOfBasket}/>
                )
              })
            }
            <li onClick={this.buy} className="btn btn-danger col-xs-12 col-md-12"><Link to="/result">PAY</Link>
            </li>
            <div className="clearFloat"></div>
          </ul>
        </div>
      )
    }

  }
});
//////////////
/// show the product list and the basket of the client.
//////////////
var ShopPage = React.createClass({
  buyProduct: function(idProduct){
    var product = '';
    // get the product has been buy
    var products = this.state.productsOfShop;
    var len = products.length;
    for ( var i = 0; i < len; i++){ // update number if the product is exist in the basket
      if ( products[i].idProduct == idProduct ){
        var productOfB = this.state.productOfBasket;
        var isHas = false;
        var j = 0;
        for( ; j < productOfB.length; j++ ){
          if( productOfB[j].idProduct == idProduct ){
            isHas = true;
            break;
          }
        }
        if( isHas ){ // update number of the product
          productOfB[j].number = productOfB[j].number + 1;
          this.setState({productOfBasket: productOfB });
        }else{ // add to the basket
          var p = this.state.productOfBasket;
          var pDraft = JSON.parse(JSON.stringify(products[i]));
          pDraft.number = 1;
          p.push(pDraft);
          this.setState({productOfBasket: p });
        }
        break;
      }
    }
  },
  delProductOfBasket: function(idProduct){
    var len = this.state.productOfBasket.length;
    var prodcuts = [];
    for ( var i = 0; i < len; i++){
      if ( this.state.productOfBasket[i].idProduct != idProduct ){
        prodcuts.push( this.state.productOfBasket[i]);
      }
    }
    this.setState({productOfBasket: prodcuts});
  },
  getInitialState: function(){
    return {
      productOfBasket: [],
      productsOfShop: Cookie.getCookie('dbmarket')
    }
  },
  render: function(){
    return(
      <div className="shop">
        <ProductListOfShop products = {this.state.productsOfShop} buyProduct= {this.buyProduct}  />
        <Basket products = {this.state.productOfBasket} delProductOfBasket={this.delProductOfBasket} updateProductOfClient={this.props.updateProductOfClient} />
      </div>
    );
  }
});
////////////////////
/// show the result after the client bought
/// /////////////
var PayPage = React.createClass({
  pay: function(){
    alert('Done. Bye Bye');
  },
  calMoney: function(){
    var total = 0;
    var p = this.props.productOfClient;
    for (var i = 0; i < p.length; i++){
      total += p[i].price*p[i].number;
    }
    return total;
  },
  render: function(){
    var payPage = this;
    return(
      <div className="result">
        <h1>Result:</h1>
          <ul className="product-list shop">
            {
              this.props.productOfClient.map(function(product){
                return (
                    <Product product={product} key={product.idProduct} changePrice={payPage.props.changePrice}
                     cancelProduct={payPage.props.cancelProduct}  type="nohandle"/>
                )
              })
            }
          </ul>
        <span>Total: {this.calMoney()}$</span>
        <Link to="/" onClick={this.pay}>$$$$</Link>
      </div>
    );
  }
});
////////////////////////
/// the component of the website
//////////////////////////////
var SuperMarket = React.createClass({
  changePrice: function(idProduct, cNumber){
    var len = this.state.productOfClient.length;
    var prodcuts = [];
    for ( var i = 0; i < len; i++){
      if ( this.state.productOfClient[i].idProduct != idProduct ){
        prodcuts.push( this.state.productOfClient[i]);
      }else{
        this.state.productOfClient[i].number = cNumber;
        prodcuts.push(this.state.productOfClient[i]);
      }
    }
    this.setState({productOfClient: prodcuts});
  },
  cancelProduct: function(idProduct){
    var len = this.state.productOfClient.length;
    var prodcuts = [];
    for ( var i = 0; i < len; i++){
      if ( this.state.productOfClient[i].idProduct != idProduct ){
        prodcuts.push( this.state.productOfClient[i]);
      }
    }
    this.setState({productOfClient: prodcuts});
  },
  updateProductOfClient: function(products){
    this.setState({productOfClient: products});
  },
  getInitialState: function(){
    return{
      productOfClient: []
    }
  },
  render: function(){
    return(
      <div className="full-page" >
        <Header />
        {this.props.children && React.cloneElement(this.props.children, {
              updateProductOfClient: this.updateProductOfClient,
              productOfClient: this.state.productOfClient, cancelProduct: this.cancelProduct, changePrice: this.changePrice
            })}
        <Footer />
      </div>
    );
  }
});
/////////////////
/// Nav
///////////////////
var Header = React.createClass({
  render: function(){
    return(
      <div className="header">Welcom to Shop</div>
    )
  }
});
//////////////////////
///footer
///////////////////
var Footer = React.createClass({
  render: function(){
    return(
      <div className="header">created by vien.nguyen</div>
    )
  }
});

/////////////////////
///RENDER VIRTUAL DOM
////////////////////

ReactDOM.render(
  <Router>
    <Route path="/" component={SuperMarket}>
      <IndexRoute component={ShopPage} />
      <Route path="result" component={PayPage} />
    </Route>
  </Router>
  ,document.getElementById('react-root')
);
