import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../store/actions/action';
import Layout from '../../components/Layout';
import Card from '../../components/common/Card';
import Price from '../../components/common/Price';
import { generatePublicUrl } from '../../api/url';
import '../../styles/order/orderdetailspage.css'
import Loader from '../../components/common/Loader';

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);
  const authenticate = useSelector((state) => state.auth.authenticate);
  console.log('loder', orderDetails);

  useEffect(() => {
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, [dispatch, props]);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };


  if (!(orderDetails && orderDetails.address)) {
    return (
      <Layout>
        {!authenticate
        ? 
          <h1 style={{textAlign: 'center'}}>
            No Orders. Please Login
          </h1>
        : 
          <Loader />
        }
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        style={{
          width: "1160px",
          margin: "10px auto",
        }}
      >
        <Card
          style={{
            margin: "10px 0",
          }}
        >
          <div className="delAdrContainer">
            <div className="delAdrDetails">
              <div className="delTitle">Delivery Address</div>
              <div className="delName">{orderDetails.address.name}</div>
              <div className="delAddress">{orderDetails.address.address}</div>
              <div className="delPhoneNumber">
                Phone number {orderDetails.address.mobileNumber}
              </div>
            </div>
            <div className="delMoreActionContainer">
              <div className="delTitle">More Actions</div>
              <div className="delName">Download Invoice</div>
            </div>
          </div>
        </Card>

        {orderDetails.items.map((item, index) => (
          <Card
            style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
          >
            <div className="flexRow">
              <div className="delItemImgContainer">
                <img 
                    src={generatePublicUrl(item.productId.productPictures[0].img)} 
                    alt={item.productId.productPictures[0].img}
                />
              </div>
              <div style={{ width: "250px" }}>
                <div className="delItemName">{item.productId.name}</div>
                <Price value={item.payablePrice} />
              </div>
            </div>
            <div style={{ padding: "25px 50px" }}>
              <div className="orderTrack">
                {orderDetails.orderStatus.map((status) => (
                  <div
                    className={`orderStatus ${
                      status.isCompleted ? "active" : ""
                    }`}
                  >
                    <div
                      className={`point ${status.isCompleted ? "active" : ""}`}
                    ></div>
                    <div className="orderInfo">
                      <div className="status">{status.type}</div>
                      <div className="date">{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontWeight: "500", fontSize: 14 }}>
              {orderDetails.orderStatus[3].isCompleted &&
                `Order Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
