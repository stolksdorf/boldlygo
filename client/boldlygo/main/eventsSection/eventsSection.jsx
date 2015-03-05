/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;

var Event = require('./event/event.jsx');

var EventsSection = React.createClass({

	render : function(){
		var self = this;


		var events = _.map(this.props.events, function(event){
			return <Event event={event} scope={self.props.scope} />
		})

		return(
			<div className='eventsSection'>
				{events}
			</div>
		);
	}
});

module.exports = EventsSection;