import React from "react";

const CommentCard = ({comment}) => {

  return <div className="comment">
          <p><b>Comment:</b> {comment.content.replace( /(<([^>]+)>)/ig, '')}</p>
          <p className="comment-author"><b>Author:</b> {comment.author.node.name}</p>
        </div>;
};

export default CommentCard;
