import * as actionTypes from './action-types'
import TodoService from '../../services/todo'
import * as todoSelectors from './reducer'

export var getExistingTodos = () => {
    return async (dispatch, getState) => {
        try {
            const todoArray = await TodoService.getExistingTodos()
            dispatch({type: actionTypes.TODOS_FETCHED, todos: todoArray})
        } catch (error) {
            console.log(error)
        }
    }
}

export var addTodo = todoText => {
    return (dispatch, getState) => {
        let payload = {
            index: todoSelectors.getTodos(getState()).length+1,
            text: todoText
        }
        dispatch({type: actionTypes.ADD_TODO, payload})
    }
}