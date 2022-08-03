import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { CircleLoader } from 'react-spinners';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { gql, useMutation } from '@apollo/client';
import CommentCard from '../CommentCard';

const POST_COMMENT = gql`
mutation CREATE_COMMENT($commentOn: Int!, $content: String!, $author: String!) {
  createComment(input: {
    commentOn: $commentOn, 
    content: $content, 
    author: $author
  }) {
    success
    comment {
      id
      content
      author {
        node {
          name
        }
      }
    }
  }
}
`

const PostDetail = () => {

  const [postData, setPostData] = useState();
  const [comments, setComments] = useState([]);
  const [postComment] = useMutation(POST_COMMENT);

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
                  id
                }
              }
              title(format: RENDERED)
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                }
              }
              databaseId
            }
          }`
        });
        const json = await res;
        const post = json.data.data;
        const orderComments = post.post.comments.nodes.reverse();
        // console.log(post);
        setPostData(post);
        setComments(orderComments);
      } catch (error) {
        console.log('error', error);
      }
    };
    const id = window.location.href.split('=')[1];
    post(id);
  }, []);

  const paintComments = () => comments.map((comment, i) =><CommentCard comment={comment} key={uuidv4()}/>);

  const handleSubmit = (e) => {
    e.preventDefault();
    const authorName = e.target.elements.author.value;
    const contentBody = e.target.elements.content.value;
    const comment = {'author':{'node':{'name': authorName}} , 'id': uuidv4(), 'content': contentBody};
    if(authorName.length > 0 && contentBody.length > 0 ){
      setComments([...comments, comment]);
    };
    postComment({ variables: {'commentOn': postData.post.databaseId, 'content': contentBody, 'author': authorName}});
    e.target.reset();
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
