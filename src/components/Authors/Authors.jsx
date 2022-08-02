import React, {useEffect, useState} from "react";
import axios from 'axios';
import AuthorCard from '../AuthorCard';
import { v4 as uuidv4 } from 'uuid';

const Authors = () => {

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async() => {
      try {
        const res = await axios.post('http://gatsby.local/graphql', {
          query: `query AllAuthors {
            users {
              nodes {
                avatar {
                  url
                }
                firstName
                lastName
                name
                nickname
                slug
              }
            }
          }`
        });
        const json = await res.data.data;
        setAuthors(json.users.nodes)
      } catch (error) {
        console.log('Error: ', error)
      }
    };
    fetchAuthors()
  }, []);

  const paintCards = () => authors.map((author, id)=> <AuthorCard author={author} key={uuidv4()}/>);

  return <div>{paintCards()}</div>;
};

export default Authors;
