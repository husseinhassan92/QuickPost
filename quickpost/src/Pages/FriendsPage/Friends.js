import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncFriends,
  getAllFriends,
} from "../../Store/Reducers/friendSlice";
import {
  Card,
  Container,
  Row,
  Spinner,
  Alert,
  Col,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link
import "./Friends.css";
import Leftbar from "../../Components/LeftSide/LeftSide";
import axios from "axios";
import { changeFavList } from "../../Store/Actions/FavListAction";

const Friend = ({ friend ,FavList}) => {
  return (
    <Col xs={12} sm={6} md={3} className="mb-5">
      <Card className="friend-card h-100 ">
        <Card.Img variant="top" src={friend.picture} alt={friend.Name} />
        <Card.Body>
          <Card.Title>{friend.firstName}</Card.Title>
          <Button variant="danger">
            <i className="fa-solid fa-heart-broken"></i> unfriend
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const FriendListPage = ({ user , FavList}) => {
  const dispatch = useDispatch();
  const friends = useSelector(getAllFriends);
  const friendsStatus = useSelector((state) => state.friends.friendsStatus);
  //let FavList = useSelector((state) => state.FavListReduce.FavList);

  useEffect(() => {
    console.log(FavList)
    dispatch(fetchAsyncFriends());
  }, [dispatch]);

  const follow = (id) => {
    const data = {
      follower: user.id,
      following: id,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    axios
      .post(`http://127.0.0.1:8000/api/follow/follow/`, data, config)
      .then((response) => {
        // Handle successful response, update UI to reflect the follow action
        console.log("Followed successfully");
        console.log(typeof(id), id)

        dispatch(changeFavList(FavList.push(id))); // Update state to indicate following
      })
      .catch((error) => {
        // Handle errors
        console.error("Error following user:", error);
      });
  };

  async function unfollow(id) {
    await axios
      .post(
        `http://127.0.0.1:8000/api/follow/unfollow/`,
        {
          user: user.id,
          otherUser: id,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem("access")}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        const indexOfObject = FavList.findIndex((profileId) => {
          return profileId === id;
        });
        FavList.splice(indexOfObject, 1);
        dispatch(changeFavList(FavList));
      });
  }
  return (
    <div className="container-fluid">
      <Row>
        <div className="px-0 col-2 vh-100">
          <Leftbar isHomePage={false} />
        </div>
        <div className="col-9" >
          <h1 className="text-center main-title my-4">Friends List</h1>

          {friendsStatus === "LOADING" && <Spinner animation="border" />}
          {friendsStatus === "FAILED" && (
            <Alert variant="danger">Failed to fetch friends.</Alert>
          )}
          {friendsStatus === "SUCCEEDED" && (
            <Row className="friend-list">
              {friends.map((friend) => (
                <Col
                  key={friend.user_account}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <Card style={{ height: "21rem" }}>
                    {friend.user_account !== user.id ? (
                      <Link to={`/OtherProfile/${friend.user_account}`}>
                        {" "}
                        {/* Use friend.id here */}
                        <Card.Img
                          variant="top"
                          src={friend.image}
                          alt="Friend"
                          style={{ height: "13rem" }}
                        />
                      </Link>
                    ) : (
                      <Link to="/profile">
                        <Card.Img
                          variant="top"
                          src={friend.image}
                          alt="Friend"
                          style={{ height: "13rem" }}
                        />
                      </Link>
                    )}
                    <Card.Body>
                      <Card.Title>
                        {friend.first_name.charAt(0).toUpperCase() +
                          friend.first_name.slice(1)}{" "}
                        {friend.last_name.charAt(0).toUpperCase() +
                          friend.last_name.slice(1)}
                      </Card.Title>
                      {friend.user_account !== user.id &&
                        (FavList.includes(friend.user_account) ? (
                          <button
                            type="button"
                            className="btn-2 text-light mt-3 px-5"
                            onClick={() => unfollow(friend.user_account)}
                            
                            style={{
                              zIndex: 1,
                            
                              
                            }}
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn-2 text-light mt-3 px-5"
                            onClick={() => follow(friend.user_account)}
                            style={{
                              zIndex: 1,
                            
                            }}
                          >
                            follow
                          </button>
                        ))}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Row>
      </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthRecducer.isAuthenticated,
  user: state.AuthRecducer.user,
  FavList:state.FavListReduce.FavList
});
export default connect(mapStateToProps)(FriendListPage);
