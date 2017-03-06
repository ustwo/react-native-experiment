import { createStore } from 'redux'
import mapWrapperApp from '../reducers/reducers'

export default function configureStore() {
  let store = createStore(mapWrapperApp)

  return store
}
