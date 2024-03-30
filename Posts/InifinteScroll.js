import axios from 'axios'
import { useEffect, useState } from 'react'

const InifinteScroll = () => {
  const [data, setData] = useState([])
  //const [loading, setLoading] = useState(true)
  //const [hasMore, setHasMore] = useState(false)


  useEffect(() => {
    //setLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    axios.get(`http://localhost:8000/api/post/all/`, config)
      .then(response => {
        console.log(response.data.posts);
        setData(prevData => {
          return [...new Set([...prevData, ...response.data.posts])]
        })
        //setHasMore(response.data.posts.length > 0)
        //setLoading(false)
        //console.log(response.data.posts)
      })
      .catch(err => console.log('Error:', err))
  }, [])
  return {data}

}

export default InifinteScroll