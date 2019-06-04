import * as actionTypes from './action-types'

const initialState = {
    todos: []
}

export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case actionTypes.TODOS_FETCHED:
            return Object.assign({}, state, {
                todos: action.todos
            })
        case actionTypes.ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        id: action.payload.index,
                        text: action.payload.text
                    }
                ]
            })
        default:
            return state
    }
}

//selectors
export function getTodos(state) {
    return state.todoList.todos
}