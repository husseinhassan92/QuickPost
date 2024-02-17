import axios from 'axios'
import React, { useEffect } from 'react'

const ListPosts = () => {
  useEffect(() => {
    axios.get("https://dummyapi.io/data/v1/post?page=1&limit=10",{
      headers:{
        "app-id":"65d08a4661de33117cf6503f"
      }
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log('Error:', err))
  },[])
  return (
    <div>ListPosts</div>
  )
}

export default ListPosts