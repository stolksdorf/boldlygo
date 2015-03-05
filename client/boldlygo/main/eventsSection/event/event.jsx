/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;

var Event = React.createClass({

	getInitialState: function() {
		var text = this.props.event.action.call(this.props.scope);

		return {
			flavour : text.flavour,
			effect : text.effect
		};
	},

	render : function(){
		var self = this;



		return(
			<div className='event'>
				<div>{this.props.event.name}</div>

				{this.state.flavour}
				{this.state.effect}
			</div>
		);
	}
});

module.exports = Event;