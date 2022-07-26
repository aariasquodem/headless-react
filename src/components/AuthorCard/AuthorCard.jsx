import React from "react";
import { Link } from "react-router-dom";

const AuthorCard = ({author}) => {

  return <div className="author-card">
          <img src={author.avatar.url} alt={author.name}/>
          <Link to={`/postby/?author=${author.slug}`}><h4>{author.name}</h4></Link>
        </div>;
};

export default AuthorCard;
