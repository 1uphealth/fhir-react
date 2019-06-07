import Fancy from './Fancy'
import TodoList from './TodoList'
import Patient from './components/resources/Patient'
import TestComponent from './components/resources/TestComponent'
import Encounter from './components/resources/Encounter'


var Resources = {Patient,TestComponent,Encounter}

module.exports = {
		Resources: Resources,
		Patient: Patient,
		Fancy: Fancy,
		TodoList: TodoList
}
