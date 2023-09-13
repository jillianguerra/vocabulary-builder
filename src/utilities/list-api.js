import sendRequest from './send-request';

const BASE_URL = '/api/lists';

export function createList(title) {
    return sendRequest(`${BASE_URL}/new`, 'POST', title)
}
export function getCurrentList() {
  return sendRequest(`${BASE_URL}/`);
}
export function getUserLists() {
    return sendRequest(`${BASE_URL}/userlists`)
}
export function editList(listId, newTitle, vocabArr) {
    return sendRequest(`${BASE_URL}/${listId}`, 'PUT', {title: newTitle, vocab: vocabArr})
}
export function deleteList(listId) {
    return sendRequest(`${BASE_URL}/${listId}`, 'DELETE')
}

// export function addItemToCart(itemId) {
//     // Just send itemId for best security (no pricing)
//     return sendRequest(`${BASE_URL}/cart/items/${itemId}`, 'POST');
//   }
// router.get('/', userCtrl.auth, listCtrl.showCurrentList)
// router.get('/userlists', userCtrl.auth, listCtrl.showUserLists)
// router.get('/all', listCtrl.showAll)
// router.post('/new', userCtrl.auth, listCtrl.createList)
// router.put('/:id', userCtrl.auth, listCtrl.updateList)
// router.delete('/:id', userCtrl.auth, listCtrl.deleteList)
// router.get('/:id', listCtrl.showOneList)