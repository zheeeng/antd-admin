import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import { message } from 'antd'

import React from 'react'
import ReactDom from 'react-dom'

const testFunc = () => {
  const message = `rewrited message`
  const arr = [{
    message: `I'm string message, not component!`,
    dva: `I'm string dva`,
    createLoading: `I'm string createLoading`,
    browserHistory: `I'm string browserHistory`,
    React: `I'm string React`,
    ReactDom: `I'm string ReactDom`
  }]
  const res = arr.map(({ message, dva, createLoading, browserHistory, React, ReactDom }) => ({ message, dva, createLoading, browserHistory, React, ReactDom }))
  console.log(res)
}

testFunc()

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError (error) {
    message.error(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
