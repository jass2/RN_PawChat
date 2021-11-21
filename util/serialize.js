import { timeSince } from './date';

export function serializePost(post) {
  return {
    id: post.item.id,
    title: post.item.data().title,
    body: post.item.data().text,
    author: post.item.data().poster_id,
    color: post.item.data().color,
    timestamp: post.item.data().timestamp
      ? timeSince(post.item.data().timestamp.toDate())
      : '',
  };
}

export function serializeComment(comment) {
  return {
    id: comment.item.id,
    parent: comment.item.data().parent,
    poster: comment.item.data().poster,
    text: comment.item.data().text,
    timestamp: comment.item.data().timestamp
      ? timeSince(comment.item.data().timestamp.toDate())
      : '',
  };
}
