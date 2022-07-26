import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { CircleLoader } from 'react-spinners';
import {Link} from 'react-router-dom';

const PostDetail = () => {

  const [postData, setPostData] = useState();

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
                edges {
                  node {
                    id
                    author {
                      node {
                        name
                        ... on User {
                          id
                          email
                          slug
                        }  
                      }
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
        setPostData(post)
      } catch (error) {
        console.log('error', error);
      }
    };
    const id = window.location.href.split('=')[1];
    post(id);
  }, []);

  return <>{postData
          ? <div className="article-body">
              <h2>{postData.post.title}</h2>
              <Link to={`/postby/?author=${postData.post.author.node.slug}`}><h5>{postData.post.author.node.name}</h5></Link>
              <img src={postData.post.featuredImage.node.mediaItemUrl} alt={postData.post.featuredImage.node.altText} />
              <p>{postData.post.content.replace( /(<([^>]+)>)/ig, '')}</p>
            </div>
          : <div className="spinner"><CircleLoader speedMultiplier={0.5} color={'#00857a'}  size={100}/></div>       
          }
        </>;
};

export default PostDetail;
