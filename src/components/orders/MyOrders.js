import { useEffect, useState } from "react";
import { getOrdersByUser } from "../../services/orderService";

export const MyOrders = ({ currentUser }) => {
  const [order, setOrder] = useState({});
  let [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    getOrdersByUser().then((orderArray) => {
      setOrder(orderArray);
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
      <div className="orders-container">
        <h2>Orders</h2>
        <article className="orders">
          {userOrders.map((order) => {
            return (
              <section className="order" key={order.id}>
                <header className="order-info"></header>
                <div>{order.id}</div>
                <footer>
                  <div>{order.postId.title}</div>
                  <div>{order.postId.price}</div>
                </footer>
              </section>
            );
          })}
        </article>
      </div>
    </>
  );
};
