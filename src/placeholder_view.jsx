import React from 'react';
import Radium from 'radium';

import {media, fontWeights} from './styles.js'


var styles = {
	img: {
		width: '15%',
		margin: '0 0 3rem 0',
		[media.mobile]: {
			width: '25%'
		}
	},
	wrapper: {
		width: '100%', 
		textAlign: 'center',
		padding: '15rem 0'
	},
	text: {
		fontWeight: fontWeights.light
	}
}

class PlaceholderView extends React.Component {
	render() {
		return (
			<div style={ styles.wrapper }> 
				<img src={ require('./img/placeholder.svg') } style={ styles.img } /> 
				<div style={ styles.text }>Пожалуйста, выберите нужную функицю</div>
			</div> 
		);
	}
}

module.exports = Radium(PlaceholderView);
