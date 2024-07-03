import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PageRouter(routerName) {
    const navigation=useNavigate()
   navigation(routerName)
   
}
