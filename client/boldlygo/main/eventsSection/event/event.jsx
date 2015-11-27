/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');

var List = require('boldlygo/list.jsx')


var RARITY_ICON ={
	COMMON : 'fa fa-circle',
	UNCOMMON : 'fa fa-square',
	RARE : 'fa fa-star',
	EPIC : 'fa fa-exclamation',
}


var Event = React.createClass({

	render : function(){
		var self = this;

		var event = this.props.event;

		return(
			<div className='event'>
				<div className='name'>{event.name}</div>
				<div className='flavour'>{event.flavour}</div>



				<List className='effects' items={event.effect} />

				<div className='rarity'>
					<i className={RARITY_ICON[event.rarity]} />
				</div>
			</div>
		);
	}
});

module.exports = Event;