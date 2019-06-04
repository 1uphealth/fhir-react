import React, { Component } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from './store/reducers'
import TodoListContainer from './container/TodoListContainer'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))

class TodoList extends Component {
	render() {
		return (
			<Provider store={store}>
				<TodoListContainer />
			</Provider>
		);
	}
}

export default TodoList