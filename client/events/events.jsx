/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');

var GameStore = require('boldlygo/game.store.js');

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
		return this.props.events;
	},

	selectEvent : function(eventId){
		this.setState({
			selectedEvent : eventId
		})
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
				<h1>Event Explorer</h1>
				<div className='controls'>

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

		console.log(event);


		return(
			<div className='eventPreview'>
				<h2>{event.name}</h2>
				<div className='id'>{event.id}</div>
				<div className='action'>
					<pre>{event.action.toString().replace(/\t/g, '  ')}</pre>

				</div>
			</div>
		);
	}
});



var EventBox = React.createClass({

	render : function(){
		var self = this;

		var event = this.props.event

		return(
			<div className={'event' + (this.props.selected ? ' selected' : '')} onClick={this.props.onClick}>
				{event.name}
			</div>
		);
	}
});

