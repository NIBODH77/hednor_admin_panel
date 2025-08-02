'use client';
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Table
} from 'reactstrap';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    status: '',
    description: '',
    price: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      setForm({
        name: '',
        status: '',
        description: '',
        price: '',
      });
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (!form.name || !form.price || !form.status || !form.description) return;
    setProducts([...products, form]);
    toggleModal();
  };

  const handleEditClick = (index) => {
    setForm(products[index]);
    setIsEditing(true);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[currentIndex] = form;
    setProducts(updatedProducts);
    toggleModal();
  };

  const handleDeleteProduct = (index) => {
    const filtered = products.filter((_, i) => i !== index);
    setProducts(filtered);
  };

  return (
    <div>
      <Row className="mb-3">
        <Col className="text-end">
          <Button color="primary" onClick={toggleModal}>
            Add Product
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h5" className="border-bottom p-3 mb-0">
              Product List
            </CardTitle>
            <CardBody>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No products added yet.
                      </td>
                    </tr>
                  ) : (
                    products.map((product, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{product.name}</td>
                        <td>{product.status}</td>
                        <td>{product.description}</td>
                        <td>${product.price}</td>
                        <td>
                          <Button color="info" size="sm" onClick={() => handleEditClick(index)}>
                            Edit
                          </Button>{' '}
                          <Button color="danger" size="sm" onClick={() => handleDeleteProduct(index)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modal for Add/Edit Product */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {isEditing ? 'Edit Product' : 'Add Product'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Product Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Enter product description"
                value={form.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="Enter product price"
                value={form.price}
                onChange={handleChange}
              />
            </FormGroup>
            <div className="text-end">
              <Button
                color={isEditing ? 'warning' : 'primary'}
                onClick={isEditing ? handleUpdateProduct : handleAddProduct}
              >
                {isEditing ? 'Update' : 'Add'}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductManagement;
