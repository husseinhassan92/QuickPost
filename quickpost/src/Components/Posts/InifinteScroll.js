import axios from 'axios'
import { useEffect, useState } from 'react'

const InifinteScroll = (pageNumber) => {
    const  [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(false)


    useEffect(() => {
        setLoading(true)
        axios.get(`https://dummyapi.io/data/v1/post?page=${pageNumber}&limit=10`,{
          headers:{
            "app-id":"65d08a4661de33117cf6503f"
          }
        })
        .then(response => {
            setData(prevData=>{
                return[...prevData, ...response.data.data]
            })
            setHasMore(response.data.data.length > 0)
            setLoading(false)
          console.log(response.data.data)
        })
        .catch(err => console.log('Error:', err))
      },[pageNumber])
  
    return { loading,data, hasMore }
  
}

export default InifinteScroll