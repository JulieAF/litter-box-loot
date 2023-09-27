export const getAllProfiles = () => {
  return fetch(`http://localhost:8088/profiles?_expand=user`).then((res) =>
    res.json()
  );
};

export const getProfileByUser = (userId) => {
  return fetch(`http://localhost:8088/users?id=${userId}&_embed=profiles`).then(
    (res) => res.json()
  );
};
