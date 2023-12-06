import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with the actual endpoint of your backend
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/orders`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {orders.map((order, key) => (
        <div className="p-4" key={key}>
          <div className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white">
            <p>Order Id : {order._id}</p>
            <p>Email : {order.email}</p>
            <p>Items Ordered :-</p>
            {order.items.map((item, key) => (
              <div key={key} className="flex items-center my-2">
                <img height={50} width={100} src={item.image} alt="" />
                <ol>
                  <li>Name : {item.name}</li>
                  <li>Price : ₹{item.price}</li>
                  <li>Quantity : {item.qty}</li>
                </ol>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
