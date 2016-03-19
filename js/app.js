var meals =[
    {"name":"one", "price":"99", "img" : "img/meals.jpg",
    "description": "description # 1"}, 
    {"name":"two", "price":"25", "img" : "img/crab-cakes.png", 
    "description": "description # 2"}, 
    {"name":"three","price":"48", "img" : "img/bacon_and_eggs.jpg", 
    "description": "description # 3"}
];

var Store = {};

Store.setList = function(){
		if( !localStorage['list'] ) {
			localStorage['list'] = JSON.stringify( [] );
		};	
		Store.list = JSON.parse ( localStorage['list'] );
		return Store.list;
};

Store.pushToList = function (e) {
	var item = {}, pass = 0;
	item.name = e.target.dataset.name;
	item.price = e.target.dataset.price;
	item.description = e.target.dataset.description;
	item.img = e.target.dataset.img;
    
    Store.setList();
    if ( Store.list ) {
    	for(var n in Store.list) {
    		if (Store.list[n].name == item.name ) { pass++; }
    		if (Store.list[n].price == item.price ) { pass++; }
    		if (Store.list[n].description == item.description ) { pass++; }
    		if (Store.list[n].img == item.img ) { pass++; }   			
    		if ( pass == 4 ) {
    			break;
    		} else {
    			pass = 0;
    		}
		}
	}

    if ( pass != 4 ) {
    	Store.list.push( item );
		localStorage['list'] = JSON.stringify( Store.list );
	}


	console.log( item );
	console.log( Store.list );

    e.preventDefault();
};


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
    				 data-name={item.name} data-price={item.price} 
    				 data-description={item.description} data-img={item.img} 
    				 onClick={Store.pushToList}
    				 />
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

  getInitialState: function() {
    return {
      list: Store.setList()
    };
  },

  render: function() {

  	var body = !this.state.list.length ? 'No items are added to the list' :
  	'You are awesome';

    return (
      <div className='list' >
            <div className="list-header">
        		Added to list
                
            </div>
            <div className="list-body" >
				{body}
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