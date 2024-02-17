import React, { useCallback, useRef, useState } from 'react'
import InifinteScroll from './InifinteScroll'

const Posts = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const {
    loading, data, hasMore
  } = InifinteScroll(pageNumber)
  const observer = useRef()

  const lastPostElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <>
      <div>ListPosts</div>
      <div>
        {data.map((post, index) => {
          if (data.length === index + 1) {
            return <div ref={lastPostElementRef} key={post.id}>{post.text}</div>
          } else {
            return <div key={post.id}>{post.text}</div>
          }
        })}
        {loading && <div className="d-flex justify-content-center">
          <div className="spinner-grow text-secondary text-center" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}
      </div>
    </>
  )
}

export default Posts