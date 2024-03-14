import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import EmojiSelector from '../Reaction/reacte';

const Post = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [reaction, setReaction] = useState(null); // State to store the selected reaction
  const [showEmojis, setShowEmojis] = useState(false); // State to control the visibility of emoji selector
  const postId = useParams();

  const handleReactionSelect = (selectedReaction) => {
    setReaction(selectedReaction); // Set the selected reaction
    setShowEmojis(false); // Hide the emoji selector after selecting a reaction
    // You can perform additional actions here, such as sending the selected reaction to the server
  };

  useEffect(() => {
    axios.get(`https://dummyapi.io/data/v1/post/${postId.id}`, {
      headers: {
        'app-id': '65d08f07b536e68ad8626e8c',
      },
    })
      .then((response) => {
        setPost(response.data);
        return axios.get(`https://dummyapi.io/data/v1/post/${postId.id}/comment?limit=10`, {
          headers: {
            'app-id': '65d08f07b536e68ad8626e8c',
          },
        });
      })
      .then((response) => {
        setComments(response.data.data);
      })
      .catch((err) => console.log('Error:', err));
  }, []);

  const emojis = ['😊', '😢', '❤️', '👍', '👎'];

  return (
    <div className='container w-50 pt-4'>
      {post && (
        <div className='row'>
          <div className='col'>
            <div className='card text-light bg-dark'>
              <div className='card-body'>
                <div className='d-flex align-items-center mb-3'>
                  <img src={post.owner.picture} alt="Owner" className='rounded-circle me-2 mb-2' style={{ width: '50px', height: '50px' }} />
                  <div className='align-self-center mb-2'>{post.owner.firstName} {post.owner.lastName}</div>
                  <div className='ms-auto text-light'>{new Date(post.publishDate).toLocaleString()}</div>
                </div>
                <img src={post.image} alt="Post" className='img-fluid rounded mb-3' />
                <h5 className='card-title text-light'>{post.title}</h5>
                <p className='card-text text-light'>{post.text}</p>
                <div className='row'>
  <div className='pb-3 col-6 text-start'>
    {/* Dropdown button for selecting reaction */}
    <div className="dropdown">
      {/* Button to toggle the visibility of emoji selector and set the reaction */}
      <button className="btn btn-primary" onClick={() => setShowEmojis(!showEmojis)} style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}>
        {reaction === null ? 'Show Reaction' : reaction}
      </button>
      {/* Emoji selector shown when reaction is selected */}
      {showEmojis && (
        <div className="emoji-selector">
          {emojis.map((emoji, index) => (
            <button className="btn btn-primary mx-1" key={index} onClick={() => handleReactionSelect(emoji)} style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}>
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
  <div className='pb-3 col-3 text-center'><i className="bi bi-chat-dots-fill pe-1"></i>  {post.likes}  Comments</div>
  <div className='pb-3 col-3 text-end pe-4' ><i className="bi bi-share pe-1"></i>  {post.likes}  Share</div>
</div>
                {comments.map((comment) => (
                  <div key={comment.id} className='card mb-2 bg-dark  '>
                    <div className='card-body border-bottom border-secondary border-3 '>
                      <div className='d-flex align-items-center pb-2'>
                        <img src={comment.owner.picture} alt="Comment Owner" className='rounded-circle me-2 text-light' style={{ width: '30px', height: '30px' }} />
                        <div className='text-light pt-2'>{comment.owner.firstName} {comment.owner.lastName}</div>
                      </div>
                      <p className='card-text text-light'>{comment.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
