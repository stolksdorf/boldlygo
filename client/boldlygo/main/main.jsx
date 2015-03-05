/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;


var BuildingsBar = require('./buildingsBar/buildingsBar.jsx');
var StatusBar = require('./statusBar/statusBar.jsx');
var EventsSection = require('./eventsSection/eventsSection.jsx');



_.execute = function(val, context){
	context = context || this;
	if(_.isFunction(val)) return val.call(context);
	console.log(val);
	return val;
}

var Main = React.createClass({
	getDefaultProps: function() {
		return {
			game:{
				events : {}
			}
		};
	},


	getInitialState: function() {
		return {
			round : 0,
			phase : 'EVENTS', //FOOD, CLEANUP
			oneTimeEvents : [],
			buildings : _.reduce(this.props.game.buildings, function(r, building, id){
				r[id] = building;
				r[id].id = id;
				r[id].isBuilt = building.startWith === true;
				r[id].isOperational = building.startWith === true;
				return r;
			},{}),

			events : []
		};
	},


	componentDidMount: function() {
		window.addEventListener("keypress", this.handleKeyPress);

		this.rarityMap = _(this.props.parameters.rarity).map(function(weight, val){
			return _.times(weight * 100, function(){return val})
		}).flatten().value();

		console.log(this.state);
	},
	componentWillUnmount: function() {
		window.removeEventListener("keypress", this.handleKeyPress);
	},



	handleKeyPress : function(e){
		if(e.keyCode === 32){

			console.log(this.state.events.length, this.props.parameters.numEventsPerRound);


			if(this.state.phase === 'EVENTS' &&
				this.state.events.length === this.props.parameters.numEventsPerRound){
				this.setState({
					phase : 'FOOD'
				});
			}else if(this.state.phase === 'EVENTS'){
				this.getEvent();
			}else if(this.state.phase === 'FOOD'){
				this.setState({
					phase : 'CLEANUP'
				});
			}else if(this.state.phase === 'CLEANUP'){
				this.setState({
					phase : 'EVENTS',
					round : this.state.round+1,
					events : []
				});
			}


		}
	},


	getEventScope : function(){
		var self = this;

		return {
			players : this.props.parameters.players,
			buildings : this.state.buildings,
			mission : this.props.parameters.mission,

			random : {
				player : function(){
					return _.sample(self.props.parameters.players)
				},
				building : function(){
					return _.sample(self.state.buildings).name
				}
			}

		}
	},




	getEvent : function(){
		var self = this;
		var rarity = _.sample(this.rarityMap);
		console.log(rarity);

		var eventPool = _.filter(this.props.game.events, function(event){
			if(rarity !== event.rarity) return false;

			if(_.contains(self.state.oneTimeEvents, event.id)) return false;

			if(_.execute(event.requirement, self.getEventScope()) === false) return false;

			return true;
		})

		var event = _.sample(eventPool);

		console.log(eventPool, event);


		if(!event) return this.getEvent();;




		if(_.execute(event.one_time, this.getEventScope())) this.state.oneTimeEvents.push(event.id)

		this.state.events.push(event)
		this.setState({
			events : this.state.events,
			oneTimeEvents : this.state.oneTimeEvents
		})

	},

	updateBuilding : function(buildingId, newState){
		this.state.buildings[buildingId] = _.extend(this.state.buildings[buildingId], newState);

		this.setState({
			buildings : this.state.buildings
		})

	},


	render : function(){
		var self = this;

		var msg;
		if(this.state.phase === 'CLEANUP'){
			msg = <div>CLEANUP</div>
		}
		if(this.state.phase === 'FOOD'){
			msg = <div>EAT YA FOOD</div>
		}





		return(
			<div className='main'>
				<StatusBar round={this.state.round} phase={this.state.phase} />

				<EventsSection events={this.state.events} scope={this.getEventScope()}/>


				{msg}

				<BuildingsBar buildings={this.state.buildings} update={this.updateBuilding}/>
			</div>
		);
	}
});

module.exports = Main;


