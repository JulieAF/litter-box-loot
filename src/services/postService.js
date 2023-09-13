export const getAllPosts = () => {
  return fetch(`http://localhost:8088/posts`).then((res) => res.json());
};

export const getPostDetails = (userId) => {
  return fetch(
    `http://localhost:8088/posts?userId=${userId}&_expand=user&_expand=category`
  ).then((res) => res.json());
};
