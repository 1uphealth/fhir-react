import Fancy from './Fancy'
import TodoList from './TodoList'
import Patient from './components/resources/Patient'
import MedicationStatement from './components/resources/MedicationStatement';
import MedicationOrder from './components/resources/MedicationOrder';
var Resources = {Patient, MedicationStatement}

module.exports = {
		Resources: Resources,
    MedicationStatement: MedicationStatement,
		Patient: Patient,
		Fancy: Fancy,
		TodoList: TodoList,
    MedicationOrder: MedicationOrder
}
