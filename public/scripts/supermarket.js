// init the router ES5
var { Router, Route, IndexRoute, Link } = ReactRouter
var CustomButtonProduct = React.createClass({
  render: function(){
    if( this.props.type == "shop"){
      return (
        <input type="button" className="btn" value="Buy" onClick={this.props.sendToBasket}/>
      )
    }else if( this.props.type == "basket"){
      return (
        <input type="button" className="btn" value="Delete" onClick={this.props.delProduct}/>
      )
    }else {
      return (
        <span></span>
      )
    }
  }
});
var CustomFieldOfInformationProduct = React.createClass({
  render: function(){
    if ( this.props.type == "shop"){
      return (
        <div className="infor">
          <img className="abstract-image" src={this.props.product.image} />
          <h3 className="headline"> {this.props.product.name} </h3>
          <p className="price">{this.props.product.price}$</p>
          <p className="description"> {this.props.product.description} </p>
          <CustomButtonProduct type = {this.props.type} sendToBasket={this.props.sendToBasket} />
        </div>
      )
    }else if ( this.props.type == "basket"){
      return (
        <div className="infor basket">
          <img className="abstract-image basket" src={this.props.product.image} />
          <h3 className="headline basket"> {this.props.product.name} </h3>
          <p className="price bakset">Price: {this.props.product.price}$</p>
          <p className="number bakset">Number: {this.props.product.number}</p>
          <CustomButtonProduct type = {this.props.type} delProduct={this.props.delProduct} />
        </div>
      )
    }else{
      return (
        <div className="infor">
          <img className="abstract-image" src={this.props.product.image} />
          <h3 className="headline "> {this.props.product.name} </h3>
          <p className="price ">Price: {this.props.product.price}$</p>
          <p className="number ">Number: {this.props.product.number}</p>
        </div>
      )
    }
  }
});
var C
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
      return(
        <li className="product" id-product={this.props.product.idProduct} >
          <CustomFieldOfInformationProduct product = {this.props.product}  type={this.props.type} sendToBasket={this.sendToBasket} delProduct={this.delProduct}  />
          <div className="clearFloat"></div>
        </li>
      )
  }
});
//////////////
/// manage the product list
/////////////
var ProductList = React.createClass({
  render: function(){
    var productList = this;
    return(
        <ul className="product-list shop">
          {
            this.props.products.map(function(product){
              return (
                  <Product product={product} key={product.idProduct} buyProduct={productList.props.buyProduct} type="shop"/>
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
            <li onClick={this.buy}><Link to="/result">PAY</Link></li>
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
        <ProductList products = {this.state.productsOfShop} buyProduct= {this.buyProduct}  />
        <Basket products = {this.state.productOfBasket} delProductOfBasket={this.delProductOfBasket} updateProductOfClient={this.props.updateProductOfClient} />
      </div>
    );
  }
});
////////////////////
/// show the result after the client bought
/// /////////////
var ResultPage = React.createClass({
  calMoney: function(){
    var total = 0;
    var p =this.props.productOfClient;
    for (var i = 0; i < p.length; i++){
      total += p[i].price*p[i].number;
    }
    return total;
  },
  render: function(){
    return(
      <div className="result">
        <h1>Result:</h1>
          <ul className="product-list shop">
            {
              this.props.productOfClient.map(function(product){
                return (
                    <Product product={product} key={product.idProduct}  type="nohandle"/>
                )
              })
            }
          </ul>
        <span>Total: {this.calMoney()}$</span>
      </div>
    );
  }
});
////////////////////////
/// the component of the website
//////////////////////////////
var SuperMarket = React.createClass({
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
              productOfClient: this.state.productOfClient
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
      <Route path="result" component={ResultPage} />
    </Route>
  </Router>
  ,document.getElementById('react-root')
);
