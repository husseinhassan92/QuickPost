import React, { useCallback, useRef, useState } from 'react'
import InifinteScroll from './InifinteScroll'
import Leftbar from '../LeftSide/LeftSide'
import Rightbar from "../RightSide/RightSide"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import CreatePost from '../CreatePost/CreatePost'

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
      < div className="container-fluid" >
        <div className="row p-0">
          <div className="col-3 p-0 ">
            <Leftbar />
          </div>
          <div className="col-6 ">
            <div>
                <CreatePost />
              {data.map((post, index) => {
                if (data.length === index + 1) {
                  return (
                    <div className='container  pt-4 ' ref={lastPostElementRef} key={post.id} >
                      <div className='row '>
                        <div className='col'>
                          <div className='card text-light bg-dark' >
                            <div className='card-body' style={{ width: "30rem", height: "40rem" }}>
                              <div className='d-flex align-items-center mb-3'>
                                <img src={post.owner.picture} alt="Owner" className='rounded-circle me-2 mb-2 ' style={{ width: '50px', height: '50px' }} />
                                <div className='align-self-center mb-2 '>{post.owner.firstName} {post.owner.lastName}</div>
                                <div className='ms-auto text-light '>{new Date(post.publishDate).toLocaleString()}</div>
                              </div>
                              <div>
                                <Link to={`/post/${post.id}`}>
                                <img src={post.image} alt="Post" className='img-fluid rounded mb-3 ps-1 w-100'/>
                                </Link>
                                <h5 className='card-title text-light mt-3'>{post.title}</h5>
                                <p className='card-text text-light'>{post.text}</p>
                              </div>
                              <div className='row mt-5'>
                                <div className='pb-3 col-4 text-start'><i className="bi bi-heart text-light pe-1"></i>  {post.likes}  Likes</div>
                                <div className='pb-3 col-4 text-center'><i className="bi bi-chat-dots-fill pe-1"></i>  {post.likes}  Comments</div>
                                <div className='pb-3 col-4 text-end pe-4' ><i className="bi bi-share pe-1"></i>  {post.likes}  Share</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className='container pt-4 ' key={post.id}  >
                      <div className='row '>
                        <div className='col'>
                          <div className='card text-light bg-dark'>
                            <div className='card-body h-50' >
                              <div className='d-flex align-items-center mb-3 '>
                                <img src={post.owner.picture} alt="Owner" className='rounded-circle me-2 mb-2 ' style={{ width: '50px', height: '50px' }} />
                                <div className='align-self-center mb-2 '>{post.owner.firstName} {post.owner.lastName}</div>
                                <div className='ms-auto text-light '>{new Date(post.publishDate).toLocaleString()}</div>
                              </div>
                              <div>
                              <Link to={`/post/${post.id}`}>
                                <img src={post.image} alt="Post" className='img-fluid rounded mb-3 ps-1 w-100'/>
                                </Link>
                                <h5 className='card-title text-light mt-3'>{post.title}</h5>
                                <p className='card-text text-light'>{post.text}</p>
                              </div>
                              <div className='row mt-5'>
                                <div className='pb-3 col-4 text-start'><i className="bi bi-heart text-light pe-1"></i>  {post.likes}  Likes</div>
                                <div className='pb-3 col-4 text-center'><i className="bi bi-chat-dots-fill pe-1"></i>  {post.likes}  Comments</div>
                                <div className='pb-3 col-4 text-end pe-4' ><i className="bi bi-share pe-1"></i>  {post.likes}  Share</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
              {loading && <div className="d-flex justify-content-center">
                <div className="spinner-grow text-secondary text-center" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>}
            </div>
          </div>
          <div className="col-3 p-0 m-0 ">
            <Rightbar />
          </div>
        </div>
      </div >
    </>
  )
}

export default Posts






