
var meals =[
    {"id" : "1", "name":"one", "price":"99", 
    "img" : "img/meals.jpg", "description": "description # 1"}, 
    {"id" : "2", "name":"two", "price":"25", "img" : "img/crab-cakes.png", 
    "description": "description # 2"}, 
    {"id" : "3", "name":"three","price":"48", "img" : "img/bacon_and_eggs.jpg", 
    "description": "description # 3"}
];




var Goods  = React.createClass({

	propTypes: {
    	meals: React.PropTypes.array.isRequired
    },

	handleClick: function(e) {
	
        if ( e.target.dataset.target == 'true' ) {
			this.props.setList(e.target.dataset.name, e.target.dataset.price, 
						e.target.dataset.img, e.target.dataset.id );
		}

	},

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
    				<input className="goods__item-body__add add_button" 
    				 type='button' value='Add to List' 
    				 data-name={item.name} data-price={item.price} 
    				 data-id={item.id} data-img={item.img} 
    				 data-target='true'
    				 />
    			</div>
    			<div className='clearfix'></div>
    		</div>
  		)
	})

  	return (

    	<div className='goods' id='goods' onClick={this.handleClick}>
            <div className="goods__meals-header">
        		Meals
            </div>	
      		{goodsTemplate}
    	</div>
    );
  }

});


var List  = React.createClass({


	handleClick: function(e) {
	
        if ( e.target.dataset.target == 'delete' ) {
			this.props.deleteInList(e.target.dataset.index);
		}
	
        if ( e.target.dataset.target == 'add' ) {
			this.props.addItem(e.target.dataset.index);
		}
	
        if ( e.target.dataset.target == 'subtract' ) {
			this.props.subtractItem(e.target.dataset.index);
		}		

	},

  render: function() {

var body ='';
if (this.props.list.length) {
      body = this.props.list.map(function(item, index) {
        return (
          <div key={index} className="list-body__item">
            <img className="list-body__img" src={item.img} />
            <div  className="list-body__text" >
            	<p className="list-body__name">{item.name}</p>
            	<p className="list-body__price">Price: 
            	${item.price * item.ordered}</p>
            	<p className="list-body__ordered">{item.ordered} item is ordered</p>            
            	<input type='button' value='add more' 
            	className="list-body__button"
            	data-index={index}  data-target='add'
            	/>
            	<input type='button' value='subtract' 
            	className="list-body__button"
            	data-index={index} data-target='subtract'
            	/> 
            	<br />
            	<input type='button' value='delete' 
            	className="list-body__button"
            	data-index={index} data-target='delete'
            	/>


            </div>
            <div className='clearfix'> </div>
          </div>
        )
      })
    } else {
      body = <p>No items are added to the list</p>
    }

    return (
      <div className='list' >
            <div className="list-header">
        		Added to list
                
            </div>
            <div className="list-body"  onClick={this.handleClick}>
				{body}
            </div>

            <div className={'list-body__buy ' + 
            (this.props.list.length ? '' : 'none' ) } >
<p className="list-body__buy-length">
List length is {this.props.list.length}</p>
<input type='button' value='buy' className="list-body__buy-button" />
	
            </div>
      </div> 
    );
  }
});

       
var App = React.createClass({

  getInitialState: function() {
    return {
      list: []
    };
  },

  render: function() {

  	var me = this;

	var setList = function(name, price, img, id) {
        var item = {};
        item.name = name;
        item.price = price;
        item.img = img;
        item.id = id;
        item.ordered = 1;

        me.state.list.forEach(function(ite, i, arr) {
        	var pass = 0;
        	if ( ite.name == item.name) { pass++; }
        	if ( ite.price == item.price) { pass++; }
        	if ( ite.img == item.img) { pass++; }
        	if ( ite.id == item.id) { pass++; } 
        	if ( pass == 4 ) { item.ordered = 0 }     	
        });

        if ( item.ordered ) {
        	me.state.list.push(item)       
			me.setState( { list: me.state.list } );    				
		}
		console.log( me.state.list );

	};

	var deleteInList = function(index){

		me.state.list.splice(index, 1);
		me.setState( { list: me.state.list } );
		console.log( me.state.list ); 
		console.log( me.state.list.length ); 
	};


	var addItem = function(index){

		me.state.list[index].ordered++;
		me.setState( { list: me.state.list } );
		console.log( me.state.list ); 

	};

	var subtractItem = function(index){

		me.state.list[index].ordered--;
		if ( me.state.list[index].ordered == 0) {
			me.state.list.splice(index, 1);	
		}
		me.setState( { list: me.state.list } );
		console.log( me.state.list ); 

	};

    return (
      <div className="app">
        <Goods meals={meals} setList={setList} />
        <List list={this.state.list} 
        deleteInList={deleteInList} 
        addItem={addItem} 
        subtractItem={subtractItem} />
      </div>
    );
  }
});

       
ReactDOM.render(
  <App />,
  document.getElementById('root')
);