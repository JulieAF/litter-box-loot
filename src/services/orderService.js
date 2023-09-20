export const getOrdersByUser = () => {
  return fetch(`http://localhost:8088/orders?userId=2&_expand=post`).then(
    (res) => res.json()
  );
};

export const assignOrders = (order) => {
  return fetch(`http://localhost:8088/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
};
