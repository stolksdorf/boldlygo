/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('lodash');
var cx = React.addons.classSet;
var Utils = require('./utils');


var SetupPage = require('./setup/setup.jsx');
var MainPage = require('./main/main.jsx');



var Boldlygo = React.createClass({

	getInitialState: function() {
		return {
			gameRunning: true,

			page : 'setup'
		};
	},

	changePage : function(newPage){
		this.setState({
			page : newPage
		})
	},

	render : function(){
		var self = this;
		var page;
		if(this.state.page == 'main'){
			page = <MainPage />
		}

		if(this.state.page == 'setup'){
			page = <SetupPage
					start={this.changePage.bind(null, 'main')} />
		}
		return(
			<div className='boldlygo'>
				{page}
			</div>
		);
	}
});

module.exports = Boldlygo;