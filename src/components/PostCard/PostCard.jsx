import React from "react";
import {Link} from 'react-router-dom';

const PostCard = ({post}) => {
  return <div className="post-card">
    <Link to={`/post/?id=${post.id}`}><h3 className="title">{post.title}</h3></Link>
    <p className="excerpt">{post.excerpt.replace( /(<([^>]+)>)/ig, '').slice(0, -11)}[&hellip;]</p>
    <p className="author"><b>Author:</b><Link to={`/postby/?author=${post.author.node.slug}`}> {post.author.node.name}</Link></p>
    <img src={post.featuredImage.node.mediaItemUrl} alt="" className="featured-image"/>
  </div>;
};

export default PostCard;
