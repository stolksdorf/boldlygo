/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');


var List = require('boldlygo/list.jsx');

var GameStore = require('boldlygo/game.store.js');

var StatusBar = React.createClass({
	mixins : [GameStore.mixin()],

	onStoreChange : function(){
		this.setState(GameStore.getGameState());
	},

	endGame : function(){
		console.log('ending game');
	},


	render : function(){
		var self = this;

		var players = _.map(this.state.players, function(name, roleId){
			return (
				<div className='player'>
					{name} <span className='role'>({roleId})</span>
				</div>
			);
		})


		return(
			<div className='statusBar'>
				<div>Round : {this.state.round}</div>
				<div>Phase : {this.state.phase}</div>
				<div className='mission'>
					<div>Mission : {this.state.mission.id}</div>
					<List items={this.state.mission.reqs} />
				</div>
				<div>Players : {players}</div>
				<button onClick={this.endGame}>End Game</button>
			</div>
		);
	}
});

module.exports = StatusBar;