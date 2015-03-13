/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;

var GameStore = require('boldlygo/game.store.js');
var GameActions = require('boldlygo/game.actions.js');


var NAMES = ['Megbot', 'LP', 'LP MD', 'Jared', 'K-Train', 'Kellen',
			 "Scott", 'KT', 'Katie', 'Chris', 'Megan', 'Jarebot9000'];

var Setup = React.createClass({

	getDefaultProps: function() {
		return GameStore.getGameProps();
	},

	getInitialState: function() {
		return {
			mission : _.sample(this.props.missions),
			players : [
				{
					name :'LP',
					role : 'DOCTOR'
				},
				{
					name :'Jared',
					role : 'COMMS'
				},
				{
					name :'Scott',
					role : 'COMMANDER'
				}
			],
		};
	},

	handleMissionChange : function(e){
		this.setState({
			mission : this.props.missions[e.target.value]
		})
	},

	startTheGame : function(){
		GameActions.setupGame({
			mission : this.state.mission,
			players : _.reduce(this.state.players, function(r, player){
				r[player.role] = player.name;
				return r;
			},{})
		});

		this.props.start();
	},

	getAvailableRoleList : function(except){
		var self = this;
		var usedRoles = _.pluck(this.state.players, 'role');
		return _.filter(this.props.roles, function(roleData){
			return (!_.contains(usedRoles, roleData.id)) ||  (roleData.id === except)
		})
	},

	addPlayer : function(){
		this.state.players.push({
			name : _.sample(NAMES),
			role : _.sample(this.getAvailableRoleList()).id
		});
		this.setState({ players : this.state.players });
	},
	removePlayer : function(playerIndex){
		this.state.players.splice(playerIndex,1);
		this.setState({ players : this.state.players });
	},

	handlePlayerNameChange : function(playerIndex, e){
		this.state.players[playerIndex].name = e.target.value;
		this.setState({ players : this.state.players });
	},
	handlePlayerRoleChange : function(playerIndex, e){
		this.state.players[playerIndex].role = e.target.value;
		this.setState({ players : this.state.players });
	},



	getPlayers : function(){
		var self = this;

		return _.map(this.state.players, function(playerData, playerId){

			var roles = _.map(self.getAvailableRoleList(playerData.role), function(roleData){
				return <option value={roleData.id} >{roleData.name}</option>
			})

			return <div className='playerBox' key={playerId}>
				<input type='text'
					value={playerData.name}
					onChange={self.handlePlayerNameChange.bind(null, playerId)}/>

				<select value={playerData.role} onChange={self.handlePlayerRoleChange.bind(null, playerId)}>
					{roles}
				</select>
				<i className='removeButton fa fa-close' onClick={self.removePlayer.bind(null, playerId)} />
			</div>
		});
	},



	render : function(){
		var self = this;

		var missionOptions =_.map(this.props.missions, function(missionData, missionId){
			return <option value={missionId}>{missionData.name}</option>
		})

		var addPlayerButton;
		if(this.state.players.length < _.size(this.props.roles)){
			addPlayerButton = <div className='addPlayerButton' onClick={this.addPlayer}><i className='fa fa-plus' /> Add Player</div>;
		}

		return(
			<div className='setup'>
				<h1>One Small Step</h1>
				<section>
					<h3>Mission</h3>
					<div className='mission'>
						Select your mission : <select onChange={this.handleMissionChange} value={this.state.mission.id}>
							{missionOptions}
						</select>
						<div className='description'>{this.state.mission.desc}</div>
						<ul className='reqs'>
							{_.map(this.state.mission.reqs, function(req){return <li>{req}</li>})}
						</ul>
					</div>
				</section>

				<section>
					<h3>Players {addPlayerButton}</h3>
					{this.getPlayers()}
				</section>

				<div>
					<button onClick={this.startTheGame}>Start!</button>
				</div>
			</div>
		);
	}
});

module.exports = Setup;