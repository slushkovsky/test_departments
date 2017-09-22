import React from 'react'; 
import { push as Menu } from 'react-burger-menu';
import Radium from 'radium'

import {media, colors, fontWeights} from './styles.js';


var styles = {
    view: {
    	padding: '3rem 15rem 0',
    	[media.mobile]: {
    		padding: '10rem 0'
    	}
    },
    menu: {
    	bmBurgerButton: {
			position: 'fixed',
			width: 'calc(1.2 * 2rem)',
			height: '2rem',
			top: '3.5rem', 
			left: '3.5rem'
		},
		bmBurgerBars: {
			background: '#666',
			borderRadius: '10px' 
		},
		bmMenu: {
			background: colors.primary,
			overflow: 'hidden'
		}, 
		bmItemList: {
			color: '#fff',
			padding: '2rem 5rem',
			overflow: 'hidden'
		},
		item: {
			cursor: 'pointer'
		}
    },
    menuItem:{
    	wrapper: {
    		position: 'relative',
			height: '3rem', 
			margin: '3rem 0',
			cursor: 'pointer',
			[media.mobile]: {
				height: '5rem'
			}
    	},
    	img: {
    		position: 'absolute',
			left: '0', 
			top: '0', 
			height: '100%'
    	},
    	name: {
    		position: 'absolute',
			left: '23%', 
			top: 'calc(50% - .65em)',
			fontSize: '1.3em',
			fontWeight: fontWeights.thin,
			[media.mobile]: {
				left: '32%'
			}
    	}
    } 
};

class MenuLayout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isMenuOpen: true
		}		
	}

	closeMenu() {
		this.setState({ isMenuOpen: false });
	}

	render() {
		var self = this;		

		var menuItems = this.props.items.map(function(item) {
			var onClick = () => {
				self.closeMenu(); 
				item.onClick();
			}

			return (
				<div onClick={onClick} style={styles.menuItem.wrapper} key={item.name}> 
					<img src={item.icon} style={styles.menuItem.img} /> 
					<div style={styles.menuItem.name}>{item.name}</div>
				</div> 
			)
		})

		return (
			<div id='outer-container'>
				<Menu styles={ styles.menu } pageWrapId={'page-wrap'} outerContainerId={'outer-container'} isOpen={ this.state.isMenuOpen }>
					{menuItems}
    			</Menu>
    			<main id='page-wrap' style={ styles.view }>
    				{ this.props.pageContent }
    			</main> 
    		</div>
    	);
	}
}

module.exports = Radium(MenuLayout);