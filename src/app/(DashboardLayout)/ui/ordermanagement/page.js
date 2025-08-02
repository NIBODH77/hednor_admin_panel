'use client';
import { Container, Col, Row, Card, CardBody, CardTitle, Badge, Table, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useState } from "react";

const OrderManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 1,
      date: '2025-04-10',
      customer: 'John Doe',
      payment: 'Credit Card',
      total: '$200.00',
      delivery: 'Standard Shipping',
      item: 'Laptop',
      fulfillment: 'Pending',
      status: 'Pending',
    },
    {
      id: 2,
      date: '2025-04-09',
      customer: 'Jane Smith',
      payment: 'PayPal',
      total: '$150.00',
      delivery: 'Express Shipping',
      item: 'Smartphone',
      fulfillment: 'Shipped',
      status: 'Shipped',
    },
    {
      id: 3,
      date: '2025-04-08',
      customer: 'Alice Brown',
      payment: 'Credit Card',
      total: '$100.00',
      delivery: 'Standard Shipping',
      item: 'Headphones',
      fulfillment: 'Delivered',
      status: 'Delivered',
    },
    {
      id: 4,
      date: '2025-04-07',
      customer: 'Mark Wilson',
      payment: 'Bank Transfer',
      total: '$250.00',
      delivery: 'Free Shipping',
      item: 'Monitor',
      fulfillment: 'Cancelled',
      status: 'Cancelled',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Shipped':
        return 'info';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const handleViewOrder = (order) => {
    // Set the selected order and open the modal
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const toggleModal = () => {
    // Close the modal
    setModalOpen(false);
    setSelectedOrder(null); // Reset selected order
  };

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0 bg-primary text-white">
          Order Status Grid
        </CardTitle>
        <CardBody className="p-4">
          <Container>
            <Table hover responsive bordered>
              <thead className="thead-light">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Delivery</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.customer}</td>
                    <td>{order.payment}</td>
                    <td>{order.total}</td>
                    <td>{order.delivery}</td>
                    <td>
                      <Badge color={getStatusColor(order.status)}>{order.status}</Badge>
                    </td>
                    <td>
                      <Button color="info" size="sm" onClick={() => handleViewOrder(order)} className="me-2">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </CardBody>
      </Card>

      {/* Modal for viewing order details */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Order Details - #{selectedOrder?.id}</ModalHeader>
        <ModalBody>
          {selectedOrder ? (
            <div>
              <p><strong>Date:</strong> {selectedOrder.date}</p>
              <p><strong>Customer:</strong> {selectedOrder.customer}</p>
              <p><strong>Payment:</strong> {selectedOrder.payment}</p>
              <p><strong>Total:</strong> {selectedOrder.total}</p>
              <p><strong>Delivery:</strong> {selectedOrder.delivery}</p>
              <p><strong>Item:</strong> {selectedOrder.item}</p>
              <p><strong>Fulfillment:</strong> {selectedOrder.fulfillment}</p>
              <p><strong>Status:</strong> <Badge color={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge></p>
            </div>
          ) : (
            <p>Loading order details...</p>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default OrderManagement;
