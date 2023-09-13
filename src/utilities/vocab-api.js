import sendRequest from './send-request';

const BASE_URL = '/api/vocab';

export function showCurrentVocab(){
    return sendRequest(`${BASE_URL}/current`)
}
export function createVocab(vocabData) {
    return sendRequest(`${BASE_URL}/new}`, 'POST', {vocabData})
}
export function deleteVocab(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}
export function editVocab(id, vocabData) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', {vocabData})
}
export function getById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}