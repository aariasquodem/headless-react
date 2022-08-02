import React, {useEffect, useState} from "react";
import axios from 'axios';
import PostCard from '../PostCard';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const res = await axios.post('http://gatsby.local/graphql', {
          query: `query AllPosts {
            posts {
              nodes {
                author {
                  node {
                    name
                    slug
                    id
                    username
                  }
                }
                id
                title
                excerpt
                featuredImage {
                  node {
                    mediaItemUrl
                    altText
                  }
                }
              }
            }
          }`
        });
        const json = await res.data.data;
        const posts = json.posts.nodes;
        setAllPosts(posts);
      } catch (error) {
        console.log('Error: ', error)
      }
    };
    fetchPosts()
  }, []);

  const paintCards = () => allPosts.map((post, id)=> <PostCard post={post} key={uuidv4()}/>)

  return <div>{paintCards()}</div>;
};

export default Home;
