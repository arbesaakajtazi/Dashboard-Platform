/**
 * Created by ArbesaKajtazi on 16/10/2019.
 */
import {hot} from 'react-hot-loader/root'
import React, {Suspense} from 'react'
import {Provider} from 'react-redux'
import store, {history} from 'Store'
import {Route, Router, Switch} from 'react-router-dom'

const App = () => {
  return (
    <div>
        <h2>Hello, World!</h2>
    </div>
  )
}
export default hot(App)