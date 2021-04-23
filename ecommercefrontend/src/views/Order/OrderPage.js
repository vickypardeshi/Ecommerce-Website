import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { getOrders } from '../../store/actions/action';
import Layout from '../../components/Layout';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { Breed } from '../../components/derived/HeaderContent';
import { generatePublicUrl } from '../../api/url';
import '../../styles/order/orderpage.css';

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { authenticate } = useSelector((state) => state.auth);
  const { orderFetching } = user;
  console.log(user);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if(orderFetching){
    return(
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if(!authenticate){
    return(
      <Layout>
        <h1 style={{textAlign: 'center'}}>
          No Orders. Please Login
        </h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "#" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{ display: "block", margin: "5px 0" }}>
              <Link
                to={`/order_details/${order._id}`}
                className="orderItemContainer"
              >
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={generatePublicUrl(item.productId.productPictures[0].img)}
                    alt={item.productId.productPictures[0].img}
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">
                    ₹{item.payablePrice}
                  </div>
                  <div>{order.paymentStatus}</div>
                </div>
              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
