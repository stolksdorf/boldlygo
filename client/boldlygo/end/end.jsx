/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');

var EndPage = React.createClass({

	render : function(){
		var self = this;
		return(
			<div className='endPage'>
				Ready
			</div>
		);
	}
});

module.exports = EndPage;