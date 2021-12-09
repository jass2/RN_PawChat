import { timeSince } from './date';

export function serializePost(post) {
  return {
    id: post.item.id,
    title: post.item.title,
    body: post.item.text,
    author: post.item.poster_id,
    color: post.item.color,
    timestamp: post.item.timestamp
      ? timeSince(post.item.timestamp.toDate())
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
