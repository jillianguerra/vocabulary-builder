import sendRequest from './send-request';

const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(`${BASE_URL}/`, 'POST', userData)
}
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}
export function editUser(id, userData) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', userData)
}
export function deleteUser(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}
// router.post('/', userCtrl.createUser, listCtrl.createList)
// router.post('/login', userCtrl.loginUser)
// router.put('/:id', userCtrl.auth, userCtrl.updateUser)
// router.delete('/:id', userCtrl.auth, userCtrl.deleteUser, listCtrl.deleteAllLists)
