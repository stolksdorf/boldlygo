/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;

var gameProps = _.extend({},
				require('../../config/buildings'),
				require('../../config/missions'),
				require('../../config/roles'),
				require('../../config/events'));

gameProps.events = _.mapValues(gameProps.events, function(event, id){
	event.id = id
	return event;
});



var MainPage = require('./main/main.jsx');




var demoParameters = {
	players : {
		COMMANDER : "Scott",
		DOCTOR : "LP",
		COMMS : "Jared",
		GEOLOGIST : "Kellen"
	},
	mission : "MINING",
	rarity : {
		COMMON : 0.7,
		UNCOMMON : 0.25,
		RARE : 0.04,
		EPIC : 0.01
	},
	numEventsPerRound : 3
}



var Boldlygo = React.createClass({

	getInitialState: function() {
		return {
			gameRunning: true
		};
	},


	getDefaultProps: function() {
		return {
		};
	},

	render : function(){
		var self = this;

		var page;
		if(this.state.gameRunning) page = (
			<MainPage
				game = {gameProps}
				parameters={demoParameters} />
			);


		return(
			<div className='boldlygo'>
				{page}

			</div>
		);
	}
});

module.exports = Boldlygo;