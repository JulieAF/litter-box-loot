export const getAllPosts = () => {
  return fetch(`http://localhost:8088/posts`).then((res) => res.json());
};

export const getPostByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/posts?userId=${userId}&_expand=user&_expand=category`
  ).then((res) => res.json());
};

export const getPostByPostId = (postId) => {
  return fetch(
    `http://localhost:8088/posts?id=${postId}&_expand=user&_expand=category`
  ).then((res) => res.json());
};

export const editedPost = (post) => {
  return fetch(`http://localhost:8088/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const deletePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  });
};
