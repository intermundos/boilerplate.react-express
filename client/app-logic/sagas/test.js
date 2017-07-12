import { takeEvery }       from 'redux-saga/effects'
import { take, put, call, fork }       from 'redux-saga/effects'

// Watcher saga
export function* watchEvent() {
  console.log('saga/WATCH_EVENT_LISTENER_ON')
  yield takeEvery('EVENT', () => { console.log('ON')})
}

export default function* test() {
  yield fork(watchEvent)
}