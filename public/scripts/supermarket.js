var Product = React.createClass({
  return(
    <div className="product">
      <img className="abstract-image" src={this.props.product.image} />
      <h3 className="headline"> {this.props.product.name} </h3>
      <p className="price">this.props.product.price<p/>
      <p class="description"> {this.props.product.description} </p>
      <input type="button" value="Buy"/>
    </div>
  )
});
