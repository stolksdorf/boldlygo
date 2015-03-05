/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;


var timers = {}, onUp = {};

var BuildingsBar = React.createClass({

	toggle : function(buildingId){

		this.props.update(buildingId,{
			isBuilt : true
		});

	},




	clickBuilding : function(id){
		var building = this.props.buildings[id];
		if(!building.isBuilt){
			this.props.update(id,{
				isBuilt : true
			});
		}else{
			this.props.update(id,{
				isOperational : !building.isOperational
			});
		}

	},

	holdBuilding : function(id){
		var building = this.props.buildings[id];

		if(building.isBuilt){
			this.props.update(id,{
				isBuilt : false
			});
		}else{
			this.clickBuilding(id);
		}
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
		var self = this;

		var result = _.find(this.props.buildings, function(building){
			return KEY_CODES[building.key] == e.keyCode
		})

		if(result) this.clickBuilding(result.id);



/*

		console.log(id);


			if(!onUp[id]){
				onUp[id] = function(e){
					self.clickBuilding('GREENHOUSE');
					clearTimeout(timers[id]);
				}

				timers[id] = setTimeout(function(){
					self.holdBuilding('GREENHOUSE');
					onUp[id] = function(){}
				}, 500);

			}

*/


	},
	handleKeyUp : function(e){
		var id = e.keyCode || e;

		if(onUp[id]){
			onUp[id](e);
			onUp[id] = null;
		}

	},


	render : function(){
		var self = this;

		var buildings = _.map(this.props.buildings, function(building, id){
			var cn='';
			if(building.isBuilt) cn = ' built';
			if(building.isOperational) cn = ' operational'
			return (
				<div className={'building' + cn} onClick={self.clickBuilding.bind(self,id)}>
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






KEY_CODES = {
	'space' : 32,
	'0' : 48,
	'1' : 49,
	'2' : 50,
	'3' : 51,
	'4' : 52,
	'5' : 53,
	'6' : 54,
	'7' : 55,
	'8' : 56,
	'9' : 57,
	'a' : 65,
	'b' : 66,
	'c' : 67,
	'd' : 68,
	'e' : 69,
	'f' : 70,
	'g' : 71,
	'h' : 72,
	'i' : 73,
	'j' : 74,
	'k' : 75,
	'l' : 76,
	'm' : 77,
	'n' : 78,
	'o' : 79,
	'p' : 80,
	'q' : 81,
	'r' : 82,
	's' : 83,
	't' : 84,
	'u' : 85,
	'v' : 86,
	'w' : 87,
	'x' : 88,
	'y' : 89,
	'z' : 90
}