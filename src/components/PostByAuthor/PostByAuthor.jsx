import React, {useEffect, useState} from "react";
import axios from 'axios';
import PostCard from '../PostCard';

const PostByAuthor = () => {

  const [postBy, setPostBy] = useState([]);

  useEffect(() => {
    const postsByAuthor = async(slug) => {
      try {
        const res = axios.post('http://gatsby.local/graphql', {
          query: `query PostByAuthor {
            posts(where: {authorName: "${slug}"}) {
              edges {
                node {
                  id
                  author {
                    node {
                      id
                      name
                      slug
                      username
                    }
                  }
                  title
                  excerpt
                  featuredImage {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }`
        });
        const json = await res;
        const posts = json.data.data.posts.edges;
        setPostBy(posts)
      } catch (error) {
        console.log('error', error);
      }
    };
    const slug = window.location.href.split('=')[1];
    postsByAuthor(slug);
  }, []);

  const paintCards = () => postBy.map((post, id)=> <PostCard post={post.node} key={id}/>)

  return <div>{paintCards()}</div>;
};

export default PostByAuthor;
