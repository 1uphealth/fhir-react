const baseEndpoint = "http://192.168.1.50:8000"

class TodoService {
    async getExistingTodos() {
        const url = `${baseEndpoint}/todo`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Error while getting existing todos from database')
        }
        const data = await response.json()
        return data
    }
}

export default new TodoService()