/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;

var GameStore = require('boldlygo/game.store.js');

var StatusBar = React.createClass({
	mixins : [GameStore.mixin()],

	onStoreChange : function(){
		this.setState(GameStore.getGameState());
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
				<div>Mission : {this.state.mission.id}</div>
				<div>Players : {players}</div>
			</div>
		);
	}
});

module.exports = StatusBar;