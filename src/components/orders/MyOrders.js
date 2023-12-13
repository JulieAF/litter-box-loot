import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/orderService";
import "./MyOrders.css";
export const MyOrders = ({ currentUser }) => {
  const [order, setOrder] = useState([]);
  let [userOrders, setUserOrders] = useState([]);

  //fetches and sets orders
  useEffect(() => {
    //getAllOrders function returns a promise that resolves in an array
    getAllOrders().then((orderArr) => {
      //setOrder updates the state with the orderArr
      setOrder(orderArr);
    });
  }, []);

  useEffect(() => {
    // using the filter method to create a new array (foundOrders) that contains only the orders that belong to the current user
    const foundOrders = order.filter(
      // tests whether the userId property of an order matches the id of the currentUser
      (order) => order.userId === currentUser.id
    );
    // updates userOrders with the new array of orders (foundOrders)
    setUserOrders(foundOrders);
    // will re-run whenever the order array or the currentUser object changes
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
