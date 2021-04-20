import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Col, Container, Row,
    Spinner, Button,
} from 'react-bootstrap';
import { getInitialData, updateOrder } from '../store/actions/action';
import Layout from '../components/Layout';
import Card from '../components/common/Card';
import ErrorHandler from '../components/common/ErrorHandler';
import '../styles/order.css';


const Orders = (props) => {
    const order = useSelector((state) => state.order);
    const { loading, error } = order;

    const [type, setType] = useState("");
    const dispatch = useDispatch();

    const onOrderUpdate = (orderId) => {
        const payload = {
            orderId,
            type,
        };
        dispatch(updateOrder(payload));
    };

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

    const retryLogic = () => {
        dispatch(getInitialData());
    }

    if (loading) {
        return (
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col
                            className="text-center py-3"
                        >
                            <Spinner
                                variant="primary"
                                animation="border"
                            />
                        </Col>
                    </Row>
                </Container>
            </Layout>

        );
    }

    if (error) {
        return (
            <Layout sidebar>
                <ErrorHandler
                    retryLogic={retryLogic}
                //errorMessage={error.message}
                />
            </Layout>
        );
    }

    return (
        <Layout sidebar>
            <div>
                <h3>Orders</h3>
            </div>
            {order.orders.map((orderItem, index) => (
                <Card
                    style={{
                        margin: "10px 0",
                    }}
                    key={index}
                    headerleft={orderItem._id}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "50px 50px",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <div className="title">Items</div>
                            {orderItem.items.map((item, index) => (
                                <div className="value" key={index}>
                                    {item.productId.name}
                                </div>
                            ))}
                        </div>
                        <div>
                            <span className="title">Total Price</span>
                            <br />
                            <span className="value">{orderItem.totalAmount}</span>
                        </div>
                        <div>
                            <span className="title">Payment Type</span> <br />
                            <span className="value">{orderItem.paymentType}</span>
                        </div>
                        <div>
                            <span className="title">Payment Status</span> <br />
                            <span className="value">{orderItem.paymentStatus}</span>
                        </div>
                    </div>
                    <div
                        style={{
                            boxSizing: "border-box",
                            padding: "50px 65px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div className="orderTrack">
                            {orderItem.orderStatus.map((status) => (
                                <div
                                    className={`orderStatus ${status.isCompleted ? "active" : ""
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

                        {/* select input to apply order action */}
                        <div
                            style={{
                                padding: "0 50px",
                                boxSizing: "border-box",
                            }}
                        >
                            {!orderItem.orderStatus[3].isCompleted ?
                                <select
                                    className="form-control"
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value={""}>select status</option>
                                    {orderItem.orderStatus.map((status) => {
                                        return (
                                            <>
                                                {!status.isCompleted ? (
                                                    <option key={status.type} value={status.type}>
                                                        {status.type}
                                                    </option>
                                                ) : null}
                                            </>
                                        );
                                    })}
                                </select>
                                
                                : `Order Delivered on ${formatDate2(orderItem.orderStatus[3].date)}`
                            }
                        </div>
                        {/* button to confirm action */}

                        <div
                            style={{
                                padding: "0 50px",
                                boxSizing: "border-box",
                            }}
                        >
                            {!orderItem.orderStatus[3].isCompleted &&
                                <Button 
                                    onClick={() => onOrderUpdate(orderItem._id)}
                                    disabled={!type}
                                >
                                    Confirm
                                </Button>
                            }
                        </div>
                    </div>
                </Card>
            ))}
        </Layout>
    );
};

export default Orders;
