/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');

var execute = function(fn, context){
	if(_.isFunction(fn)) return fn.call(context);
	return fn;
}


var GameStore = require('boldlygo/game.store.js');


var RARITY_ICON ={
	COMMON : 'fa fa-circle',
	UNCOMMON : 'fa fa-square',
	RARE : 'fa fa-star',
	EPIC : 'fa fa-exclamation',
}




var Events = React.createClass({
	getDefaultProps: function() {
		return GameStore.getGameProps();
	},

	getInitialState: function() {
		return {
			selectedEvent : null
		};
	},


	filterEvents : function(){
		var self = this;
		return _.filter(this.props.events, function(event){
			if(self.state.search && !self.search(event)) return false;
			return true;
		})
	},

	search : function(event){
		var search = this.state.search;

		event.requirement = event.requirement || '';
		return (event.name.toLowerCase().indexOf(search) !== -1) ||
			(event.action.toString().toLowerCase().indexOf(search) !== -1) ||
			(event.requirement.toString().toLowerCase().indexOf(search) !== -1);

	},
	selectEvent : function(eventId){
		this.setState({
			selectedEvent : eventId
		})
	},
	setSearch : function(e){
		this.setState({
			search : e.target.value.toLowerCase()
		})
	},

	testAllEvents : function(){
		var self = this;
		console.log(GameStore.getGameState());
		_.each(this.props.events, function(event){
			try{
				execute(event.requirement, GameStore.getGameState());
				execute(event.action, GameStore.getGameState());
			}catch(e){
				console.log(event.id, e.message);
			}
		});
		console.log('Done Testing!');
	},


	render : function(){
		var self = this;

		var events = _.map(this.filterEvents(), function(event){
			return <EventBox event={event} key={event.id}
						onClick={self.selectEvent.bind(null, event.id)}
						selected={self.state.selectedEvent === event.id} />
		})


		return(
			<div className='events'>


				<div style={{display : 'none'}}>
					{_.map(this.props.events, function(event){
						return <div>{event.name} - {execute(event.action, GameStore.getGameState()).flavour}</div>
					})}
				</div>


				<h1>Event Explorer <small>{events.length}</small></h1>
				<div className='controls'>
					<i className='fa fa-search' /> <input className='search' type='text' onChange={this.setSearch} />
					<button onClick={this.testAllEvents}>Test All</button>
				</div>
				<div className='eventContainer'>
					{events}
				</div>

				<EventPreview event={this.props.events[this.state.selectedEvent]} />
			</div>
		);
	}
});

module.exports = Events;



var EventPreview = React.createClass({

	render : function(){
		var self = this;
		var event = this.props.event;
		if(!event) return <div className='eventPreview'></div>

		event.requirement = event.requirement || '';
		event.one_time = event.one_time || false;

		return(
			<div className='eventPreview'>
				<span className='rarity'>{event.rarity}</span>
				<h3>{event.name} <small>{event.id}</small></h3>

				<div className='one_time'> One Time : {event.one_time.toString()}</div>

				<div className='code requirement'>
					<pre>{event.requirement.toString().replace(/\t/g, '  ')}</pre>
				</div>

				<div className='code action'>
					<pre>{event.action.toString().replace(/\t/g, '  ')}</pre>
				</div>
			</div>
		);
	}
});



var EventBox = React.createClass({
	render : function(){
		var self = this;
		var event = this.props.event;


		return(
			<div className={'event' + (this.props.selected ? ' selected' : '')} onClick={this.props.onClick}>
				{event.name} <i className={RARITY_ICON[event.rarity]} />
			</div>
		);
	}
});

