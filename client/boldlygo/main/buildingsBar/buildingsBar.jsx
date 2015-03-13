/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;

var GameStore = require('boldlygo/game.store.js');
var GameActions = require('boldlygo/game.actions.js');


var BuildingsBar = React.createClass({
	mixins : [GameStore.mixin()],

	onStoreChange : function(){
		this.setState(GameStore.getGameState());
	},

	clickBuilding : function(id){
		var building = this.state.buildings[id];

		if(!building.isBuilt){
			GameActions.updateBuilding(id,{
				isBuilt : true
			});
		}else{
			GameActions.updateBuilding(id,{
				isOperational : !building.isOperational,
				isBuilt : true
			});
		}

	},

	holdBuilding : function(id){
		var building = this.state.buildings[id];

		if(building.isBuilt){
			GameActions.updateBuilding(id,{
				isBuilt : false,
				isOperational : false
			});
		}else{
			this.clickBuilding(id);
		}
	},

	getBuildingFromKey : function(keyCode){
		return _.find(this.state.buildings, function(building){
			return Utils.KEY_CODES[building.key] == keyCode
		})
	},


	componentWillMount: function() {
		this.holdTrigger = Utils.createHoldTrigger(500, this.clickBuilding.bind(this), this.holdBuilding.bind(this) );
	},

	componentDidMount: function() {
		window.addEventListener("keydown", this.handleKeyDown);
		window.addEventListener("keyup", this.handleKeyUp);
	},
	componentWillUnmount: function() {
		window.removeEventListener("keydown", this.handleKeyDown);
		window.removeEventListener("keyup", this.handleKeyUp);
	},

	handleKeyDown : function(e){
		var building = this.getBuildingFromKey(e.keyCode)
		if(building) this.holdTrigger.onDown(building.id);
	},
	handleKeyUp : function(e){
		var building = this.getBuildingFromKey(e.keyCode)
		if(building) this.holdTrigger.onUp(building.id);
	},


	render : function(){
		var self = this;

		var buildings = _.map(this.state.buildings, function(building, id){
			var cn='';
			if(building.isBuilt) cn = ' built';
			if(building.isOperational) cn = ' operational'
			return (
				<div className={'building' + cn} key={id}
					onMouseDown={self.holdTrigger.onDown.bind(null, id)}
					onMouseUp={self.holdTrigger.onUp.bind(null, id)} >
					<div className='content'>
						<div>{building.name}</div>
						<div>({building.key})</div>
					</div>
				</div>
			);
		})

		return(
			<div className='buildingsBar'>
				{buildings}
			</div>
		);
	}
});

module.exports = BuildingsBar;




