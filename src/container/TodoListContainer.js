import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../store/todo-list/reducer'
import * as TodoListAction from '../store/todo-list/actions'

let input

class TodoListContainer extends Component {
    componentDidMount() {
		this.props.dispatch(TodoListAction.getExistingTodos())
	}

    render() {
        return (
            <div>
                <input type="text" ref={node => {input=node}} />
                <button onClick={this.handleAddTodo.bind(this)}>Add</button>
                <ul>
                    {
                        this.props.todos.map((item) => {
                            return (
                                <li key={item.id}>{item.text}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    handleAddTodo() {
        this.props.dispatch(TodoListAction.addTodo(input.value))
        input.value = null
    }
}

function mapStateToProps(state) {
	return {
		todos: selectors.getTodos(state)
	}
}

export default connect(mapStateToProps)(TodoListContainer)