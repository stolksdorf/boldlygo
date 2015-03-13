"use strict";

var vitreum = require("vitreum"),
	gulp = require("gulp")


var gulp = vitreum.tasks(gulp, {
	entryPoints: ["./client/boldlygo", "./client/events"],
	DEV: true,

	projectType : "STATIC",

	buildPath: "./build/",
	pageTemplate: "./client/template.hbs",

	projectModules: ["./node_modules/boldlygo", ],
	assetExts: ["*.svg", "*.png", "*.jpg", "*.pdf", "*.eot", "*.ttf", "*.woff", "*.woff2"],

	serverWatchPaths: ["server", "server.js"],
	serverScript: "server.js",
	cdn: {
		"react/addons" : ["window.React","<script src='//cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js'></script>"],
		"jquery" : ["window.jQuery","<script src='//code.jquery.com/jquery-1.11.0.min.js'></script>"],
		"lodash" : ["window._","<script src='//cdnjs.cloudflare.com/ajax/libs/lodash.js/3.3.0/lodash.min.js'></script>"],
		"moment" : ["window.moment","<script src='//cdnjs.cloudflare.com/ajax/libs/moment.js/2.7.0/moment.min.js'></script>"],

	},
	libs: [],
});


