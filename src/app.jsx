import React from 'react';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';

import ModelView from './model_view.jsx'
import MenuLayout from './menu.jsx'
import PlaceholderView from './placeholder_view.jsx'
import Api from './api.js'


const API_BASE_URL = 'http://localhost:3000';

class HomeWnd extends React.Component {
	constructor(props) {
		super(props);

		this.api = new Api(API_BASE_URL);

		this.state = {
			view: <PlaceholderView />
		}
	}

	changeView(view) {
		this.setState({ view })
	}

	render() {
		var views = {
			departments: <ModelView 
				api={this.api.departments} 
				fields={[	
					{
						apiName: 'name',
						name: 'Name',
						type: 'text'
					}
				]} />,	
			employees: <ModelView 
				api={this.api.employees} 
				fields={[
					{
						apiName: 'firstName',
						name: 'First name',
						type: 'text'
					},
					{
						apiName: 'lastName',
						name: 'Last name',
						type: 'text'
					},
					{
						apiName: 'departmentId',
						name: 'Department',
						type: 'number'
					}
				]} />
		}

		return (
			<StyleRoot> 
				<MenuLayout
					items={[
						{
							name: 'Departments',
							icon: require('./img/department.svg'), 
							onClick: () => this.changeView(views.departments)
						}, 
						{
							name: 'Employees', 
							icon: require('./img/employee.svg'), 
							onClick: () => this.changeView(views.employees)
						}
					]}  
					pageContent={ this.state.view } /> 
			</StyleRoot> 
		); 
	}
}

ReactDOM.render(
	<HomeWnd />,	
	document.getElementById('root')
);