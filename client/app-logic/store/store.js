import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/index'
import rootSaga from '../sagas/index'

const configureStore = () => {
	const saga = createSagaMiddleware()
	const logger = createLogger()
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose
	let middleware = null

	if (process.env.NODE_ENV !== 'production') {
		middleware = applyMiddleware(logger, saga)
	} else {
		middleware = applyMiddleware(saga)
	}

	const addReduxDevTools = () => {
		if (process.env.NODE_ENV !== 'production') {
			return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		}
	}

	const store = createStore(rootReducer, addReduxDevTools(), composeEnhancers(middleware))

	saga.run(rootSaga)

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const newReducer = require('../reducers/index').default
			store.replaceReducer(newReducer)
		})
	}

	return store
}

export default configureStore
