import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/orderService";

export const MyOrders = ({ currentUser }) => {
  const [order, setOrder] = useState([]);
  let [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then((orderObj) => {
      setOrder(orderObj);
    });
  }, []);

  useEffect(() => {
    const foundOrders = order.filter(
      (order) => order.userId === currentUser.id
    );
    setUserOrders(foundOrders);
  }, [order, currentUser]);

  return (
    <>
      <div className="posts-container">
        <h2 className="page-title">Litter Box Loot</h2>
        <article className="posts">
          {userOrders.map((order) => {
            return (
              <section className="post" key={order.id}>
                <header className="post-info"></header>
                <div>{order.id}</div>
                <div>{order.post.title}</div>
                <div>{order.post.price}</div>
              </section>
            );
          })}
        </article>
      </div>
    </>
  );
};
