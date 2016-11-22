// init the router ES5
var { Router, Route, IndexRoute, Link } = ReactRouter
///////////////
/// render infor of a product
//////////////
var Product = React.createClass({
  sendToBasket: function(e){
    e.preventDefault();
    this.props.buyProduct(this.props.product.idProduct);
  },
  delProduct: function(){
    this.props.delProductOfBasket(this.props.product.idProduct);
  },
  render: function(){
    if (this.props.type == "shop"){
      return(
        <li className="product" id-product={this.props.product.idProduct} >
          <img className="abstract-image" src={this.props.product.image} />
          <div className="infor">
            <h3 className="headline"> {this.props.product.name} </h3>
            <p className="price">{this.props.product.price}$</p>
            <p className="description"> {this.props.product.description} </p>
            <input type="button" className="btn" value="Buy" onClick={this.sendToBasket}/>
          </div>
          <div className="clearFloat"></div>
        </li>
      )
    }else if (this.props.type == "basket"){
      return(
        <li className="product" id-product={this.props.product.idProduct} >
          <img className="abstract-image basket" src={this.props.product.image} />
          <div className="infor basket">
            <h3 className="headline basket"> {this.props.product.name} </h3>
            <p className="price bakset">Price: {this.props.product.price}$</p>
            <p className="number bakset">Number: {this.props.product.number}</p>
            <input type="button" className="btn" value="Delete" onClick={this.delProduct}/>
          </div>
          <div className="clearFloat"></div>
        </li>
      )
    }

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
        <Basket products = {this.state.productOfBasket} delProductOfBasket={this.delProductOfBasket} />
      </div>
    );
  }
});
////////////////////
/// show the result after the client bought
/// /////////////
var ResultPage = React.createClass({
  render: function(){
    return(
      <div className="result">
        <h1>The Result:</h1>
      </div>
    );
  }
});
////////////////////////
/// the component of the website
//////////////////////////////
var SuperMarket = React.createClass({
  render: function(){
    return(
      <div className="full-page" >
        {this.props.children}
      </div>
    );
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
