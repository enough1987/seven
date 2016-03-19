var meals =[
    {"name":"one", "price":"99", "img" : "img/meals.jpg",
    "description": "description # 1"}, 
    {"name":"two", "price":"25", "img" : "img/crab-cakes.png", 
    "description": "description # 2"}, 
    {"name":"three","price":"48", "img" : "img/bacon_and_eggs.jpg", 
    "description": "description # 3"}
];


var Goods  = React.createClass({

  render: function() {

  	var data = this.props.meals;
  	var goodsTemplate = data.map(function(item, index) {
  		return (
    		<div key={index} className="goods__item" >
    			<img  className="goods__item-img" src={item.img} />
    			<div className="goods__item-body" >
    				<p className="goods__item-body__name" >{item.name}:</p>
    				<p className="goods__item-body__price" >Price: ${item.price}</p>
    				<p className="goods__item-body__description" > {item.description}</p> 
    				<input className="goods__item-body__add" 
    				 type='button' value='Add to List' 
    				 name={item.name} price={item.price} 
    				 description={item.description} img={item.img} />
    			</div>
    			<div className='clearfix'></div>
    		</div>
  		)
	})

  	return (
    	<div className='goods' >
            <div className="goods__meals-header">
        		Meals
            </div>	
      		{goodsTemplate}
    	</div>
    );
  }

});


var List  = React.createClass({
  render: function() {
    return (
      <div className='list' >
            <div className="list-header">
        		Added to list

            </div>	      		
      </div> 
    );
  }
});

       
var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <Goods meals={meals} />
        <List />
      </div>
    );
  }
});

       
ReactDOM.render(
  <App />,
  document.getElementById('root')
);