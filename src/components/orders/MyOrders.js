import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/orderService";
import "./MyOrders.css";
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
      <h2 className="page-title">Litter Box Loot</h2>
      <div className="order-container">
        <h2 className="page-sub-title">My Orders</h2>
        {userOrders.map((order) => {
          return (
            <section className="order" key={order.id}>
              <div className="order-image">
                <img
                  src={order.post.image}
                  alt={order.post.name}
                  width="280px"
                />
              </div>
              <div className="order-info">
                <h2>{order.post.title}</h2>
                <div>{order.post.price}</div>
                <div>Shipped</div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};
