import React from 'react'
import ReactDOM from 'react-dom'

import style from './styles.css'

const node = document.createElement('div')
document.body.append(node)
ReactDOM.render(<h1 className={style.widget}>This is injectedContent</h1>, node)
