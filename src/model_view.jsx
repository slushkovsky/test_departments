import React from 'react';
import Radium from 'radium';

import {colors} from './styles.js';


var styles = {
	ctrlBtns: {
		width: '48px',
		color: colors.primary, 
		opacity: '.8'
	},
	ctrlBtn: {
		cursor: 'pointer'
	},
	addBtnWrapper: {
		width: '100%',
		textAlign: 'center'
	},
	addBtn: {
		background: colors.primary,
		opacity: '.8',
		':hover': {
			opacity: '.7'
		}
	}
}

class ModelView extends React.Component {
	constructor(props) {
		super(props);

		this.init();
	}

	componentWillReceiveProps(newProps) {
		this.props = newProps;

		this.init();
	}

	init() {
		this.state = {
			data: [],
			editMode: {},
			backupValues: {}
		};
		
		this.props.api.get((data) => this.setState({ data }) );
	}

	changeItem(index, field, newValue) {
		var data = this.state.data.slice(); 
        data[index][field] = newValue;  	
		this.setState({ data });
	}

	deleteItem(index) {
		var data = this.state.data.slice(); 
		this.props.api.del(data[index].id, () => {
			data.splice(index, 1); 
			this.setState({ data });	
		}); 
	}

	addItem() {
		this.props.api.add({}, () => {
			console.log('onFinish')
			this.props.api.get((data) => {this.setState({ data }); });
		});
	}

	applyChanges(index) {
        this.props.api.upd(this.state.data[index].id, this.state.data[index]);
        this.setEditMode(index, false);
	}

	resetChanges(index) {
		var data = this.state.data.slice(); 
		data[index] = this.state.backupValues[index]; 
		this.setState({ data });
		this.setEditMode(index, false);
	}

	setEditMode(index, value) {
		var editMode = Object.assign({}, this.state.editMode)
		var backupValues = Object.assign({}, this.state.backupValues)

		if (value === true) {
			editMode[index] = value;
			backupValues[index] = Object.assign({}, this.state.data[index]);
		}
		else {
			delete editMode[index];
			delete backupValues[index];
		}

		this.setState({ editMode, backupValues }); 
	}

	render() {
		var self = this;

		var items = this.state.data.map(function(item, index) {
			var fields = self.props.fields.map(function(field) {
				var tag = undefined; 

				if (self.state.editMode[index] === true)
					tag = <input 
	          			type={field.type} 
	          			value={ item[field.apiName] } 
	          			onChange={ (e) => { 
	          				var value = e.target.value

	          				if (field.type === 'number')
	          					value = parseInt(value);

	          				self.changeItem(index, field.apiName, value); 
	          			}} 
	          		/>
	          	else
	          		tag = <div>{ item[field.apiName] }</div>

				return (
					<td key={field.apiName}>
						<div className='mui-textfield mui-textfield--float-label'>
							{tag}
						</div> 
					</td>
				) 
			})

			var ctrlBtns = null;

			if (self.state.editMode[index] === true) 
				ctrlBtns = (
					<td style={styles.ctrlBtns}>
          				<i 
          					className="material-icons"
          					style={ styles.ctrlBtn }
          					onClick={() => { self.applyChanges(index); }} 
          				>check</i>
          				<i 
          					className="material-icons"
          					style={ styles.ctrlBtn }
          					onClick={() => { self.resetChanges(index); }} 
          				>close</i> 
          			</td>
				);
			else 
				ctrlBtns = (
					<td style={styles.ctrlBtns}>
          				<i 
          					className="material-icons"
          					style={ styles.ctrlBtn } 
          					onClick={() => { self.setEditMode(index, true); }}
          				>edit</i>
          				<i 
          					className="material-icons"
          					style={ styles.ctrlBtn }
          					onClick={() => self.deleteItem(index) } 
          				>delete</i> 
          			</td>
				);

      		return (
        		<tr key={item.id}>
          			<td>{ item.id }</td>
          			{ fields }
          			{ ctrlBtns }
       			</tr>
      		);
    	});

    	var head = this.props.fields.map(function(field) {
    		return (
    			<th key={field.apiName}>{ field.name }</th>
    		);
    	});

		return (
			<div> 
				<table className='mui-table'> 
					<thead> 
						<tr> 
							<th>#</th>
							{ head }
						</tr> 
					</thead>
					<tbody> 
						{ items }
					</tbody>  
				</table>

				<div style={ styles.addBtnWrapper }> 
					<button className="mui-btn mui-btn--primary" style={ styles.addBtn } onClick={() => self.addItem()}>Add</button>
				</div>  
			</div>
		);
	}
}

module.exports = Radium(ModelView)