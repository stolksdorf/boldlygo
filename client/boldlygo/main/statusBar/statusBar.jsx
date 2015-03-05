/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;

var StatusBar = React.createClass({

	render : function(){
		var self = this;
		return(
			<div className='statusBar'>
				<div>Round : {this.props.round}</div>
				<div>Phase : {this.props.phase}</div>
			</div>
		);
	}
});

module.exports = StatusBar;