import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { CircleLoader } from 'react-spinners';
import {Link} from 'react-router-dom';
import CommentCard from '../CommentCard';

const PostDetail = () => {

  const [postData, setPostData] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const post = async(id) => {
      try {
        const res = axios.post('http://gatsby.local/graphql', {
          query: `query PostById($id: ID = "${id}") {
            post(id: $id) {
              author {
                node {
                  name
                  slug
                }
              }
              content
              comments {
                nodes {
                  content
                  author {
                    node {
                      name
                    }
                  }
                }
              }
              title(format: RENDERED)
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }`
        });
        const json = await res;
        const post = json.data.data;
        setPostData(post);
        setComments(post.post.comments.nodes);
      } catch (error) {
        console.log('error', error);
      }
    };
    const id = window.location.href.split('=')[1];
    post(id);
  }, []);

  console.log('Esto es postData', postData);

  const paintComments = () => comments.map((comment, i) =><CommentCard comment={comment} id={i}/>);

  const handleSubmit = (e) => {
    e.preventDefault();
    const author = e.target.elements.author.value;
    const content = e.target.elements.content.value;
    const comment = {'author':{'node':{'name': author}} , 'content': content};
    if(author.length > 0 && content.length > 0 ){
      setComments([...comments, comment]);
    };
  }

  return <>{postData
          ? <>
            <div className="article-body">
              <h2>{postData.post.title}</h2>
              <Link to={`/postby/?author=${postData.post.author.node.slug}`}><h5>{postData.post.author.node.name}</h5></Link>
              <img src={postData.post.featuredImage.node.mediaItemUrl} alt={postData.post.featuredImage.node.altText} />
              <p>{postData.post.content.replace( /(<([^>]+)>)/ig, '')}</p>
            </div>
            <div className='article-comments'>
              <h3>Comments</h3>
              {paintComments()}
              <form onSubmit={handleSubmit}>
                <div className="author-comment">
                  <label htmlFor="author"><b>Name:</b> </label>
                  <input type="text" name="author"/>
                </div>
                <div className="content-comment">
                  <label htmlFor="content"><b>Comment:</b> </label>
                  <textarea name="content" rows="4" cols="50"/>
                </div>
                <input type="submit" value="Send" className="send-comment"/>
              </form>
            </div>
            </>
          : <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>       
          }
        </>;
};

export default PostDetail;
