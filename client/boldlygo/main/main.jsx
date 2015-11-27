/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;

var GameStore = require('boldlygo/game.store.js');
var GameActions = require('boldlygo/game.actions.js');


var BuildingsBar = require('./buildingsBar/buildingsBar.jsx');
var StatusBar = require('./statusBar/statusBar.jsx');
var EventsSection = require('./eventsSection/eventsSection.jsx');

var Main = React.createClass({
	mixins : [GameStore.mixin()],

	onStoreChange : function(){
		this.setState(GameStore.getGameState());
	},

	getDefaultProps: function() {
		return GameStore.getGameProps();
	},
	getInitialState: function() {
		return GameStore.getGameState();
	},
	componentDidMount: function() {
		window.addEventListener("keypress", this.handleKeyPress);

		console.log(this.props);
	},
	componentWillUnmount: function() {
		window.removeEventListener("keypress", this.handleKeyPress);
	},



	handleKeyPress : function(e){

		if(Utils.KEY_CODES.space === e.keyCode){
			if(this.state.phase === 'EVENTS' && _.size(this.state.events) === this.props.parameters.eventsPerRound){
				GameActions.nextPhase()
			}else if(this.state.phase === 'EVENTS'){
				GameActions.newEvent();
			}else if(this.state.phase === 'FOOD'){
				GameActions.nextPhase();
			}else if(this.state.phase === 'CLEANUP'){
				GameActions.nextRound()
			}
		}
	},

	render : function(){
		var self = this;

		var msg;
		if(this.state.phase === 'CLEANUP'){
			msg = <div className='phase'>CLEANUP</div>
		}
		if(this.state.phase === 'FOOD'){
			msg = <div className='phase'>EAT YA FOOD</div>
		}


		return(
			<div className='main'>
				<StatusBar />

				<EventsSection events={this.state.events}/>


				{msg}

				<BuildingsBar />
			</div>
		);
	}
});

module.exports = Main;


