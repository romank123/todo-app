import 'normalize.css/normalize.css'
import 'mdb-ui-kit/css/mdb.min.css'
import '../sass/style.sass'
import { importAll } from './functions.js'
import './todo'

import * as mdb from 'mdb-ui-kit' // lib
import { Input } from 'mdb-ui-kit' // module

// import all media from public
importAll(
  require.context(
    '../../public',
    true,
    /\.(png|svg|jpg|jpe?g|gif|mov|mp4|ico|webmanifest|xml)$/
  )
)

console.log("hello")
$('.terminal').addClass('hi')
