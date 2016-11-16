import configureStoreDev from './configureStore.dev'
import configureStoreProd from './configureStore.prod'

let configureStore // eslint-disable-line import/no-mutable-exports
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  configureStore = configureStoreProd
} else {
  configureStore = configureStoreDev
}

export default configureStore
