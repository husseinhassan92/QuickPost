import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
function Following({isAuthenticated, user}) {
    let [following, setFollowing] = useState([])
    
    async function getFollowing() {
        let { data } = await axios.get(`http://127.0.0.1:8000/api/follow/following/${user.id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }
        })
        console.log(data);
        setFollowing(data)
    }

    async function unfollow(otherId) {
        await axios.post(`http://127.0.0.1:8000/api/follow/unfollow/`,
        {
            user:user.id,
            otherUser:otherId,
        },
        
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            }
        }).then(response =>{
            getFollowing()
        })
        
    }

    useEffect(() => {
        getFollowing();
    }, [])
  return (
   <>

{following.map((following) => (

<Col xs={12} sm={6} md={3} className='mb-5'>
    <Card className="friend-card h-100 " >
        <Card.Img variant="top" src={'http://127.0.0.1:8000'+following.image} alt={following.first_name} />
        <Card.Body>
            <Card.Title>{following.first_name} {following.last_name}</Card.Title>
          
          
          
            <Button variant="danger" onClick={()=>unfollow(following.id)}>
                 unfollow
            </Button>
        </Card.Body>
    </Card>
</Col>
))}

   </>
  )
}

const mapStateToProps = state => ({
    isAuthenticated: state.AuthRecducer.isAuthenticated,
    user: state.AuthRecducer.user,
  });
  export default connect(mapStateToProps)(Following);


// import React from 'react'
// import axios from 'axios';
// import { useEffect, useState } from 'react'
// import { Button, Card, Col } from 'react-bootstrap';
// import { connect } from 'react-redux';
// function Following({isAuthenticated, user}) {
//     let [following, setFollowing] = useState([])
    
//     async function getFollowing() {
//         let { data } = await axios.get(`http://127.0.0.1:8000/api/follow/follower/${user.id}/`, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `JWT ${localStorage.getItem("access")}`,
//                 Accept: "application/json",
//             }
//         })
//         console.log(data);
//         setFollowing(data)
//     }

//     async function unfollow(otherId) {
//         try {
//             await axios.post(`http://127.0.0.1:8000/api/follow/unfollow/`, {
//                 user: user.id,
//                 otherUser: otherId,
//             }, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `JWT ${localStorage.getItem("access")}`,
//                     Accept: "application/json",
//                 }
//             });
//             // After unfollowing, refresh the following list
//             getFollowing();
//         } catch (error) {
//             console.error("Error unfollowing:", error);
//         }
//     }

//     async function follow(otherId) {
//         try {
//             await axios.post(`http://127.0.0.1:8000/api/follow/follow/`, {
//                 follower: user.id,
//                 following: otherId,
//             }, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `JWT ${localStorage.getItem("access")}`,
//                     Accept: "application/json",
//                 }
//             });
//             // After following, refresh the following list
//             getFollowing();
//         } catch (error) {
//             console.error("Error following:", error);
//         }
//     }

//     useEffect(() => {
//         getFollowing();
//     }, [])


//     const isFollowing = (id) => {
//         return following.some(follow => follow.id === id);
//     }





//   return (
//    <>

// {following.map((following) => (

// <Col xs={12} sm={6} md={3} className='mb-5'>
//     <Card className="friend-card h-100 " >
//         <Card.Img variant="top" src={'http://127.0.0.1:8000'+following.image} alt={following.first_name} />
//         <Card.Body>
//             <Card.Title>{following.first_name} {following.last_name}</Card.Title>
          
//             {isFollowing(following.id) ?
//                                 <Button variant="danger" onClick={() => unfollow(following.id)}>
//                                     Unfollow
//                                 </Button>
//                                 :
//                                 <Button variant="primary" onClick={() => follow(following.id)}>
//                                     Follow
//                                 </Button>
//                             }
          
//             {/* <Button variant="danger" onClick={()=>unfollow(following.id)}>
//                  unfollow
//             </Button> */}
//         </Card.Body>
//     </Card>
// </Col>
// ))}

//    </>
//   )
// }

// const mapStateToProps = state => ({
//     isAuthenticated: state.AuthRecducer.isAuthenticated,
//     user: state.AuthRecducer.user,
//   });
//   export default connect(mapStateToProps)(Following);