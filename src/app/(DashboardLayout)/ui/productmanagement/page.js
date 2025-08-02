



// // // // 'use client';
// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   Button, ButtonGroup, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody,
// // // //   Form, FormGroup, Input, Label, Table, Badge, Spinner, Alert, Pagination, PaginationItem, PaginationLink
// // // // } from 'reactstrap';
// // // // import axios from 'axios';

// // // // const ProductManagement = () => {
// // // //   // State management
// // // //   const [products, setProducts] = useState([]);
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [brands, setBrands] = useState([]);
// // // //   const [form, setForm] = useState({
// // // //     name: '',
// // // //     slug: '',
// // // //     description: '',
// // // //     price: '',
// // // //     quantity: 0,
// // // //     category_id: '',
// // // //     brand_id: '',
// // // //     is_active: true,
// // // //     image: null,
// // // //     image_url: ''
// // // //   });
// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [currentProductId, setCurrentProductId] = useState(null);
// // // //   const [loadingProducts, setLoadingProducts] = useState(false);
// // // //   const [loadingCategories, setLoadingCategories] = useState(false);
// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const [pagination, setPagination] = useState({
// // // //     page: 1,
// // // //     pageSize: 10,
// // // //     total: 0
// // // //   });

// // // //   const API_URL = 'http://localhost:8001';

// // // //   // Helper function to generate slug from name
// // // //   const generateSlug = (name) => {
// // // //     return name.toLowerCase()
// // // //       .replace(/\s+/g, '-')
// // // //       .replace(/[^\w-]+/g, '');
// // // //   };

// // // //   // Fetch all data
// // // //   useEffect(() => {
// // // //     fetchProducts();
// // // //     fetchCategories();
// // // //   }, [pagination.page]);

// // // //   const fetchProducts = async () => {
// // // //     try {
// // // //       setLoadingProducts(true);
// // // //       const response = await axios.get(`${API_URL}/products/`, {
// // // //         params: {
// // // //           page: pagination.page,
// // // //           limit: pagination.pageSize
// // // //         }
// // // //       });
// // // //       setProducts(response.data.items || response.data);
// // // //       setPagination(prev => ({
// // // //         ...prev,
// // // //         total: response.data.total || response.data.length
// // // //       }));
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.detail || 'Failed to fetch products');
// // // //     } finally {
// // // //       setLoadingProducts(false);
// // // //     }
// // // //   };

// // // //   const fetchCategories = async () => {
// // // //     try {
// // // //       setLoadingCategories(true);
// // // //       const response = await axios.get(`${API_URL}/categories/`);
// // // //       setCategories(response.data);
// // // //     } catch (err) {
// // // //       setError('Failed to fetch categories');
// // // //     } finally {
// // // //       setLoadingCategories(false);
// // // //     }
// // // //   };

// // // //   const fetchBrandsByCategory = async (categoryId) => {
// // // //     if (!categoryId) {
// // // //       setBrands([]);
// // // //       return;
// // // //     }
// // // //     try {
// // // //       const response = await axios.get(`${API_URL}/brands/by-category/${categoryId}`);
// // // //       setBrands(response.data);
// // // //     } catch (err) {
// // // //       setError('Failed to fetch brands');
// // // //     }
// // // //   };

// // // //   const handleCategoryChange = (e) => {
// // // //     const categoryId = e.target.value;
// // // //     setForm({
// // // //       ...form,
// // // //       category_id: categoryId,
// // // //       brand_id: '' // Reset brand when category changes
// // // //     });
// // // //     fetchBrandsByCategory(categoryId);
// // // //   };

// // // //   const handleNameChange = (e) => {
// // // //     const name = e.target.value;
// // // //     setForm({
// // // //       ...form,
// // // //       name: name,
// // // //       slug: generateSlug(name)
// // // //     });
// // // //   };

// // // // const handleSubmit = async (e) => {
// // // //   e.preventDefault();
// // // //   try {
// // // //     setSubmitting(true);  // Changed from setLoading
// // // //     const productData = {
// // // //       ...form,
// // // //       price: parseFloat(form.price),
// // // //       quantity: parseInt(form.quantity)
// // // //     };

// // // //     if (isEditing) {
// // // //       await axios.put(`${API_URL}/products/${currentProductId}`, productData);
// // // //     } else {
// // // //       await axios.post(`${API_URL}/products/`, productData);
// // // //     }

// // // //     fetchProducts();
// // // //     toggleModal();
// // // //   } catch (err) {
// // // //     setError(err.response?.data?.detail || 'Failed to save product');
// // // //   } finally {
// // // //     setSubmitting(false);  // Changed from setLoading
// // // //   }
// // // // };


// // // //   const handleEditClick = (product) => {
// // // //     setForm({
// // // //       name: product.name,
// // // //       slug: product.slug,
// // // //       description: product.description,
// // // //       price: product.price.toString(),
// // // //       quantity: product.quantity.toString(),
// // // //       category_id: product.category.id,
// // // //       brand_id: product.brand.id,
// // // //       is_active: product.is_active,
// // // //       image: null,
// // // //       image_url: product.image_url || ''
// // // //     });
// // // //     setCurrentProductId(product.id);
// // // //     setIsEditing(true);
// // // //     fetchBrandsByCategory(product.category.id);
// // // //     toggleModal();
// // // //   };

// // // //   const handleDeleteProduct = async (productId) => {
// // // //     if (window.confirm('Are you sure you want to delete this product?')) {
// // // //       try {
// // // //         setLoadingProducts(true);
// // // //         await axios.delete(`${API_URL}/products/${productId}`);
// // // //         fetchProducts();
// // // //       } catch (err) {
// // // //         setError('Failed to delete product');
// // // //       } finally {
// // // //         setLoadingProducts(false);
// // // //       }
// // // //     }
// // // //   };

// // // //   const resetForm = () => {
// // // //     setForm({
// // // //       name: '',
// // // //       slug: '',
// // // //       description: '',
// // // //       price: '',
// // // //       quantity: 0,
// // // //       category_id: '',
// // // //       brand_id: '',
// // // //       is_active: true,
// // // //       image: null,
// // // //       image_url: ''
// // // //     });
// // // //     setIsEditing(false);
// // // //     setCurrentProductId(null);
// // // //     setError(null);
// // // //     setBrands([]);
// // // //   };

// // // //   const toggleModal = () => setModalOpen(!modalOpen);

// // // //   const handlePageChange = (page) => {
// // // //     setPagination(prev => ({ ...prev, page }));
// // // //   };

// // // //   const renderPagination = () => {
// // // //     const totalPages = Math.ceil(pagination.total / pagination.pageSize);
// // // //     if (totalPages <= 1) return null;

// // // //     return (
// // // //       <Pagination className="mt-3">
// // // //         <PaginationItem disabled={pagination.page === 1}>
// // // //           <PaginationLink previous onClick={() => handlePageChange(pagination.page - 1)} />
// // // //         </PaginationItem>
        
// // // //         {[...Array(totalPages)].map((_, i) => (
// // // //           <PaginationItem active={i + 1 === pagination.page} key={i}>
// // // //             <PaginationLink onClick={() => handlePageChange(i + 1)}>
// // // //               {i + 1}
// // // //             </PaginationLink>
// // // //           </PaginationItem>
// // // //         ))}
        
// // // //         <PaginationItem disabled={pagination.page === totalPages}>
// // // //           <PaginationLink next onClick={() => handlePageChange(pagination.page + 1)} />
// // // //         </PaginationItem>
// // // //       </Pagination>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="p-4">
// // // //       {error && <Alert color="danger" toggle={() => setError(null)}>{error}</Alert>}

// // // //       <Row className="mb-4">
// // // //         <Col className="text-end">
// // // //           <Button color="primary" onClick={() => { resetForm(); toggleModal(); }} disabled={loadingProducts}>
// // // //             {loadingProducts ? <Spinner size="sm" /> : 'Add Product'}
// // // //           </Button>
// // // //         </Col>
// // // //       </Row>

// // // //       <Row>
// // // //         <Col md="12">
// // // //           <Card>
// // // //             <CardTitle tag="h5" className="border-bottom p-3 mb-0">Product List</CardTitle>
// // // //             <CardBody>
// // // //               {loadingProducts && products.length === 0 ? (
// // // //                 <div className="text-center py-4">
// // // //                   <Spinner color="primary" />
// // // //                 </div>
// // // //               ) : (
// // // //                 <>
// // // //                   <Table striped responsive hover>
// // // //                     <thead>
// // // //                       <tr>
// // // //                         <th>#</th>
// // // //                         <th>Image</th>
// // // //                         <th>Name</th>
// // // //                         <th>Price</th>
// // // //                         <th>Stock</th>
// // // //                         <th>Category</th>
// // // //                         <th>Brand</th>
// // // //                         <th>Status</th>
// // // //                         <th>Actions</th>
// // // //                       </tr>
// // // //                     </thead>
// // // //                     <tbody>
// // // //                       {products.length === 0 ? (
// // // //                         <tr>
// // // //                           <td colSpan="9" className="text-center py-4">
// // // //                             {loadingProducts ? <Spinner size="sm" /> : 'No products found'}
// // // //                           </td>
// // // //                         </tr>
// // // //                       ) : (
// // // //                         products.map((product, index) => (
// // // //                           <tr key={product.id}>
// // // //                             <th scope="row">{(pagination.page - 1) * pagination.pageSize + index + 1}</th>
// // // //                             <td>
// // // //                               {product.image_url ? (
// // // //                                 <img 
// // // //                                   src={product.image_url} 
// // // //                                   alt={product.name} 
// // // //                                   style={{ width: '50px', height: '50px', objectFit: 'cover' }}
// // // //                                   onError={(e) => {
// // // //                                     e.target.onerror = null;
// // // //                                     e.target.src = 'https://via.placeholder.com/50?text=No+Image';
// // // //                                   }}
// // // //                                 />
// // // //                               ) : (
// // // //                                 <div className="text-muted">No image</div>
// // // //                               )}
// // // //                             </td>
// // // //                             <td>
// // // //                               <strong>{product.name}</strong>
// // // //                               <div className="small text-muted">{product.description}</div>
// // // //                             </td>
// // // //                             <td>${product.price.toFixed(2)}</td>
// // // //                             <td>{product.quantity}</td>
// // // //                             <td>{product.category?.name || '-'}</td>
// // // //                             <td>{product.brand?.name || '-'}</td>
// // // //                             <td>
// // // //                               <Badge color={product.is_active ? 'success' : 'secondary'}>
// // // //                                 {product.is_active ? 'Active' : 'Inactive'}
// // // //                               </Badge>
// // // //                             </td>
// // // //                             <td>
// // // //                               <ButtonGroup size="sm">
// // // //                                 <Button color="warning" onClick={() => handleEditClick(product)} disabled={loadingProducts}>
// // // //                                   Edit
// // // //                                 </Button>
// // // //                                 <Button color="danger" onClick={() => handleDeleteProduct(product.id)} disabled={loadingProducts}>
// // // //                                   Delete
// // // //                                 </Button>
// // // //                               </ButtonGroup>
// // // //                             </td>
// // // //                           </tr>
// // // //                         ))
// // // //                       )}
// // // //                     </tbody>
// // // //                   </Table>
// // // //                   {renderPagination()}
// // // //                 </>
// // // //               )}
// // // //             </CardBody>
// // // //           </Card>
// // // //         </Col>
// // // //       </Row>

// // // //       {/* Add/Edit Product Modal */}
// // // //       <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" onClosed={resetForm}>
// // // //         <ModalHeader toggle={toggleModal}>{isEditing ? 'Edit Product' : 'Add Product'}</ModalHeader>
// // // //         <ModalBody>
// // // //           <Form onSubmit={handleSubmit}>
// // // //             <Row>
// // // //               <Col md={6}>
// // // //                 <FormGroup>
// // // //                   <Label>Name *</Label>
// // // //                   <Input 
// // // //                     name="name" 
// // // //                     value={form.name} 
// // // //                     onChange={handleNameChange} 
// // // //                     required 
// // // //                   />
// // // //                 </FormGroup>
// // // //               </Col>
// // // //               <Col md={6}>
// // // //                 <FormGroup>
// // // //                   <Label>Slug *</Label>
// // // //                   <Input 
// // // //                     name="slug" 
// // // //                     value={form.slug} 
// // // //                     onChange={(e) => setForm({...form, slug: e.target.value})} 
// // // //                     required 
// // // //                   />
// // // //                 </FormGroup>
// // // //               </Col>
// // // //             </Row>

// // // //             <FormGroup>
// // // //               <Label>Description</Label>
// // // //               <Input 
// // // //                 type="textarea" 
// // // //                 name="description" 
// // // //                 value={form.description} 
// // // //                 onChange={(e) => setForm({...form, description: e.target.value})} 
// // // //               />
// // // //             </FormGroup>

// // // //             <Row>
// // // //               <Col md={4}>
// // // //                 <FormGroup>
// // // //                   <Label>Price *</Label>
// // // //                   <Input 
// // // //                     type="number" 
// // // //                     name="price" 
// // // //                     value={form.price} 
// // // //                     onChange={(e) => setForm({...form, price: e.target.value})} 
// // // //                     min="0.01"
// // // //                     step="0.01"
// // // //                     required 
// // // //                   />
// // // //                 </FormGroup>
// // // //               </Col>
// // // //               <Col md={4}>
// // // //                 <FormGroup>
// // // //                   <Label>Quantity *</Label>
// // // //                   <Input 
// // // //                     type="number" 
// // // //                     name="quantity" 
// // // //                     value={form.quantity} 
// // // //                     onChange={(e) => setForm({...form, quantity: e.target.value})} 
// // // //                     min="0"
// // // //                     required 
// // // //                   />
// // // //                 </FormGroup>
// // // //               </Col>
// // // //               <Col md={4}>
// // // //                 <FormGroup>
// // // //                   <Label>Product Image</Label>
// // // //                   <Input 
// // // //                     type="file" 
// // // //                     name="image" 
// // // //                     onChange={(e) => setForm({...form, image: e.target.files[0]})}
// // // //                     accept="image/jpeg, image/png, image/gif, image/webp"
// // // //                   />
// // // //                   {form.image_url && !form.image && (
// // // //                     <div className="mt-2">
// // // //                       <small>Current image:</small>
// // // //                       <img 
// // // //                         src={form.image_url} 
// // // //                         alt="Current product" 
// // // //                         style={{ width: '50px', height: '50px', objectFit: 'cover', display: 'block' }}
// // // //                       />
// // // //                     </div>
// // // //                   )}
// // // //                 </FormGroup>
// // // //               </Col>
// // // //             </Row>

// // // //             <Row>
// // // //               <Col md={6}>
// // // //                 <FormGroup>
// // // //                   <Label>Category *</Label>
// // // //                   <Input 
// // // //                     type="select" 
// // // //                     name="category_id" 
// // // //                     value={form.category_id} 
// // // //                     onChange={handleCategoryChange} 
// // // //                     required
// // // //                   >
// // // //                     <option value="">Select Category</option>
// // // //                     {categories.map(category => (
// // // //                       <option key={category.id} value={category.id}>
// // // //                         {category.name}
// // // //                       </option>
// // // //                     ))}
// // // //                   </Input>
// // // //                 </FormGroup>
// // // //               </Col>
// // // //               <Col md={6}>
// // // //                 <FormGroup>
// // // //                   <Label>Brand *</Label>
// // // //                   <Input 
// // // //                     type="select" 
// // // //                     name="brand_id" 
// // // //                     value={form.brand_id} 
// // // //                     onChange={(e) => setForm({...form, brand_id: e.target.value})} 
// // // //                     required
// // // //                     disabled={!form.category_id}
// // // //                   >
// // // //                     <option value="">Select Brand</option>
// // // //                     {brands.map(brand => (
// // // //                       <option key={brand.id} value={brand.id}>
// // // //                         {brand.name}
// // // //                       </option>
// // // //                     ))}
// // // //                   </Input>
// // // //                 </FormGroup>
// // // //               </Col>
// // // //             </Row>

// // // //             <FormGroup check className="mb-3">
// // // //               <Input 
// // // //                 type="checkbox" 
// // // //                 name="is_active" 
// // // //                 checked={form.is_active} 
// // // //                 onChange={(e) => setForm({...form, is_active: e.target.checked})} 
// // // //               />
// // // //               <Label check>Active</Label>
// // // //             </FormGroup>

// // // //             <div className="text-end">
// // // //               <Button color="secondary" onClick={toggleModal} className="me-2">
// // // //                 Cancel
// // // //               </Button>
// // // //               <Button type="submit" color="primary" disabled={submitting}>
// // // //                 {submitting ? <Spinner size="sm" /> : isEditing ? 'Update' : 'Save'} Product
// // // //               </Button>
// // // //             </div>
// // // //           </Form>
// // // //         </ModalBody>
// // // //       </Modal>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProductManagement;




// // // // 'use client';
// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import {
// // // //   Button, ButtonGroup, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody,
// // // //   Form, FormGroup, Input, Label, Table, Badge, Spinner, Alert, Pagination, PaginationItem, PaginationLink
// // // // } from 'reactstrap';
// // // // import axios from 'axios';

// // // // // Configure axios with timeout and base URL
// // // // const api = axios.create({
// // // //   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000',
// // // //   timeout: 10000,
// // // //   headers: {
// // // //     'Content-Type': 'application/json',
// // // //   }
// // // // });

// // // // // Custom Error Boundary Component
// // // // class SimpleErrorBoundary extends React.Component {
// // // //   constructor(props) {
// // // //     super(props);
// // // //     this.state = { hasError: false, error: null };
// // // //   }

// // // //   static getDerivedStateFromError(error) {
// // // //     return { hasError: true, error };
// // // //   }

// // // //   componentDidCatch(error, errorInfo) {
// // // //     console.error('Error caught by boundary:', error, errorInfo);
// // // //   }

// // // //   handleReset = () => {
// // // //     this.setState({ hasError: false, error: null });
// // // //     this.props.onReset?.();
// // // //   };

// // // //   render() {
// // // //     if (this.state.hasError) {
// // // //       return (
// // // //         <div className="p-4">
// // // //           <Alert color="danger">
// // // //             <h5>Something went wrong:</h5>
// // // //             <pre className="text-muted">{this.state.error.message}</pre>
// // // //             <Button color="primary" onClick={this.handleReset}>
// // // //               Try again
// // // //             </Button>
// // // //           </Alert>
// // // //         </div>
// // // //       );
// // // //     }

// // // //     return this.props.children;
// // // //   }
// // // // }

// // // // const ProductManagement = () => {
// // // //   // State management
// // // //   const [products, setProducts] = useState([]);
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [brands, setBrands] = useState([]);
// // // //   const [form, setForm] = useState({
// // // //     name: '',
// // // //     slug: '',
// // // //     description: '',
// // // //     price: '',
// // // //     quantity: 0,
// // // //     category_id: '',
// // // //     brand_id: '',
// // // //     is_active: true,
// // // //     image: null,
// // // //     image_url: ''
// // // //   });
// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [currentProductId, setCurrentProductId] = useState(null);
// // // //   const [loadingProducts, setLoadingProducts] = useState(false);
// // // //   const [loadingCategories, setLoadingCategories] = useState(false);
// // // //   const [submitting, setSubmitting] = useState(false);
// // // //   const [error, setError] = useState(null);
// // // //   const [pagination, setPagination] = useState({
// // // //     page: 1,
// // // //     pageSize: 10,
// // // //     total: 0
// // // //   });

// // // //   // Helper function to generate slug from name
// // // //   const generateSlug = useCallback((name) => {
// // // //     return name.toLowerCase()
// // // //       .replace(/\s+/g, '-')
// // // //       .replace(/[^\w-]+/g, '');
// // // //   }, []);

// // // //   // Helper function to handle API errors
// // // //   const handleAPIError = useCallback((err, defaultMessage) => {
// // // //     if (err.code === 'ECONNRESET' || err.message.includes('Network Error')) {
// // // //       return 'Connection to server was lost. Please check your network and try again.';
// // // //     }
// // // //     if (err.response) {
// // // //       if (err.response.data) {
// // // //         if (typeof err.response.data === 'object') {
// // // //           return err.response.data.detail 
// // // //             ? err.response.data.detail.toString()
// // // //             : JSON.stringify(err.response.data);
// // // //         }
// // // //         return err.response.data.toString();
// // // //       }
// // // //       return err.response.statusText || defaultMessage;
// // // //     }
// // // //     return err.message || defaultMessage;
// // // //   }, []);

// // // //   // API call with retry logic
// // // //   const apiCallWithRetry = useCallback(async (apiCall, retries = 3, delay = 1000) => {
// // // //     try {
// // // //       return await apiCall();
// // // //     } catch (err) {
// // // //       if (retries <= 0) throw err;
// // // //       await new Promise(res => setTimeout(res, delay));
// // // //       return apiCallWithRetry(apiCall, retries - 1, delay * 2);
// // // //     }
// // // //   }, []);

// // // //   // Fetch all data
// // // //   useEffect(() => {
// // // //     const loadData = async () => {
// // // //       try {
// // // //         await Promise.all([fetchProducts(), fetchCategories()]);
// // // //       } catch (err) {
// // // //         setError('Failed to load initial data: ' + handleAPIError(err, 'Unknown error'));
// // // //       }
// // // //     };
// // // //     loadData();
// // // //   }, [pagination.page]);

// // // //   const fetchProducts = async () => {
// // // //     try {
// // // //       setLoadingProducts(true);
// // // //       setError(null);
// // // //       const response = await apiCallWithRetry(() => 
// // // //         api.get('/products/', {
// // // //           params: {
// // // //             page: pagination.page,
// // // //             limit: pagination.pageSize
// // // //           }
// // // //         })
// // // //       );
// // // //       setProducts(response.data.items || response.data);
// // // //       setPagination(prev => ({
// // // //         ...prev,
// // // //         total: response.data.total || response.data.length
// // // //       }));
// // // //     } catch (err) {
// // // //       setError('Failed to fetch products: ' + handleAPIError(err, 'Unknown error'));
// // // //     } finally {
// // // //       setLoadingProducts(false);
// // // //     }
// // // //   };

// // // //   const fetchCategories = async () => {
// // // //     try {
// // // //       setLoadingCategories(true);
// // // //       setError(null);
// // // //       const response = await apiCallWithRetry(() => api.get('/categories/'));
// // // //       setCategories(response.data);
// // // //     } catch (err) {
// // // //       setError('Failed to fetch categories: ' + handleAPIError(err, 'Unknown error'));
// // // //     } finally {
// // // //       setLoadingCategories(false);
// // // //     }
// // // //   };

// // // //   const fetchBrandsByCategory = async (categoryId) => {
// // // //     if (!categoryId) {
// // // //       setBrands([]);
// // // //       return;
// // // //     }
// // // //     try {
// // // //       setError(null);
// // // //       const response = await apiCallWithRetry(() => 
// // // //         api.get(`/brands/by-category/${categoryId}`)
// // // //       );
// // // //       setBrands(response.data);
// // // //     } catch (err) {
// // // //       setError('Failed to fetch brands: ' + handleAPIError(err, 'Unknown error'));
// // // //     }
// // // //   };

// // // //   const handleCategoryChange = (e) => {
// // // //     const categoryId = e.target.value;
// // // //     setForm({
// // // //       ...form,
// // // //       category_id: categoryId,
// // // //       brand_id: '' // Reset brand when category changes
// // // //     });
// // // //     fetchBrandsByCategory(categoryId);
// // // //   };

// // // //   const handleNameChange = (e) => {
// // // //     const name = e.target.value;
// // // //     setForm({
// // // //       ...form,
// // // //       name: name,
// // // //       slug: generateSlug(name)
// // // //     });
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       setSubmitting(true);
// // // //       setError(null);
      
// // // //       const productData = new FormData();
// // // //       productData.append('name', form.name);
// // // //       productData.append('slug', form.slug);
// // // //       productData.append('description', form.description);
// // // //       productData.append('price', parseFloat(form.price));
// // // //       productData.append('quantity', parseInt(form.quantity));
// // // //       productData.append('category_id', form.category_id);
// // // //       productData.append('brand_id', form.brand_id);
// // // //       productData.append('is_active', form.is_active);
// // // //       if (form.image) {
// // // //         productData.append('image', form.image);
// // // //       }

// // // //       if (isEditing) {
// // // //         await apiCallWithRetry(() => 
// // // //           api.put(`/products/${currentProductId}`, productData, {
// // // //             headers: {
// // // //               'Content-Type': 'multipart/form-data'
// // // //             }
// // // //           })
// // // //         );
// // // //       } else {
// // // //         await apiCallWithRetry(() => 
// // // //           api.post('/products/', productData, {
// // // //             headers: {
// // // //               'Content-Type': 'multipart/form-data'
// // // //             }
// // // //           })
// // // //         );
// // // //       }

// // // //       await fetchProducts();
// // // //       toggleModal();
// // // //     } catch (err) {
// // // //       setError('Failed to save product: ' + handleAPIError(err, 'Unknown error'));
// // // //     } finally {
// // // //       setSubmitting(false);
// // // //     }
// // // //   };

// // // //   const handleEditClick = (product) => {
// // // //     setForm({
// // // //       name: product.name,
// // // //       slug: product.slug,
// // // //       description: product.description,
// // // //       price: product.price.toString(),
// // // //       quantity: product.quantity.toString(),
// // // //       category_id: product.category.id,
// // // //       brand_id: product.brand.id,
// // // //       is_active: product.is_active,
// // // //       image: null,
// // // //       image_url: product.image_url || ''
// // // //     });
// // // //     setCurrentProductId(product.id);
// // // //     setIsEditing(true);
// // // //     fetchBrandsByCategory(product.category.id);
// // // //     toggleModal();
// // // //   };

// // // //   const handleDeleteProduct = async (productId) => {
// // // //     if (window.confirm('Are you sure you want to delete this product?')) {
// // // //       try {
// // // //         setLoadingProducts(true);
// // // //         setError(null);
// // // //         await apiCallWithRetry(() => api.delete(`/products/${productId}`));
// // // //         await fetchProducts();
// // // //       } catch (err) {
// // // //         setError('Failed to delete product: ' + handleAPIError(err, 'Unknown error'));
// // // //       } finally {
// // // //         setLoadingProducts(false);
// // // //       }
// // // //     }
// // // //   };

// // // //   const resetForm = () => {
// // // //     setForm({
// // // //       name: '',
// // // //       slug: '',
// // // //       description: '',
// // // //       price: '',
// // // //       quantity: 0,
// // // //       category_id: '',
// // // //       brand_id: '',
// // // //       is_active: true,
// // // //       image: null,
// // // //       image_url: ''
// // // //     });
// // // //     setIsEditing(false);
// // // //     setCurrentProductId(null);
// // // //     setError(null);
// // // //     setBrands([]);
// // // //   };

// // // //   const toggleModal = () => setModalOpen(!modalOpen);

// // // //   const handlePageChange = (page) => {
// // // //     setPagination(prev => ({ ...prev, page }));
// // // //   };

// // // //   const renderPagination = () => {
// // // //     const totalPages = Math.ceil(pagination.total / pagination.pageSize);
// // // //     if (totalPages <= 1) return null;

// // // //     return (
// // // //       <Pagination className="mt-3">
// // // //         <PaginationItem disabled={pagination.page === 1}>
// // // //           <PaginationLink previous onClick={() => handlePageChange(pagination.page - 1)} />
// // // //         </PaginationItem>
        
// // // //         {[...Array(totalPages)].map((_, i) => (
// // // //           <PaginationItem active={i + 1 === pagination.page} key={i}>
// // // //             <PaginationLink onClick={() => handlePageChange(i + 1)}>
// // // //               {i + 1}
// // // //             </PaginationLink>
// // // //           </PaginationItem>
// // // //         ))}
        
// // // //         <PaginationItem disabled={pagination.page === totalPages}>
// // // //           <PaginationLink next onClick={() => handlePageChange(pagination.page + 1)} />
// // // //         </PaginationItem>
// // // //       </Pagination>
// // // //     );
// // // //   };

// // // //   const handleReset = () => {
// // // //     setError(null);
// // // //     fetchProducts();
// // // //     fetchCategories();
// // // //   };

// // // //   return (
// // // //     <SimpleErrorBoundary onReset={handleReset}>
// // // //       <div className="p-4">
// // // //         {error && (
// // // //           <Alert color="danger" toggle={() => setError(null)}>
// // // //             {error}
// // // //           </Alert>
// // // //         )}

// // // //         <Row className="mb-4">
// // // //           <Col className="text-end">
// // // //             <Button color="primary" onClick={() => { resetForm(); toggleModal(); }} disabled={loadingProducts}>
// // // //               {loadingProducts ? <Spinner size="sm" /> : 'Add Product'}
// // // //             </Button>
// // // //           </Col>
// // // //         </Row>

// // // //         <Row>
// // // //           <Col md="12">
// // // //             <Card>
// // // //               <CardTitle tag="h5" className="border-bottom p-3 mb-0">Product List</CardTitle>
// // // //               <CardBody>
// // // //                 {loadingProducts && products.length === 0 ? (
// // // //                   <div className="text-center py-4">
// // // //                     <Spinner color="primary" />
// // // //                   </div>
// // // //                 ) : (
// // // //                   <>
// // // //                     <Table striped responsive hover>
// // // //                       <thead>
// // // //                         <tr>
// // // //                           <th>#</th>
// // // //                           <th>Image</th>
// // // //                           <th>Name</th>
// // // //                           <th>Price</th>
// // // //                           <th>Stock</th>
// // // //                           <th>Category</th>
// // // //                           <th>Brand</th>
// // // //                           <th>Status</th>
// // // //                           <th>Actions</th>
// // // //                         </tr>
// // // //                       </thead>
// // // //                       <tbody>
// // // //                         {products.length === 0 ? (
// // // //                           <tr>
// // // //                             <td colSpan="9" className="text-center py-4">
// // // //                               {loadingProducts ? <Spinner size="sm" /> : 'No products found'}
// // // //                             </td>
// // // //                           </tr>
// // // //                         ) : (
// // // //                           products.map((product, index) => (
// // // //                             <tr key={product.id}>
// // // //                               <th scope="row">{(pagination.page - 1) * pagination.pageSize + index + 1}</th>
// // // //                               <td>
// // // //                                 {product.image_url ? (
// // // //                                   <img 
// // // //                                     src={product.image_url} 
// // // //                                     alt={product.name} 
// // // //                                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
// // // //                                     onError={(e) => {
// // // //                                       e.target.onerror = null;
// // // //                                       e.target.src = 'https://via.placeholder.com/50?text=No+Image';
// // // //                                     }}
// // // //                                   />
// // // //                                 ) : (
// // // //                                   <div className="text-muted">No image</div>
// // // //                                 )}
// // // //                               </td>
// // // //                               <td>
// // // //                                 <strong>{product.name}</strong>
// // // //                                 <div className="small text-muted">{product.description}</div>
// // // //                               </td>
// // // //                               <td>${product.price.toFixed(2)}</td>
// // // //                               <td>{product.quantity}</td>
// // // //                               <td>{product.category?.name || '-'}</td>
// // // //                               <td>{product.brand?.name || '-'}</td>
// // // //                               <td>
// // // //                                 <Badge color={product.is_active ? 'success' : 'secondary'}>
// // // //                                   {product.is_active ? 'Active' : 'Inactive'}
// // // //                                 </Badge>
// // // //                               </td>
// // // //                               <td>
// // // //                                 <ButtonGroup size="sm">
// // // //                                   <Button color="warning" onClick={() => handleEditClick(product)} disabled={loadingProducts}>
// // // //                                     Edit
// // // //                                   </Button>
// // // //                                   <Button color="danger" onClick={() => handleDeleteProduct(product.id)} disabled={loadingProducts}>
// // // //                                     Delete
// // // //                                   </Button>
// // // //                                 </ButtonGroup>
// // // //                               </td>
// // // //                             </tr>
// // // //                           ))
// // // //                         )}
// // // //                       </tbody>
// // // //                     </Table>
// // // //                     {renderPagination()}
// // // //                   </>
// // // //                 )}
// // // //               </CardBody>
// // // //             </Card>
// // // //           </Col>
// // // //         </Row>

// // // //         {/* Add/Edit Product Modal */}
// // // //         <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" onClosed={resetForm}>
// // // //           <ModalHeader toggle={toggleModal}>{isEditing ? 'Edit Product' : 'Add Product'}</ModalHeader>
// // // //           <ModalBody>
// // // //             <Form onSubmit={handleSubmit}>
// // // //               <Row>
// // // //                 <Col md={6}>
// // // //                   <FormGroup>
// // // //                     <Label>Name *</Label>
// // // //                     <Input 
// // // //                       name="name" 
// // // //                       value={form.name} 
// // // //                       onChange={handleNameChange} 
// // // //                       required 
// // // //                     />
// // // //                   </FormGroup>
// // // //                 </Col>
// // // //                 <Col md={6}>
// // // //                   <FormGroup>
// // // //                     <Label>Slug *</Label>
// // // //                     <Input 
// // // //                       name="slug" 
// // // //                       value={form.slug} 
// // // //                       onChange={(e) => setForm({...form, slug: e.target.value})} 
// // // //                       required 
// // // //                     />
// // // //                   </FormGroup>
// // // //                 </Col>
// // // //               </Row>

// // // //               <FormGroup>
// // // //                 <Label>Description</Label>
// // // //                 <Input 
// // // //                   type="textarea" 
// // // //                   name="description" 
// // // //                   value={form.description} 
// // // //                   onChange={(e) => setForm({...form, description: e.target.value})} 
// // // //                 />
// // // //               </FormGroup>

// // // //               <Row>
// // // //                 <Col md={4}>
// // // //                   <FormGroup>
// // // //                     <Label>Price *</Label>
// // // //                     <Input 
// // // //                       type="number" 
// // // //                       name="price" 
// // // //                       value={form.price} 
// // // //                       onChange={(e) => setForm({...form, price: e.target.value})} 
// // // //                       min="0.01"
// // // //                       step="0.01"
// // // //                       required 
// // // //                     />
// // // //                   </FormGroup>
// // // //                 </Col>
// // // //                 <Col md={4}>
// // // //                   <FormGroup>
// // // //                     <Label>Quantity *</Label>
// // // //                     <Input 
// // // //                       type="number" 
// // // //                       name="quantity" 
// // // //                       value={form.quantity} 
// // // //                       onChange={(e) => setForm({...form, quantity: e.target.value})} 
// // // //                       min="0"
// // // //                       required 
// // // //                     />
// // // //                   </FormGroup>
// // // //                 </Col>
// // // //                 <Col md={4}>
// // // //                   <FormGroup>
// // // //                     <Label>Product Image</Label>
// // // //                     <Input 
// // // //                       type="file" 
// // // //                       name="image" 
// // // //                       onChange={(e) => setForm({...form, image: e.target.files[0]})}
// // // //                       accept="image/jpeg, image/png, image/gif, image/webp"
// // // //                     />
// // // //                     {form.image_url && !form.image && (
// // // //                       <div className="mt-2">
// // // //                         <small>Current image:</small>
// // // //                         <img 
// // // //                           src={form.image_url} 
// // // //                           alt="Current product" 
// // // //                           style={{ width: '50px', height: '50px', objectFit: 'cover', display: 'block' }}
// // // //                         />
// // // //                       </div>
// // // //                     )}
// // // //                   </FormGroup>
// // // //                 </Col>
// // // //               </Row>

// // // //               <Row>
// // // //                 <Col md={6}>
// // // //                   <FormGroup>
// // // //                     <Label>Category *</Label>
// // // //                     <Input 
// // // //                       type="select" 
// // // //                       name="category_id" 
// // // //                       value={form.category_id} 
// // // //                       onChange={handleCategoryChange} 
// // // //                       required
// // // //                     >
// // // //                       <option value="">Select Category</option>
// // // //                       {categories.map(category => (
// // // //                         <option key={category.id} value={category.id}>
// // // //                           {category.name}
// // // //                         </option>
// // // //                       ))}
// // // //                     </Input>
// // // //                   </FormGroup>
// // // //                 </Col>
// // // //                 <Col md={6}>
// // // //                   <FormGroup>
// // // //                     <Label>Brand *</Label>
// // // //                     <Input 
// // // //                       type="select" 
// // // //                       name="brand_id" 
// // // //                       value={form.brand_id} 
// // // //                       onChange={(e) => setForm({...form, brand_id: e.target.value})} 
// // // //                       required
// // // //                       disabled={!form.category_id}
// // // //                     >
// // // //                       <option value="">Select Brand</option>
// // // //                       {brands.map(brand => (
// // // //                         <option key={brand.id} value={brand.id}>
// // // //                           {brand.name}
// // // //                         </option>
// // // //                       ))}
// // // //                     </Input>
// // // //                   </FormGroup>
// // // //                 </Col>
// // // //               </Row>

// // // //               <FormGroup check className="mb-3">
// // // //                 <Input 
// // // //                   type="checkbox" 
// // // //                   name="is_active" 
// // // //                   checked={form.is_active} 
// // // //                   onChange={(e) => setForm({...form, is_active: e.target.checked})} 
// // // //                 />
// // // //                 <Label check>Active</Label>
// // // //               </FormGroup>

// // // //               <div className="text-end">
// // // //                 <Button color="secondary" onClick={toggleModal} className="me-2">
// // // //                   Cancel
// // // //                 </Button>
// // // //                 <Button type="submit" color="primary" disabled={submitting}>
// // // //                   {submitting ? <Spinner size="sm" /> : isEditing ? 'Update' : 'Save'} Product
// // // //                 </Button>
// // // //               </div>
// // // //             </Form>
// // // //           </ModalBody>
// // // //         </Modal>
// // // //       </div>
// // // //     </SimpleErrorBoundary>
// // // //   );
// // // // };

// // // // export default ProductManagement;




// // // 'use client';
// // // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // // import {
// // //   Button, ButtonGroup, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody,
// // //   Form, FormGroup, Input, Label, Table, Badge, Spinner, Alert, Pagination, PaginationItem, PaginationLink
// // // } from 'reactstrap';
// // // import axios from 'axios';

// // // // Configure axios with timeout and base URL
// // // const api = axios.create({
// // //   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
// // //   timeout: 10000,
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   }
// // // });

// // // // Custom Error Boundary Component
// // // class SimpleErrorBoundary extends React.Component {
// // //   constructor(props) {
// // //     super(props);
// // //     this.state = { hasError: false, error: null };
// // //   }

// // //   static getDerivedStateFromError(error) {
// // //     return { hasError: true, error };
// // //   }

// // //   componentDidCatch(error, errorInfo) {
// // //     console.error('Error caught by boundary:', error, errorInfo);
// // //   }

// // //   handleReset = () => {
// // //     this.setState({ hasError: false, error: null });
// // //     this.props.onReset?.();
// // //   };

// // //   render() {
// // //     if (this.state.hasError) {
// // //       return (
// // //         <div className="p-4">
// // //           <Alert color="danger">
// // //             <h5>Something went wrong:</h5>
// // //             <pre className="text-muted">{this.state.error.message}</pre>
// // //             <Button color="primary" onClick={this.handleReset}>
// // //               Try again
// // //             </Button>
// // //           </Alert>
// // //         </div>
// // //       );
// // //     }

// // //     return this.props.children;
// // //   }
// // // }

// // // // Image cache implementation
// // // const imageCache = new Map();

// // // const ProductRow = React.memo(({ product, index, pagination, loadingProducts, onEditClick, onDeleteClick }) => {
// // //   const [imageSrc, setImageSrc] = useState(imageCache.get(product.image_url) || product.image_url || '');

// // //   const handleImageError = useCallback(() => {
// // //     setImageSrc('https://via.placeholder.com/50?text=No+Image');
// // //   }, []);

// // //   useEffect(() => {
// // //     if (product.image_url && !imageCache.has(product.image_url)) {
// // //       const img = new Image();
// // //       img.src = product.image_url;
// // //       img.onload = () => {
// // //         imageCache.set(product.image_url, product.image_url);
// // //         setImageSrc(product.image_url);
// // //       };
// // //       img.onerror = handleImageError;
// // //     }
// // //   }, [product.image_url, handleImageError]);

// // //   return (
// // //     <tr key={product.id}>
// // //       <th scope="row">{(pagination.page - 1) * pagination.pageSize + index + 1}</th>
// // //       <td>
// // //         {imageSrc ? (
// // //           <img 
// // //             src={`http://localhost:8000${product.image_url}`}

// // //             alt={product.name} 
// // //             style={{ width: '50px', height: '50px', objectFit: 'cover' }}
// // //             onError={handleImageError}
// // //             loading="lazy"
// // //           />
// // //         ) : (
// // //           <div className="text-muted">No image</div>
// // //         )}
// // //       </td>
// // //       <td>
// // //         <strong>{product.name}</strong>
// // //         <div className="small text-muted">{product.description}</div>
// // //       </td>
// // //       <td>${product.price.toFixed(2)}</td>
// // //       <td>{product.quantity}</td>
// // //       <td>{product.category?.name || '-'}</td>
// // //       <td>{product.brand?.name || '-'}</td>
// // //       <td>
// // //         <Badge color={product.is_active ? 'success' : 'secondary'}>
// // //           {product.is_active ? 'Active' : 'Inactive'}
// // //         </Badge>
// // //       </td>
// // //       <td>
// // //         <ButtonGroup size="sm">
// // //           <Button color="warning" onClick={() => onEditClick(product)} disabled={loadingProducts}>
// // //             Edit
// // //           </Button>
// // //           <Button color="danger" onClick={() => onDeleteClick(product.id)} disabled={loadingProducts}>
// // //             Delete
// // //           </Button>
// // //         </ButtonGroup>
// // //       </td>
// // //     </tr>
// // //   );
// // // });

// // // const ProductManagement = () => {
// // //   // State management
// // //   const [products, setProducts] = useState([]);
// // //   const [categories, setCategories] = useState([]);
// // //   const [brands, setBrands] = useState([]);
// // //   const [form, setForm] = useState({
// // //     name: '',
// // //     slug: '',
// // //     description: '',
// // //     price: '',
// // //     quantity: 0,
// // //     category_id: '',
// // //     brand_id: '',
// // //     is_active: true,
// // //     image: null,
// // //     image_url: ''
// // //   });
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [currentProductId, setCurrentProductId] = useState(null);
// // //   const [loadingProducts, setLoadingProducts] = useState(false);
// // //   const [loadingCategories, setLoadingCategories] = useState(false);
// // //   const [submitting, setSubmitting] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [pagination, setPagination] = useState({
// // //     page: 1,
// // //     pageSize: 10,
// // //     total: 0
// // //   });

// // //   // Helper function to generate slug from name
// // //   const generateSlug = useCallback((name) => {
// // //     return name.toLowerCase()
// // //       .replace(/\s+/g, '-')
// // //       .replace(/[^\w-]+/g, '');
// // //   }, []);

// // //   // Helper function to handle API errors
// // //   const handleAPIError = useCallback((err, defaultMessage) => {
// // //     if (err.code === 'ECONNRESET' || err.message.includes('Network Error')) {
// // //       return 'Connection to server was lost. Please check your network and try again.';
// // //     }
// // //     if (err.response) {
// // //       if (err.response.data) {
// // //         if (typeof err.response.data === 'object') {
// // //           return err.response.data.detail 
// // //             ? err.response.data.detail.toString()
// // //             : JSON.stringify(err.response.data);
// // //         }
// // //         return err.response.data.toString();
// // //       }
// // //       return err.response.statusText || defaultMessage;
// // //     }
// // //     return err.message || defaultMessage;
// // //   }, []);

// // //   // API call with retry logic
// // //   const apiCallWithRetry = useCallback(async (apiCall, retries = 3, delay = 1000) => {
// // //     try {
// // //       return await apiCall();
// // //     } catch (err) {
// // //       if (retries <= 0) throw err;
// // //       await new Promise(res => setTimeout(res, delay));
// // //       return apiCallWithRetry(apiCall, retries - 1, delay * 2);
// // //     }
// // //   }, []);

// // //   // Fetch all data
// // //   useEffect(() => {
// // //     const loadData = async () => {
// // //       try {
// // //         await Promise.all([fetchProducts(), fetchCategories()]);
// // //       } catch (err) {
// // //         setError('Failed to load initial data: ' + handleAPIError(err, 'Unknown error'));
// // //       }
// // //     };
// // //     loadData();
// // //   }, [pagination.page]);

// // //   const fetchProducts = useCallback(async () => {
// // //     try {
// // //       setLoadingProducts(true);
// // //       setError(null);
// // //       const response = await apiCallWithRetry(() => 
// // //         api.get('/products/', {
// // //           params: {
// // //             page: pagination.page,
// // //             limit: pagination.pageSize
// // //           }
// // //         })
// // //       );
      
// // //       const newProducts = response.data.items || response.data;
// // //       setProducts(prev => JSON.stringify(prev) === JSON.stringify(newProducts) ? prev : newProducts);
      
// // //       const newTotal = response.data.total || response.data.length;
// // //       setPagination(prev => prev.total === newTotal ? prev : { ...prev, total: newTotal });
// // //     } catch (err) {
// // //       setError('Failed to fetch products: ' + handleAPIError(err, 'Unknown error'));
// // //     } finally {
// // //       setLoadingProducts(false);
// // //     }
// // //   }, [pagination.page, pagination.pageSize]);

// // //   const fetchCategories = useCallback(async () => {
// // //     try {
// // //       setLoadingCategories(true);
// // //       setError(null);
// // //       const response = await apiCallWithRetry(() => api.get('/categories/'));
// // //       setCategories(response.data);
// // //     } catch (err) {
// // //       setError('Failed to fetch categories: ' + handleAPIError(err, 'Unknown error'));
// // //     } finally {
// // //       setLoadingCategories(false);
// // //     }
// // //   }, []);

// // //   const fetchBrandsByCategory = useCallback(async (categoryId) => {
// // //     if (!categoryId) {
// // //       setBrands([]);
// // //       return;
// // //     }
// // //     try {
// // //       setError(null);
// // //       const response = await apiCallWithRetry(() => 
// // //         api.get(`/brands/by-category/${categoryId}`)
// // //       );
// // //       setBrands(response.data);
// // //     } catch (err) {
// // //       setError('Failed to fetch brands: ' + handleAPIError(err, 'Unknown error'));
// // //     }
// // //   }, []);

// // //   const handleCategoryChange = useCallback((e) => {
// // //     const categoryId = e.target.value;
// // //     setForm(prev => ({
// // //       ...prev,
// // //       category_id: categoryId,
// // //       brand_id: '' // Reset brand when category changes
// // //     }));
// // //     fetchBrandsByCategory(categoryId);
// // //   }, [fetchBrandsByCategory]);

// // //   const handleNameChange = useCallback((e) => {
// // //     const name = e.target.value;
// // //     setForm(prev => ({
// // //       ...prev,
// // //       name: name,
// // //       slug: generateSlug(name)
// // //     }));
// // //   }, [generateSlug]);

// // //   const handleSubmit = useCallback(async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       setSubmitting(true);
// // //       setError(null);
      
// // //       const productData = new FormData();
// // //       productData.append('name', form.name);
// // //       productData.append('slug', form.slug);
// // //       productData.append('description', form.description);
// // //       productData.append('price', parseFloat(form.price));
// // //       productData.append('quantity', parseInt(form.quantity));
// // //       productData.append('category_id', form.category_id);
// // //       productData.append('brand_id', form.brand_id);
// // //       productData.append('is_active', form.is_active);
// // //       if (form.image) {
// // //         productData.append('image', form.image);
// // //       }

// // //       if (isEditing) {
// // //         await apiCallWithRetry(() => 
// // //           api.put(`/products/${currentProductId}`, productData, {
// // //             headers: {
// // //               'Content-Type': 'multipart/form-data'
// // //             }
// // //           })
// // //         );

// // //       // await api.put(`/products/${currentProductId}`, productData); // i removed headers and add this line of content-type

// // //       } else {
// // //         await apiCallWithRetry(() => 
// // //           api.post('/products/', productData, {
// // //             headers: {
// // //               'Content-Type': 'multipart/form-data'
// // //             }
// // //           })
// // //         );
// // //       }

// // //       await fetchProducts();
// // //       toggleModal();
// // //     } catch (err) {
// // //       setError('Failed to save product: ' + handleAPIError(err, 'Unknown error'));
// // //     } finally {
// // //       setSubmitting(false);
// // //     }
// // //   }, [form, isEditing, currentProductId, fetchProducts]);

// // //   const handleEditClick = useCallback((product) => {
// // //     setForm({
// // //       name: product.name,
// // //       slug: product.slug,
// // //       description: product.description,
// // //       price: product.price.toString(),
// // //       quantity: product.quantity.toString(),
// // //       category_id: product.category.id,
// // //       brand_id: product.brand.id,
// // //       is_active: product.is_active,
// // //       image: null,
// // //       image_url: product.image_url || ''
// // //     });
// // //     setCurrentProductId(product.id);
// // //     setIsEditing(true);
// // //     fetchBrandsByCategory(product.category.id);
// // //     toggleModal();
// // //   }, [fetchBrandsByCategory]);

// // //   const handleDeleteProduct = useCallback(async (productId) => {
// // //     if (window.confirm('Are you sure you want to delete this product?')) {
// // //       try {
// // //         setLoadingProducts(true);
// // //         setError(null);
// // //         await apiCallWithRetry(() => api.delete(`/products/${productId}`));
// // //         await fetchProducts();
// // //       } catch (err) {
// // //         setError('Failed to delete product: ' + handleAPIError(err, 'Unknown error'));
// // //       } finally {
// // //         setLoadingProducts(false);
// // //       }
// // //     }
// // //   }, [fetchProducts]);

// // //   const resetForm = useCallback(() => {
// // //     setForm({
// // //       name: '',
// // //       slug: '',
// // //       description: '',
// // //       price: '',
// // //       quantity: 0,
// // //       category_id: '',
// // //       brand_id: '',
// // //       is_active: true,
// // //       image: null,
// // //       image_url: ''
// // //     });
// // //     setIsEditing(false);
// // //     setCurrentProductId(null);
// // //     setError(null);
// // //     setBrands([]);
// // //   }, []);

// // //   const toggleModal = useCallback(() => setModalOpen(prev => !prev), []);

// // //   const handlePageChange = useCallback((page) => {
// // //     setPagination(prev => ({ ...prev, page }));
// // //   }, []);

// // //   const renderPagination = useMemo(() => {
// // //     const totalPages = Math.ceil(pagination.total / pagination.pageSize);
// // //     if (totalPages <= 1) return null;

// // //     return (
// // //       <Pagination className="mt-3">
// // //         <PaginationItem disabled={pagination.page === 1}>
// // //           <PaginationLink previous onClick={() => handlePageChange(pagination.page - 1)} />
// // //         </PaginationItem>
        
// // //         {[...Array(totalPages)].map((_, i) => (
// // //           <PaginationItem active={i + 1 === pagination.page} key={i}>
// // //             <PaginationLink onClick={() => handlePageChange(i + 1)}>
// // //               {i + 1}
// // //             </PaginationLink>
// // //           </PaginationItem>
// // //         ))}
        
// // //         <PaginationItem disabled={pagination.page === totalPages}>
// // //           <PaginationLink next onClick={() => handlePageChange(pagination.page + 1)} />
// // //         </PaginationItem>
// // //       </Pagination>
// // //     );
// // //   }, [pagination, handlePageChange]);

// // //   const handleReset = useCallback(() => {
// // //     setError(null);
// // //     fetchProducts();
// // //     fetchCategories();
// // //   }, [fetchProducts, fetchCategories]);

// // //   return (
// // //     <SimpleErrorBoundary onReset={handleReset}>
// // //       <div className="p-4">
// // //         {error && (
// // //           <Alert color="danger" toggle={() => setError(null)}>
// // //             {error}
// // //           </Alert>
// // //         )}

// // //         <Row className="mb-4">
// // //           <Col className="text-end">
// // //             <Button color="primary" onClick={() => { resetForm(); toggleModal(); }} disabled={loadingProducts}>
// // //               {loadingProducts ? <Spinner size="sm" /> : 'Add Product'}
// // //             </Button>
// // //           </Col>
// // //         </Row>

// // //         <Row>
// // //           <Col md="12">
// // //             <Card>
// // //               <CardTitle tag="h5" className="border-bottom p-3 mb-0">Product List</CardTitle>
// // //               <CardBody>
// // //                 {loadingProducts && products.length === 0 ? (
// // //                   <div className="text-center py-4">
// // //                     <Spinner color="primary" />
// // //                   </div>
// // //                 ) : (
// // //                   <>
// // //                     <Table striped responsive hover>
// // //                       <thead>
// // //                         <tr>
// // //                           <th>#</th>
// // //                           <th>Image</th>
// // //                           <th>Name</th>
// // //                           <th>Price</th>
// // //                           <th>Stock</th>
// // //                           <th>Category</th>
// // //                           <th>Brand</th>
// // //                           <th>Status</th>
// // //                           <th>Actions</th>
// // //                         </tr>
// // //                       </thead>
// // //                       <tbody>
// // //                         {products.length === 0 ? (
// // //                           <tr>
// // //                             <td colSpan="9" className="text-center py-4">
// // //                               {loadingProducts ? <Spinner size="sm" /> : 'No products found'}
// // //                             </td>
// // //                           </tr>
// // //                         ) : (
// // //                           products.map((product, index) => (
// // //                             <ProductRow 
// // //                               key={product.id}
// // //                               product={product}
// // //                               index={index}
// // //                               pagination={pagination}
// // //                               loadingProducts={loadingProducts}
// // //                               onEditClick={handleEditClick}
// // //                               onDeleteClick={handleDeleteProduct}
// // //                             />
// // //                           ))
// // //                         )}
// // //                       </tbody>
// // //                     </Table>
// // //                     {renderPagination}
// // //                   </>
// // //                 )}
// // //               </CardBody>
// // //             </Card>
// // //           </Col>
// // //         </Row>

// // //         {/* Add/Edit Product Modal */}
// // //         <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" onClosed={resetForm}>
// // //           <ModalHeader toggle={toggleModal}>{isEditing ? 'Edit Product' : 'Add Product'}</ModalHeader>
// // //           <ModalBody>
// // //             <Form onSubmit={handleSubmit}>
// // //               <Row>
// // //                 <Col md={6}>
// // //                   <FormGroup>
// // //                     <Label>Name *</Label>
// // //                     <Input 
// // //                       name="name" 
// // //                       value={form.name} 
// // //                       onChange={handleNameChange} 
// // //                       required 
// // //                     />
// // //                   </FormGroup>
// // //                 </Col>
// // //                 <Col md={6}>
// // //                   <FormGroup>
// // //                     <Label>Slug *</Label>
// // //                     <Input 
// // //                       name="slug" 
// // //                       value={form.slug} 
// // //                       onChange={(e) => setForm(prev => ({...prev, slug: e.target.value}))} 
// // //                       required 
// // //                     />
// // //                   </FormGroup>
// // //                 </Col>
// // //               </Row>

// // //               <FormGroup>
// // //                 <Label>Description</Label>
// // //                 <Input 
// // //                   type="textarea" 
// // //                   name="description" 
// // //                   value={form.description} 
// // //                   onChange={(e) => setForm(prev => ({...prev, description: e.target.value}))} 
// // //                 />
// // //               </FormGroup>

// // //               <Row>
// // //                 <Col md={4}>
// // //                   <FormGroup>
// // //                     <Label>Price *</Label>
// // //                     <Input 
// // //                       type="number" 
// // //                       name="price" 
// // //                       value={form.price} 
// // //                       onChange={(e) => setForm(prev => ({...prev, price: e.target.value}))} 
// // //                       min="0.01"
// // //                       step="0.01"
// // //                       required 
// // //                     />
// // //                   </FormGroup>
// // //                 </Col>
// // //                 <Col md={4}>
// // //                   <FormGroup>
// // //                     <Label>Quantity *</Label>
// // //                     <Input 
// // //                       type="number" 
// // //                       name="quantity" 
// // //                       value={form.quantity} 
// // //                       onChange={(e) => setForm(prev => ({...prev, quantity: e.target.value}))} 
// // //                       min="0"
// // //                       required 
// // //                     />
// // //                   </FormGroup>
// // //                 </Col>
// // //                 <Col md={4}>
// // //                   <FormGroup>
// // //                     <Label>Product Image</Label>
// // //                     <Input 
// // //                       type="file" 
// // //                       name="image" 
// // //                       onChange={(e) => setForm(prev => ({...prev, image: e.target.files[0]}))}
// // //                       accept="image/jpeg, image/png, image/gif, image/webp"
// // //                     />
// // //                     {form.image_url && !form.image && (
// // //                       <div className="mt-2">
// // //                         <small>Current image:</small>
// // //                         <img 
// // //                           src={form.image_url} 
// // //                           alt="Current product" 
// // //                           style={{ width: '50px', height: '50px', objectFit: 'cover', display: 'block' }}
// // //                         />
// // //                       </div>
// // //                     )}
// // //                   </FormGroup>
// // //                 </Col>
// // //               </Row>

// // //               <Row>
// // //                 <Col md={6}>
// // //                   <FormGroup>
// // //                     <Label>Category *</Label>
// // //                     <Input 
// // //                       type="select" 
// // //                       name="category_id" 
// // //                       value={form.category_id} 
// // //                       onChange={handleCategoryChange} 
// // //                       required
// // //                     >
// // //                       <option value="">Select Category</option>
// // //                       {categories.map(category => (
// // //                         <option key={category.id} value={category.id}>
// // //                           {category.name}
// // //                         </option>
// // //                       ))}
// // //                     </Input>
// // //                   </FormGroup>
// // //                 </Col>
// // //                 <Col md={6}>
// // //                   <FormGroup>
// // //                     <Label>Brand *</Label>
// // //                     <Input 
// // //                       type="select" 
// // //                       name="brand_id" 
// // //                       value={form.brand_id} 
// // //                       onChange={(e) => setForm(prev => ({...prev, brand_id: e.target.value}))} 
// // //                       required
// // //                       disabled={!form.category_id}
// // //                     >
// // //                       <option value="">Select Brand</option>
// // //                       {brands.map(brand => (
// // //                         <option key={brand.id} value={brand.id}>
// // //                           {brand.name}
// // //                         </option>
// // //                       ))}
// // //                     </Input>
// // //                   </FormGroup>
// // //                 </Col>
// // //               </Row>

// // //               <FormGroup check className="mb-3">
// // //                 <Input 
// // //                   type="checkbox" 
// // //                   name="is_active" 
// // //                   checked={form.is_active} 
// // //                   onChange={(e) => setForm(prev => ({...prev, is_active: e.target.checked}))} 
// // //                 />
// // //                 <Label check>Active</Label>
// // //               </FormGroup>

// // //               <div className="text-end">
// // //                 <Button color="secondary" onClick={toggleModal} className="me-2">
// // //                   Cancel
// // //                 </Button>
// // //                 <Button type="submit" color="primary" disabled={submitting}>
// // //                   {submitting ? <Spinner size="sm" /> : isEditing ? 'Update' : 'Save'} Product
// // //                 </Button>
// // //               </div>
// // //             </Form>
// // //           </ModalBody>
// // //         </Modal>
// // //       </div>
// // //     </SimpleErrorBoundary>
// // //   );
// // // };

// // // export default ProductManagement;







// // 'use client';
// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import {
// //   Button, ButtonGroup, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody,
// //   Form, FormGroup, Input, Label, Table, Badge, Spinner, Alert, Pagination, PaginationItem, PaginationLink
// // } from 'reactstrap';
// // import axios from 'axios';

// // // Configure axios with timeout and base URL
// // const api = axios.create({
// //   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
// //   timeout: 10000,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   }
// // });

// // // Custom Error Boundary Component
// // class SimpleErrorBoundary extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = { hasError: false, error: null };
// //   }

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }

// //   componentDidCatch(error, errorInfo) {
// //     console.error('Error caught by boundary:', error, errorInfo);
// //   }

// //   handleReset = () => {
// //     this.setState({ hasError: false, error: null });
// //     this.props.onReset?.();
// //   };

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <div className="p-4">
// //           <Alert color="danger">
// //             <h5>Something went wrong:</h5>
// //             <pre className="text-muted">{this.state.error.message}</pre>
// //             <Button color="primary" onClick={this.handleReset}>
// //               Try again
// //             </Button>
// //           </Alert>
// //         </div>
// //       );
// //     }

// //     return this.props.children;
// //   }
// // }

// // // Image cache implementation
// // const imageCache = new Map();

// // const ProductRow = React.memo(({ product, index, pagination, loadingProducts, onEditClick, onDeleteClick }) => {
// //   const [imageSrc, setImageSrc] = useState(imageCache.get(product.image_url) || product.image_url || '');

// //   const handleImageError = useCallback(() => {
// //     setImageSrc('https://via.placeholder.com/50?text=No+Image');
// //   }, []);

// //   useEffect(() => {
// //     if (product.image_url && !imageCache.has(product.image_url)) {
// //       const img = new Image();
// //       img.src = product.image_url;
// //       img.onload = () => {
// //         imageCache.set(product.image_url, product.image_url);
// //         setImageSrc(product.image_url);
// //       };
// //       img.onerror = handleImageError;
// //     }
// //   }, [product.image_url, handleImageError]);

// //   return (
// //     <tr key={product.id}>
// //       <th scope="row">{(pagination.page - 1) * pagination.pageSize + index + 1}</th>
// //       <td>
// //         {imageSrc ? (
// //           <img 
// //             src={imageSrc.startsWith('blob:') ? imageSrc : `http://localhost:8000${imageSrc}`}
// //             alt={product.name} 
// //             style={{ width: '50px', height: '50px', objectFit: 'cover' }}
// //             onError={handleImageError}
// //             loading="lazy"
// //           />
// //         ) : (
// //           <div className="text-muted">No image</div>
// //         )}
// //       </td>
// //       <td>
// //         <strong>{product.name}</strong>
// //         <div className="small text-muted">{product.description}</div>
// //       </td>
// //       <td>${product.price.toFixed(2)}</td>
// //       <td>{product.quantity}</td>
// //       <td>{product.category?.name || '-'}</td>
// //       <td>{product.brand?.name || '-'}</td>
// //       <td>
// //         <Badge color={product.is_active ? 'success' : 'secondary'}>
// //           {product.is_active ? 'Active' : 'Inactive'}
// //         </Badge>
// //       </td>
// //       <td>
// //         <ButtonGroup size="sm">
// //           <Button color="warning" onClick={() => onEditClick(product)} disabled={loadingProducts}>
// //             Edit
// //           </Button>
// //           <Button color="danger" onClick={() => onDeleteClick(product.id)} disabled={loadingProducts}>
// //             Delete
// //           </Button>
// //         </ButtonGroup>
// //       </td>
// //     </tr>
// //   );
// // });

// // const ProductManagement = () => {
// //   // State management
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [form, setForm] = useState({
// //     name: '',
// //     slug: '',
// //     description: '',
// //     price: '',
// //     quantity: 0,
// //     category_id: '',
// //     brand_id: '',
// //     is_active: true,
// //     image: null,
// //     image_url: ''
// //   });
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentProductId, setCurrentProductId] = useState(null);
// //   const [loadingProducts, setLoadingProducts] = useState(false);
// //   const [loadingCategories, setLoadingCategories] = useState(false);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [pagination, setPagination] = useState({
// //     page: 1,
// //     pageSize: 10,
// //     total: 0
// //   });

// //   // Helper function to generate slug from name
// //   const generateSlug = useCallback((name) => {
// //     return name.toLowerCase()
// //       .replace(/\s+/g, '-')
// //       .replace(/[^\w-]+/g, '');
// //   }, []);

// //   // Helper function to handle API errors
// //   const handleAPIError = useCallback((err, defaultMessage) => {
// //     if (err.code === 'ECONNABORTED' || err.message.includes('Network Error')) {
// //       return 'Connection to server was lost. Please check your network and try again.';
// //     }
// //     if (err.response) {
// //       if (err.response.data) {
// //         if (typeof err.response.data === 'object') {
// //           return err.response.data.detail 
// //             ? err.response.data.detail.toString()
// //             : JSON.stringify(err.response.data);
// //         }
// //         return err.response.data.toString();
// //       }
// //       return err.response.statusText || defaultMessage;
// //     }
// //     return err.message || defaultMessage;
// //   }, []);

// //   // API call with retry logic
// //   const apiCallWithRetry = useCallback(async (apiCall, retries = 3, delay = 1000) => {
// //     try {
// //       return await apiCall();
// //     } catch (err) {
// //       if (retries <= 0) throw err;
// //       await new Promise(res => setTimeout(res, delay));
// //       return apiCallWithRetry(apiCall, retries - 1, delay * 2);
// //     }
// //   }, []);

// //   // Fetch all data
// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         await Promise.all([fetchProducts(), fetchCategories()]);
// //       } catch (err) {
// //         setError('Failed to load initial data: ' + handleAPIError(err, 'Unknown error'));
// //       }
// //     };
// //     loadData();
// //   }, [pagination.page]);

// //   const fetchProducts = useCallback(async (page = pagination.page) => {
// //     try {
// //       setLoadingProducts(true);
// //       setError(null);
// //       const response = await apiCallWithRetry(() => 
// //         api.get('/products/', {
// //           params: {
// //             page,
// //             limit: pagination.pageSize
// //           }
// //         })
// //       );
      
// //       const newProducts = response.data.items || response.data;
// //       setProducts(newProducts);
      
// //       const newTotal = response.data.total || response.data.length;
// //       setPagination(prev => ({
// //         ...prev,
// //         total: newTotal,
// //         page: page
// //       }));
// //     } catch (err) {
// //       setError('Failed to fetch products: ' + handleAPIError(err, 'Unknown error'));
// //     } finally {
// //       setLoadingProducts(false);
// //     }
// //   }, [pagination.pageSize]);

// //   const fetchCategories = useCallback(async () => {
// //     try {
// //       setLoadingCategories(true);
// //       setError(null);
// //       const response = await apiCallWithRetry(() => api.get('/categories/'));
// //       setCategories(response.data);
// //     } catch (err) {
// //       setError('Failed to fetch categories: ' + handleAPIError(err, 'Unknown error'));
// //     } finally {
// //       setLoadingCategories(false);
// //     }
// //   }, []);

// //   const fetchBrandsByCategory = useCallback(async (categoryId) => {
// //     if (!categoryId) {
// //       setBrands([]);
// //       return;
// //     }
// //     try {
// //       setError(null);
// //       const response = await apiCallWithRetry(() => 
// //         api.get(`/brands/by-category/${categoryId}`)
// //       );
// //       setBrands(response.data);
// //     } catch (err) {
// //       setError('Failed to fetch brands: ' + handleAPIError(err, 'Unknown error'));
// //     }
// //   }, []);

// //   const handleCategoryChange = useCallback((e) => {
// //     const categoryId = e.target.value;
// //     setForm(prev => ({
// //       ...prev,
// //       category_id: categoryId,
// //       brand_id: '' // Reset brand when category changes
// //     }));
// //     fetchBrandsByCategory(categoryId);
// //   }, [fetchBrandsByCategory]);

// //   const handleNameChange = useCallback((e) => {
// //     const name = e.target.value;
// //     setForm(prev => ({
// //       ...prev,
// //       name: name,
// //       slug: generateSlug(name)
// //     }));
// //   }, [generateSlug]);

// //   const handleImageChange = useCallback((e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     // Validate file type
// //     const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
// //     if (!validTypes.includes(file.type)) {
// //       setError('Invalid image type. Please upload a JPEG, PNG, GIF, or WebP image.');
// //       return;
// //     }

// //     // Validate file size (5MB max)
// //     if (file.size > 5 * 1024 * 1024) {
// //       setError('Image too large. Maximum size is 5MB.');
// //       return;
// //     }

// //     // Create preview URL
// //     const previewUrl = URL.createObjectURL(file);
    
// //     setForm(prev => ({
// //       ...prev,
// //       image: file,
// //       image_url: previewUrl // Temporary URL for preview
// //     }));
// //     setError(null);
// //   }, []);

// //   const handleSubmit = useCallback(async (e) => {
// //     e.preventDefault();
// //     try {
// //       setSubmitting(true);
// //       setError(null);
      
// //       const productData = new FormData();
// //       productData.append('name', form.name);
// //       productData.append('slug', form.slug);
// //       productData.append('description', form.description);
// //       productData.append('price', parseFloat(form.price));
// //       productData.append('quantity', parseInt(form.quantity));
// //       productData.append('category_id', form.category_id);
// //       productData.append('brand_id', form.brand_id);
// //       productData.append('is_active', form.is_active);
// //       if (form.image) {
// //         productData.append('image', form.image);
// //       }

// //       let response;
// //       if (isEditing) {
// //         response = await apiCallWithRetry(() => 
// //           api.put(`/products/${currentProductId}`, productData, {
// //             headers: {
// //               'Content-Type': 'multipart/form-data'
// //             }
// //           })
// //         );
        
// //         // Update the specific product in state
// //         setProducts(prevProducts => 
// //           prevProducts.map(p => 
// //             p.id === currentProductId ? response.data : p
// //           )
// //         );
// //       } else {
// //         response = await apiCallWithRetry(() => 
// //           api.post('/products/', productData, {
// //             headers: {
// //               'Content-Type': 'multipart/form-data'
// //             }
// //           })
// //         );
        
// //         // For new products, refresh the first page
// //         await fetchProducts(1);
// //       }

// //       toggleModal();
// //     } catch (err) {
// //       setError('Failed to save product: ' + handleAPIError(err, 'Unknown error'));
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   }, [form, isEditing, currentProductId, fetchProducts]);

// //   const handleEditClick = useCallback((product) => {
// //     setForm({
// //       name: product.name,
// //       slug: product.slug,
// //       description: product.description || '',
// //       price: product.price.toString(),
// //       quantity: product.quantity.toString(),
// //       category_id: product.category?.id || '',
// //       brand_id: product.brand?.id || '',
// //       is_active: product.is_active,
// //       image: null,
// //       image_url: product.image_url || ''
// //     });
// //     setCurrentProductId(product.id);
// //     setIsEditing(true);
// //     fetchBrandsByCategory(product.category?.id);
// //     toggleModal();
// //   }, [fetchBrandsByCategory]);

// //   const handleDeleteProduct = useCallback(async (productId) => {
// //     if (window.confirm('Are you sure you want to delete this product?')) {
// //       try {
// //         setLoadingProducts(true);
// //         setError(null);
// //         await apiCallWithRetry(() => api.delete(`/products/${productId}`));
// //         await fetchProducts();
// //       } catch (err) {
// //         setError('Failed to delete product: ' + handleAPIError(err, 'Unknown error'));
// //       } finally {
// //         setLoadingProducts(false);
// //       }
// //     }
// //   }, [fetchProducts]);

// //   const resetForm = useCallback(() => {
// //     setForm({
// //       name: '',
// //       slug: '',
// //       description: '',
// //       price: '',
// //       quantity: 0,
// //       category_id: '',
// //       brand_id: '',
// //       is_active: true,
// //       image: null,
// //       image_url: ''
// //     });
// //     setIsEditing(false);
// //     setCurrentProductId(null);
// //     setError(null);
// //     setBrands([]);
// //   }, []);

// //   const toggleModal = useCallback(() => {
// //     setModalOpen(prev => {
// //       if (!prev) { // When opening modal
// //         setError(null);
// //       }
// //       return !prev;
// //     });
// //   }, []);

// //   const handlePageChange = useCallback((page) => {
// //     setPagination(prev => ({ ...prev, page }));
// //   }, []);

// //   const renderPagination = useMemo(() => {
// //     const totalPages = Math.ceil(pagination.total / pagination.pageSize);
// //     if (totalPages <= 1) return null;

// //     return (
// //       <Pagination className="mt-3">
// //         <PaginationItem disabled={pagination.page === 1}>
// //           <PaginationLink previous onClick={() => handlePageChange(pagination.page - 1)} />
// //         </PaginationItem>
        
// //         {[...Array(totalPages)].map((_, i) => (
// //           <PaginationItem active={i + 1 === pagination.page} key={i}>
// //             <PaginationLink onClick={() => handlePageChange(i + 1)}>
// //               {i + 1}
// //             </PaginationLink>
// //           </PaginationItem>
// //         ))}
        
// //         <PaginationItem disabled={pagination.page === totalPages}>
// //           <PaginationLink next onClick={() => handlePageChange(pagination.page + 1)} />
// //         </PaginationItem>
// //       </Pagination>
// //     );
// //   }, [pagination, handlePageChange]);

// //   const handleReset = useCallback(() => {
// //     setError(null);
// //     fetchProducts();
// //     fetchCategories();
// //   }, [fetchProducts, fetchCategories]);

// //   return (
// //     <SimpleErrorBoundary onReset={handleReset}>
// //       <div className="p-4">
// //         {error && (
// //           <Alert color="danger" toggle={() => setError(null)}>
// //             {error}
// //           </Alert>
// //         )}

// //         <Row className="mb-4">
// //           <Col className="text-end">
// //             <Button color="primary" onClick={() => { resetForm(); toggleModal(); }} disabled={loadingProducts}>
// //               {loadingProducts ? <Spinner size="sm" /> : 'Add Product'}
// //             </Button>
// //           </Col>
// //         </Row>

// //         <Row>
// //           <Col md="12">
// //             <Card>
// //               <CardTitle tag="h5" className="border-bottom p-3 mb-0">Product List</CardTitle>
// //               <CardBody>
// //                 {loadingProducts && products.length === 0 ? (
// //                   <div className="text-center py-4">
// //                     <Spinner color="primary" />
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Table striped responsive hover>
// //                       <thead>
// //                         <tr>
// //                           <th>#</th>
// //                           <th>Image</th>
// //                           <th>Name</th>
// //                           <th>Price</th>
// //                           <th>Stock</th>
// //                           <th>Category</th>
// //                           <th>Brand</th>
// //                           <th>Status</th>
// //                           <th>Actions</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {products.length === 0 ? (
// //                           <tr>
// //                             <td colSpan="9" className="text-center py-4">
// //                               {loadingProducts ? <Spinner size="sm" /> : 'No products found'}
// //                             </td>
// //                           </tr>
// //                         ) : (
// //                           products.map((product, index) => (
// //                             <ProductRow 
// //                               key={product.id}
// //                               product={product}
// //                               index={index}
// //                               pagination={pagination}
// //                               loadingProducts={loadingProducts}
// //                               onEditClick={handleEditClick}
// //                               onDeleteClick={handleDeleteProduct}
// //                             />
// //                           ))
// //                         )}
// //                       </tbody>
// //                     </Table>
// //                     {renderPagination}
// //                   </>
// //                 )}
// //               </CardBody>
// //             </Card>
// //           </Col>
// //         </Row>

// //         {/* Add/Edit Product Modal */}
// //         <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" onClosed={resetForm}>
// //           <ModalHeader toggle={toggleModal}>{isEditing ? 'Edit Product' : 'Add Product'}</ModalHeader>
// //           <ModalBody>
// //             <Form onSubmit={handleSubmit}>
// //               <Row>
// //                 <Col md={6}>
// //                   <FormGroup>
// //                     <Label>Name *</Label>
// //                     <Input 
// //                       name="name" 
// //                       value={form.name} 
// //                       onChange={handleNameChange} 
// //                       required 
// //                     />
// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={6}>
// //                   <FormGroup>
// //                     <Label>Slug *</Label>
// //                     <Input 
// //                       name="slug" 
// //                       value={form.slug} 
// //                       onChange={(e) => setForm(prev => ({...prev, slug: e.target.value}))} 
// //                       required 
// //                     />
// //                   </FormGroup>
// //                 </Col>
// //               </Row>

// //               <FormGroup>
// //                 <Label>Description</Label>
// //                 <Input 
// //                   type="textarea" 
// //                   name="description" 
// //                   value={form.description} 
// //                   onChange={(e) => setForm(prev => ({...prev, description: e.target.value}))} 
// //                 />
// //               </FormGroup>

// //               <Row>
// //                 <Col md={4}>
// //                   <FormGroup>
// //                     <Label>Price *</Label>
// //                     <Input 
// //                       type="number" 
// //                       name="price" 
// //                       value={form.price} 
// //                       onChange={(e) => setForm(prev => ({...prev, price: e.target.value}))} 
// //                       min="0.01"
// //                       step="0.01"
// //                       required 
// //                     />
// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={4}>
// //                   <FormGroup>
// //                     <Label>Quantity *</Label>
// //                     <Input 
// //                       type="number" 
// //                       name="quantity" 
// //                       value={form.quantity} 
// //                       onChange={(e) => setForm(prev => ({...prev, quantity: e.target.value}))} 
// //                       min="0"
// //                       required 
// //                     />
// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={4}>
// //                   <FormGroup>
// //                     <Label>Product Image</Label>
// //                     <Input 
// //                       type="file" 
// //                       name="image" 
// //                       onChange={handleImageChange}
// //                       accept="image/jpeg, image/png, image/gif, image/webp"
// //                     />
// //                     {(form.image_url || form.image) && (
// //                       <div className="mt-2">
// //                         <small>Preview:</small>
// //                         <img 
// //                           src={form.image_url} 
// //                           alt="Product preview" 
// //                           style={{ 
// //                             width: '100px', 
// //                             height: '100px', 
// //                             objectFit: 'cover', 
// //                             display: 'block',
// //                             marginTop: '5px'
// //                           }}
// //                           onLoad={(e) => {
// //                             // Revoke the object URL to avoid memory leaks
// //                             if (form.image) {
// //                               URL.revokeObjectURL(e.target.src);
// //                             }
// //                           }}
// //                         />
// //                       </div>
// //                     )}
// //                   </FormGroup>
// //                 </Col>
// //               </Row>

// //               <Row>
// //                 <Col md={6}>
// //                   <FormGroup>
// //                     <Label>Category *</Label>
// //                     <Input 
// //                       type="select" 
// //                       name="category_id" 
// //                       value={form.category_id} 
// //                       onChange={handleCategoryChange} 
// //                       required
// //                     >
// //                       <option value="">Select Category</option>
// //                       {categories.map(category => (
// //                         <option key={category.id} value={category.id}>
// //                           {category.name}
// //                         </option>
// //                       ))}
// //                     </Input>
// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={6}>
// //                   <FormGroup>
// //                     <Label>Brand *</Label>
// //                     <Input 
// //                       type="select" 
// //                       name="brand_id" 
// //                       value={form.brand_id} 
// //                       onChange={(e) => setForm(prev => ({...prev, brand_id: e.target.value}))} 
// //                       required
// //                       disabled={!form.category_id}
// //                     >
// //                       <option value="">Select Brand</option>
// //                       {brands.map(brand => (
// //                         <option key={brand.id} value={brand.id}>
// //                           {brand.name}
// //                         </option>
// //                       ))}
// //                     </Input>
// //                   </FormGroup>
// //                 </Col>
// //               </Row>

// //               <FormGroup check className="mb-3">
// //                 <Input 
// //                   type="checkbox" 
// //                   name="is_active" 
// //                   checked={form.is_active} 
// //                   onChange={(e) => setForm(prev => ({...prev, is_active: e.target.checked}))} 
// //                 />
// //                 <Label check>Active</Label>
// //               </FormGroup>

// //               <div className="text-end">
// //                 <Button color="secondary" onClick={toggleModal} className="me-2">
// //                   Cancel
// //                 </Button>
// //                 <Button type="submit" color="primary" disabled={submitting}>
// //                   {submitting ? <Spinner size="sm" /> : isEditing ? 'Update' : 'Save'} Product
// //                 </Button>
// //               </div>
// //             </Form>
// //           </ModalBody>
// //         </Modal>
// //       </div>
// //     </SimpleErrorBoundary>
// //   );
// // };

// // export default ProductManagement;






// // 'use client';
// // import React, { useState, useEffect, useCallback } from 'react';
// // import {
// //   Button, ButtonGroup, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody,
// //   Form, FormGroup, Input, Label, Table, Badge, Spinner, Alert, Fade
// // } from 'reactstrap';
// // import axios from 'axios';

// // const api = axios.create({
// //   baseURL: 'http://localhost:8000/api/v1',
// //   timeout: 10000,
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Accept': 'application/json'
// //   }
// // });

// // const ProductManagement = () => {
// //   // State management
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     slug: '',
// //     description: '',
// //     price: '',
// //     quantity: '0',
// //     category_id: '',
// //     brand_id: '',
// //     is_active: true,
// //     image: null,
// //     image_url: ''
// //   });
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentProductId, setCurrentProductId] = useState(null);
// //   const [loadingProducts, setLoadingProducts] = useState(false);
// //   const [loadingCategories, setLoadingCategories] = useState(false);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [error, setError] = useState(null);

// //   // Helper functions
// //   const handleAPIError = (err) => {
// //     if (err.response) {
// //       if (err.response.status === 422) {
// //         if (err.response.data && err.response.data.detail) {
// //           if (Array.isArray(err.response.data.detail)) {
// //             return err.response.data.detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join('\n');
// //           }
// //           return err.response.data.detail;
// //         }
// //         return 'Validation error occurred';
// //       }
// //       return err.response.data?.detail || err.response.statusText || 'An error occurred';
// //     }
// //     return err.message || 'Network error occurred';
// //   };

// //   // Data fetching
// //   const fetchProducts = useCallback(async () => {
// //     try {
// //       setLoadingProducts(true);
// //       setError(null);
// //       const response = await api.get('/');
// //       setProducts(response.data || []);
// //     } catch (err) {
// //       const errorMsg = 'Failed to fetch products: ' + handleAPIError(err);
// //       setError(errorMsg);
// //       console.error('Products fetch error:', err);
// //       setProducts([]);
// //     } finally {
// //       setLoadingProducts(false);
// //     }
// //   }, []);

// //   const fetchCategories = useCallback(async () => {
// //     try {
// //       setLoadingCategories(true);
// //       setError(null);
// //       const response = await api.get('/');
// //       setCategories(response.data || []);
// //     } catch (err) {
// //       const errorMsg = 'Failed to fetch categories: ' + handleAPIError(err);
// //       setError(errorMsg);
// //       console.error('Categories fetch error:', err);
// //       setCategories([]);
// //     } finally {
// //       setLoadingCategories(false);
// //     }
// //   }, []);

// //   const fetchBrandsByCategory = useCallback(async (categoryId) => {
// //     if (!categoryId) {
// //       setBrands([]);
// //       return;
// //     }
// //     try {
// //       const id = parseInt(categoryId);
// //       if (isNaN(id)) {
// //         throw new Error('Invalid category ID');
// //       }
// //       const response = await api.get(`/brands?category_id=${id}`);
// //       setBrands(response.data || []);
// //     } catch (err) {
// //       setError('Failed to fetch brands: ' + handleAPIError(err));
// //       setBrands([]);
// //     }
// //   }, []);

// //   // Form handlers
// //   const handleNameChange = useCallback((e) => {
// //     const name = e.target.value;
// //     const slug = name.toLowerCase()
// //       .replace(/\s+/g, '-')
// //       .replace(/[^\w-]+/g, '');
    
// //     setFormData(prev => ({
// //       ...prev,
// //       name,
// //       slug
// //     }));
// //   }, []);

// //   const handleCategoryChange = useCallback(async (e) => {
// //     const categoryId = e.target.value;
// //     setFormData(prev => ({
// //       ...prev,
// //       category_id: categoryId,
// //       brand_id: ''
// //     }));

    
// //     await fetchBrandsByCategory(categoryId);
// //   }, [fetchBrandsByCategory]);

// //   const handleImageChange = useCallback((e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
// //     if (!validTypes.includes(file.type)) {
// //       setError('Invalid image type. Please upload a JPEG, PNG, GIF, or WebP image.');
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       setError('Image too large. Maximum size is 5MB.');
// //       return;
// //     }

// //     const previewUrl = URL.createObjectURL(file);
    
// //     setFormData(prev => ({
// //       ...prev,
// //       image: file,
// //       image_url: previewUrl
// //     }));
// //     setError(null);
// //   }, []);

// //   const handleSubmit = useCallback(async (e) => {
// //     e.preventDefault();
// //     try {
// //       setSubmitting(true);
// //       setError(null);
      
// //       // Validate required fields
// //       if (!formData.name || !formData.slug || !formData.price || !formData.quantity || !formData.category_id || !formData.brand_id) {
// //         throw new Error('Please fill all required fields');
// //       }

// //       const formDataObj = new FormData();
// //       formDataObj.append('name', formData.name);
// //       formDataObj.append('slug', formData.slug);
// //       formDataObj.append('description', formData.description || '');
// //       formDataObj.append('price', parseFloat(formData.price));
// //       formDataObj.append('quantity', parseInt(formData.quantity));
// //       formDataObj.append('category_id', parseInt(formData.category_id));
// //       formDataObj.append('brand_id', parseInt(formData.brand_id));
// //       formDataObj.append('is_active', formData.is_active);
// //       if (formData.image) {
// //         formDataObj.append('image', formData.image);
// //       }

// //       if (isEditing) {
// //         await api.put(`/${currentProductId}`, formDataObj, {
// //           headers: {
// //             'Content-Type': 'multipart/form-data'
// //           }
// //         });
// //       } else {
// //         await api.post('/', formDataObj, {
// //           headers: {
// //             'Content-Type': 'multipart/form-data'
// //           }
// //         });
// //       }

// //       await fetchProducts();
// //       setModalOpen(false);
// //     } catch (err) {
// //       setError('Failed to save product: ' + handleAPIError(err));
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   }, [isEditing, currentProductId, fetchProducts, formData]);

// //   const handleEditClick = useCallback((product) => {
// //     setFormData({
// //       name: product.name,
// //       slug: product.slug,
// //       description: product.description || '',
// //       price: product.price.toString(),
// //       quantity: product.quantity.toString(),
// //       category_id: product.category?.id?.toString() || '',
// //       brand_id: product.brand?.id?.toString() || '',
// //       is_active: product.is_active,
// //       image: null,
// //       image_url: product.image_url || ''
// //     });
// //     setCurrentProductId(product.id);
// //     setIsEditing(true);
// //     fetchBrandsByCategory(product.category?.id);
// //     setModalOpen(true);
// //   }, [fetchBrandsByCategory]);

// //   const handleDeleteProduct = useCallback(async (productId) => {
// //     if (window.confirm('Are you sure you want to delete this product?')) {
// //       try {
// //         setLoadingProducts(true);
// //         await api.delete(`/${productId}`);
// //         await fetchProducts();
// //       } catch (err) {
// //         setError('Failed to delete product: ' + handleAPIError(err));
// //       } finally {
// //         setLoadingProducts(false);
// //       }
// //     }
// //   }, [fetchProducts]);

// //   const resetForm = useCallback(() => {
// //     setFormData({
// //       name: '',
// //       slug: '',
// //       description: '',
// //       price: '',
// //       quantity: '0',
// //       category_id: '',
// //       brand_id: '',
// //       is_active: true,
// //       image: null,
// //       image_url: ''
// //     });
// //     setIsEditing(false);
// //     setCurrentProductId(null);
// //     setError(null);
// //     setBrands([]);
// //   }, []);

// //   const toggleModal = useCallback(() => {
// //     setModalOpen(prev => {
// //       if (!prev) resetForm();
// //       return !prev;
// //     });
// //   }, [resetForm]);

// //   // Initial data load
// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         await Promise.all([fetchProducts(), fetchCategories()]);
// //       } catch (err) {
// //         setError('Failed to load initial data: ' + handleAPIError(err));
// //       }
// //     };
// //     loadData();
// //   }, [fetchProducts, fetchCategories]);

// //   return (
// //     <div className="p-4">
// //       {error && (
// //         <Fade in={!!error} timeout={300}>
// //           <Alert color="danger" toggle={() => setError(null)}>
// //             {error}
// //           </Alert>
// //         </Fade>
// //       )}

// //       <Row className="mb-4">
// //         <Col className="text-end">
// //           <Button color="primary" onClick={toggleModal} disabled={loadingProducts}>
// //             {loadingProducts ? <Spinner size="sm" /> : 'Add Product'}
// //           </Button>
// //         </Col>
// //       </Row>

// //       <Row>
// //         <Col md="12">
// //           <Card>
// //             <CardTitle tag="h5" className="border-bottom p-3 mb-0">Product List</CardTitle>
// //             <CardBody>
// //               {loadingProducts && products.length === 0 ? (
// //                 <div className="text-center py-4">
// //                   <Spinner color="primary" />
// //                 </div>
// //               ) : (
// //                 <>
// //                   <Table striped responsive hover>
// //                     <thead>
// //                       <tr>
// //                         <th>#</th>
// //                         <th>Image</th>
// //                         <th>Name</th>
// //                         <th>Price</th>
// //                         <th>Stock</th>
// //                         <th>Category</th>
// //                         <th>Brand</th>
// //                         <th>Status</th>
// //                         <th>Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {products.length === 0 ? (
// //                         <tr>
// //                           <td colSpan="9" className="text-center py-4">
// //                             {loadingProducts ? <Spinner size="sm" /> : 'No products found'}
// //                           </td>
// //                         </tr>
// //                       ) : (
// //                         products.map((product, index) => (
// //                           <tr key={product.id}>
// //                             <th scope="row">{index + 1}</th>
// //                             <td>
// //                               {product.image_url ? (
// //                                 <img 
// //                                   src={product.image_url.startsWith('http') ? 
// //                                     product.image_url : 
// //                                     `http://localhost:8000${product.image_url}`}
// //                                   alt={product.name} 
// //                                   style={{ width: '50px', height: '50px', objectFit: 'cover' }}
// //                                   onError={(e) => {
// //                                     e.target.src = 'https://via.placeholder.com/50?text=No+Image';
// //                                   }}
// //                                 />
// //                               ) : (
// //                                 <div className="text-muted">No image</div>
// //                               )}
// //                             </td>
// //                             <td>
// //                               <strong>{product.name}</strong>
// //                               {product.description && (
// //                                 <div className="small text-muted">{product.description}</div>
// //                               )}
// //                             </td>
// //                             <td>${parseFloat(product.price).toFixed(2)}</td>
// //                             <td>{product.quantity}</td>
// //                             <td>{product.category?.name || '-'}</td>
// //                             <td>{product.brand?.name || '-'}</td>
// //                             <td>
// //                               <Badge color={product.is_active ? 'success' : 'secondary'}>
// //                                 {product.is_active ? 'Active' : 'Inactive'}
// //                               </Badge>
// //                             </td>
// //                             <td>
// //                               <ButtonGroup size="sm">
// //                                 <Button 
// //                                   color="warning" 
// //                                   onClick={() => handleEditClick(product)} 
// //                                   disabled={loadingProducts}
// //                                 >
// //                                   Edit
// //                                 </Button>
// //                                 <Button 
// //                                   color="danger" 
// //                                   onClick={() => handleDeleteProduct(product.id)} 
// //                                   disabled={loadingProducts}
// //                                 >
// //                                   Delete
// //                                 </Button>
// //                               </ButtonGroup>
// //                             </td>
// //                           </tr>
// //                         ))
// //                       )}
// //                     </tbody>
// //                   </Table>
// //                 </>
// //               )}
// //             </CardBody>
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* Add/Edit Product Modal */}
// //       <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" onClosed={resetForm}>
// //         <ModalHeader toggle={toggleModal}>{isEditing ? 'Edit Product' : 'Add Product'}</ModalHeader>
// //         <ModalBody>
// //           <Form onSubmit={handleSubmit}>
// //             <Row>
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label>Name <span className="text-danger">*</span></Label>
// //                   <Input 
// //                     name="name" 
// //                     value={formData.name} 
// //                     onChange={handleNameChange} 
// //                     required 
// //                   />
// //                 </FormGroup>
// //               </Col>
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label>Slug <span className="text-danger">*</span></Label>
// //                   <Input 
// //                     name="slug" 
// //                     value={formData.slug} 
// //                     onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))} 
// //                     required 
// //                   />
// //                 </FormGroup>
// //               </Col>
// //             </Row>

// //             <FormGroup>
// //               <Label>Description</Label>
// //               <Input 
// //                 type="textarea" 
// //                 name="description" 
// //                 value={formData.description} 
// //                 onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} 
// //               />
// //             </FormGroup>

// //             <Row>
// //               <Col md={4}>
// //                 <FormGroup>
// //                   <Label>Price <span className="text-danger">*</span></Label>
// //                   <Input 
// //                     type="number" 
// //                     name="price" 
// //                     value={formData.price} 
// //                     onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))} 
// //                     min="0.01"
// //                     step="0.01"
// //                     required 
// //                   />
// //                 </FormGroup>
// //               </Col>
// //               <Col md={4}>
// //                 <FormGroup>
// //                   <Label>Quantity <span className="text-danger">*</span></Label>
// //                   <Input 
// //                     type="number" 
// //                     name="quantity" 
// //                     value={formData.quantity} 
// //                     onChange={(e) => setFormData(prev => ({...prev, quantity: e.target.value}))} 
// //                     min="0"
// //                     required 
// //                   />
// //                 </FormGroup>
// //               </Col>
// //               <Col md={4}>
// //                 <FormGroup>
// //                   <Label>Product Image</Label>
// //                   <Input 
// //                     type="file" 
// //                     name="image" 
// //                     onChange={handleImageChange}
// //                     accept="image/jpeg, image/png, image/gif, image/webp"
// //                   />
// //                   {(formData.image_url) && (
// //                     <div className="mt-2">
// //                       <small>Preview:</small>
// //                       <img 
// //                         src={formData.image_url} 
// //                         alt="Product preview" 
// //                         style={{ 
// //                           width: '100px', 
// //                           height: '100px', 
// //                           objectFit: 'cover', 
// //                           display: 'block',
// //                           marginTop: '5px'
// //                         }}
// //                       />
// //                     </div>
// //                   )}
// //                 </FormGroup>
// //               </Col>
// //             </Row>

// //             <Row>
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label>Category <span className="text-danger">*</span></Label>
// //                   <Input 
// //                     type="select" 
// //                     name="category_id" 
// //                     value={formData.category_id} 
// //                     onChange={handleCategoryChange} 
// //                     required
// //                     disabled={loadingCategories}
// //                   >
// //                     <option value="">Select Category</option>
// //                     {categories.map(category => (
// //                       <option key={category.id} value={category.id}>
// //                         {category.name}
// //                       </option>
// //                     ))}
// //                   </Input>
// //                 </FormGroup>
// //               </Col>
// //               <Col md={6}>
// //                 <FormGroup>
// //                   <Label>Brand <span className="text-danger">*</span></Label>
// //                   <Input 
// //                     type="select" 
// //                     name="brand_id" 
// //                     value={formData.brand_id} 
// //                     onChange={(e) => setFormData(prev => ({...prev, brand_id: e.target.value}))} 
// //                     required
// //                     disabled={!formData.category_id}
// //                   >
// //                     <option value="">Select Brand</option>
// //                     {brands.map(brand => (
// //                       <option key={brand.id} value={brand.id}>
// //                         {brand.name}
// //                       </option>
// //                     ))}
// //                   </Input>
// //                 </FormGroup>
// //               </Col>
// //             </Row>

// //             <FormGroup check className="mb-3">
// //               <Input 
// //                 type="checkbox" 
// //                 name="is_active" 
// //                 checked={formData.is_active} 
// //                 onChange={(e) => setFormData(prev => ({...prev, is_active: e.target.checked}))} 
// //               />
// //               <Label check>Active</Label>
// //             </FormGroup>

// //             <div className="text-end">
// //               <Button color="secondary" onClick={toggleModal} className="me-2">
// //                 Cancel
// //               </Button>
// //               <Button type="submit" color="primary" disabled={submitting}>
// //                 {submitting ? <Spinner size="sm" /> : isEditing ? 'Update' : 'Save'} Product
// //               </Button>
// //             </div>
// //           </Form>
// //         </ModalBody>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ProductManagement;




// // 'use client';
// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import {
// //   Button, ButtonGroup, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody,
// //   Form, FormGroup, Input, Label, Table, Badge, Spinner, Alert, Fade
// // } from 'reactstrap';
// // import axios from 'axios';
// // import Image from 'next/image';

// // const api = axios.create({
// //   baseURL: 'http://localhost:8000/api/v1',
// //   timeout: 10000,
// //   headers: {
// //     'Accept': 'application/json'
// //   }
// // });

// // // Memoized Product Row Component
// // const ProductRow = React.memo(({ product, index, loadingProducts, handleEditClick, handleDeleteProduct }) => {
// //   const [imageLoaded, setImageLoaded] = useState(false);
  
// //   return (
// //     <tr key={product.id}>
// //       <th scope="row">{index + 1}</th>
// //       <td>
// //         <img 
// //           src={product.image_url ? 
// //             (product.image_url.startsWith('http') ? product.image_url : `http://localhost:8000${product.image_url}`) : 
// //             'https://via.placeholder.com/50?text=No+Image'}
// //           alt={product.name}
// //           style={{ 
// //             width: '50px', 
// //             height: '50px', 
// //             objectFit: 'cover',
// //             display: imageLoaded ? 'block' : 'none'
// //           }}
// //           onLoad={() => setImageLoaded(true)}
// //           onError={(e) => {
// //             e.target.src = 'https://via.placeholder.com/50?text=No+Image';
// //             setImageLoaded(true);
// //           }}
// //         />
// //         {!imageLoaded && <div className="text-muted">Loading...</div>}
// //       </td>
// //       <td>
// //         <strong>{product.name}</strong>
// //         {product.description && (
// //           <div className="small text-muted">{product.description}</div>
// //         )}
// //       </td>
// //       <td>${parseFloat(product.price).toFixed(2)}</td>
// //       <td>{product.quantity}</td>
// //       <td>{product.category?.name || '-'}</td>
// //       <td>{product.brand?.name || '-'}</td>
// //       <td>
// //         <Badge color={product.is_active ? 'success' : 'secondary'}>
// //           {product.is_active ? 'Active' : 'Inactive'}
// //         </Badge>
// //       </td>
// //       <td>
// //         <ButtonGroup size="sm">
// //           <Button 
// //             color="warning" 
// //             onClick={() => handleEditClick(product)} 
// //             disabled={loadingProducts}
// //           >
// //             Edit
// //           </Button>
// //           <Button 
// //             color="danger" 
// //             onClick={() => handleDeleteProduct(product.id)} 
// //             disabled={loadingProducts}
// //           >
// //             Delete
// //           </Button>
// //         </ButtonGroup>
// //       </td>
// //     </tr>
// //   );
// // });





// // // Memoized Modal Form Component
// // const ModalFormContent = React.memo(({ 
// //   formData, 
// //   loadingCategories, 
// //   categories, 
// //   brands, 
// //   handleNameChange, 
// //   handleCategoryChange, 
// //   handleImageChange, 
// //   handleSubmit,
// //   submitting, 
// //   isEditing,
// //   setFormData,
// //   error,
// //   toggleModal
// // }) => {
// //   const [validationErrors, setValidationErrors] = useState({});

// //   const validateForm = () => {
// //     const errors = {};
    
// //     if (!formData.name) errors.name = 'Name is required';
// //     if (!formData.slug) {
// //       errors.slug = 'Slug is required';
// //     } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
// //       errors.slug = 'Slug must be lowercase, with hyphens only';
// //     }
// //     if (!formData.price || formData.price <= 0) errors.price = 'Valid price is required';
// //     if (formData.quantity < 0) errors.quantity = 'Quantity cannot be negative';
// //     if (!formData.category_id) errors.category_id = 'Category is required';
// //     if (!formData.brand_id) errors.brand_id = 'Brand is required';
    
// //     setValidationErrors(errors);
// //     return Object.keys(errors).length === 0;
// //   };

// //   const handleFormSubmit = (e) => {
// //     e.preventDefault();
// //     if (validateForm()) {
// //       handleSubmit(e);
// //     }
// //   };

// //   const generateSlug = () => {
// //     if (formData.name) {
// //       const slug = formData.name
// //         .toLowerCase()
// //         .replace(/[^a-z0-9]+/g, '-')
// //         .replace(/^-+|-+$/g, '');
// //       setFormData(prev => ({...prev, slug}));
// //     }
// //   };

// //   return (
// //     <Form onSubmit={handleFormSubmit}>
// //       <Row>
// //         <Col md={6}>
// //           <FormGroup>
// //             <Label>Name <span className="text-danger">*</span></Label>
// //             <Input 
// //               name="name" 
// //               value={formData.name} 
// //               onChange={handleNameChange} 
// //               required 
// //               invalid={!!validationErrors.name}
// //             />
// //             {validationErrors.name && (
// //               <FormFeedback>{validationErrors.name}</FormFeedback>
// //             )}
// //           </FormGroup>
// //         </Col>
// //         <Col md={6}>
// //           <FormGroup>
// //             <Label>Slug <span className="text-danger">*</span></Label>
// //             <div className="d-flex">
// //               <Input 
// //                 name="slug" 
// //                 value={formData.slug} 
// //                 onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))} 
// //                 required 
// //                 invalid={!!validationErrors.slug}
// //               />
// //               <Button 
// //                 type="button" 
// //                 color="secondary" 
// //                 onClick={generateSlug}
// //                 className="ms-2"
// //                 disabled={!formData.name}
// //               >
// //                 Generate
// //               </Button>
// //             </div>
// //             {validationErrors.slug && (
// //               <FormFeedback>{validationErrors.slug}</FormFeedback>
// //             )}
// //           </FormGroup>
// //         </Col>
// //       </Row>

// //       <FormGroup>
// //         <Label>Description</Label>
// //         <Input 
// //           type="textarea" 
// //           name="description" 
// //           value={formData.description} 
// //           onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} 
// //           rows={4}
// //         />
// //       </FormGroup>

// //       <Row>
// //         <Col md={4}>
// //           <FormGroup>
// //             <Label>Price <span className="text-danger">*</span></Label>
// //             <Input 
// //               type="number" 
// //               name="price" 
// //               value={formData.price} 
// //               onChange={(e) => setFormData(prev => ({...prev, price: parseFloat(e.target.value) || 0}))} 
// //               min="0.01"
// //               step="0.01"
// //               required 
// //               invalid={!!validationErrors.price}
// //             />
// //             {validationErrors.price && (
// //               <FormFeedback>{validationErrors.price}</FormFeedback>
// //             )}
// //           </FormGroup>
// //         </Col>
// //         <Col md={4}>
// //           <FormGroup>
// //             <Label>Quantity <span className="text-danger">*</span></Label>
// //             <Input 
// //               type="number" 
// //               name="quantity" 
// //               value={formData.quantity} 
// //               onChange={(e) => setFormData(prev => ({...prev, quantity: parseInt(e.target.value) || 0}))} 
// //               min="0"
// //               required 
// //               invalid={!!validationErrors.quantity}
// //             />
// //             {validationErrors.quantity && (
// //               <FormFeedback>{validationErrors.quantity}</FormFeedback>
// //             )}
// //           </FormGroup>
// //         </Col>
// //         <Col md={4}>
// //           <FormGroup>
// //             <Label>Product Image</Label>
// //             <Input 
// //               type="file" 
// //               name="image" 
// //               onChange={handleImageChange}
// //               accept="image/jpeg, image/png, image/gif, image/webp"
// //             />
// //             {formData.image_url && (
// //               <div className="mt-2">
// //                 <small>Current Image:</small>
// //                 <img 
// //                   src={formData.image_url} 
// //                   alt="Product preview" 
// //                   className="img-thumbnail mt-1"
// //                   style={{ 
// //                     width: '100px', 
// //                     height: '100px', 
// //                     objectFit: 'cover',
// //                   }}
// //                 />
// //               </div>
// //             )}
// //           </FormGroup>
// //         </Col>
// //       </Row>

// //       <Row>
// //         <Col md={6}>
// //           <FormGroup>
// //             <Label>Category <span className="text-danger">*</span></Label>
// //             <Input 
// //               type="select" 
// //               name="category_id" 
// //               value={formData.category_id} 
// //               onChange={handleCategoryChange} 
// //               required
// //               disabled={loadingCategories}
// //               invalid={!!validationErrors.category_id}
// //             >
// //               <option value="">Select Category</option>
// //               {categories.map(category => (
// //                 <option key={category.id} value={category.id}>
// //                   {category.name}
// //                 </option>
// //               ))}
// //             </Input>
// //             {validationErrors.category_id && (
// //               <FormFeedback>{validationErrors.category_id}</FormFeedback>
// //             )}
// //           </FormGroup>
// //         </Col>
// //         <Col md={6}>
// //           <FormGroup>
// //             <Label>Brand <span className="text-danger">*</span></Label>
// //             <Input 
// //               type="select" 
// //               name="brand_id" 
// //               value={formData.brand_id} 
// //               onChange={(e) => setFormData(prev => ({...prev, brand_id: e.target.value}))} 
// //               required
// //               disabled={!formData.category_id || brands.length === 0}
// //               invalid={!!validationErrors.brand_id}
// //             >
// //               <option value="">Select Brand</option>
// //               {brands.map(brand => (
// //                 <option key={brand.id} value={brand.id}>
// //                   {brand.name}
// //                 </option>
// //               ))}
// //             </Input>
// //             {validationErrors.brand_id && (
// //               <FormFeedback>{validationErrors.brand_id}</FormFeedback>
// //             )}
// //             {!formData.category_id && (
// //               <small className="text-muted">Please select a category first</small>
// //             )}
// //             {formData.category_id && brands.length === 0 && (
// //               <small className="text-danger">No brands available for this category</small>
// //             )}
// //           </FormGroup>
// //         </Col>
// //       </Row>

// //       <FormGroup check className="mb-3">
// //         <Input 
// //           type="checkbox" 
// //           name="is_active" 
// //           checked={formData.is_active} 
// //           onChange={(e) => setFormData(prev => ({...prev, is_active: e.target.checked}))} 
// //           id="is_active_checkbox"
// //         />
// //         <Label check for="is_active_checkbox">Active</Label>
// //       </FormGroup>

// //       {error && (
// //         <Alert color="danger" className="mb-3">
// //           {error}
// //         </Alert>
// //       )}

// //       <div className="text-end">
// //         <Button color="secondary" onClick={toggleModal} className="me-2" disabled={submitting}>
// //           Cancel
// //         </Button>
// //         <Button type="submit" color="primary" disabled={submitting}>
// //           {submitting ? (
// //             <>
// //               <Spinner size="sm" className="me-2" />
// //               {isEditing ? 'Updating...' : 'Saving...'}
// //             </>
// //           ) : isEditing ? 'Update' : 'Save'} Product
// //         </Button>
// //       </div>
// //     </Form>
// //   );
// // });

// // const ProductManagement = () => {
// //   // State management
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     slug: '',
// //     description: '',
// //     price: '',
// //     quantity: '0',
// //     category_id: '',
// //     brand_id: '',
// //     is_active: true,
// //     image: null,
// //     image_url: ''
// //   });
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentProductId, setCurrentProductId] = useState(null);
// //   const [loadingProducts, setLoadingProducts] = useState(false);
// //   const [loadingCategories, setLoadingCategories] = useState(false);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [initialLoading, setInitialLoading] = useState(true);

// //   // Helper functions
// //   const handleAPIError = useCallback((err) => {
// //     if (err.response) {
// //       if (err.response.status === 422) {
// //         if (err.response.data && err.response.data.detail) {
// //           if (Array.isArray(err.response.data.detail)) {
// //             return err.response.data.detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join('\n');
// //           }
// //           return err.response.data.detail;
// //         }
// //         return 'Validation error occurred';
// //       }
// //       return err.response.data?.message || err.response.data?.detail || err.response.statusText || 'An error occurred';
// //     }
// //     return err.message || 'Network error occurred';
// //   }, []);


  

// //   // Data fetching
// //   const fetchProducts = useCallback(async () => {
// //     try {
// //       setLoadingProducts(true);
// //       setError(null);
// //       const response = await api.get('/');
// //       setProducts(response.data || []);
// //     } catch (err) {
// //       const errorMsg = 'Failed to fetch products: ' + handleAPIError(err);
// //       setError(errorMsg);
// //       console.error('Products fetch error:', err);
// //       setProducts([]);
// //     } finally {
// //       setLoadingProducts(false);
// //       setInitialLoading(false);
// //     }
// //   }, [handleAPIError]);

// //   const fetchCategories = useCallback(async () => {
// //     try {
// //       setLoadingCategories(true);
// //       setError(null);
// //       const response = await api.get('/categories/');
// //       setCategories(response.data || []);
// //     } catch (err) {
// //       const errorMsg = 'Failed to fetch categories: ' + handleAPIError(err);
// //       setError(errorMsg);
// //       console.error('Categories fetch error:', err);
// //       setCategories([]);
// //     } finally {
// //       setLoadingCategories(false);
// //     }
// //   }, [handleAPIError]);



// //   const fetchBrandsByCategory = useCallback(async (categoryId) => {
// //     if (!categoryId) {
// //       setBrands([]);
// //       return;
// //     }
// //     try {
// //       const categoryResponse = await api.get(`/categories/${categoryId}?include_brands=true`);
// //       const category = categoryResponse.data;
// //       setBrands(category.brands || []);
// //     } catch (err) {
// //       setError('Failed to fetch brands: ' + handleAPIError(err));
// //       setBrands([]);
// //     }
// //   }, [handleAPIError]);

  

// //   // Form handlers
// //   const handleNameChange = useCallback((e) => {
// //     const name = e.target.value;
// //     const slug = name.toLowerCase()
// //       .replace(/\s+/g, '-')
// //       .replace(/[^\w-]+/g, '');
    
// //     setFormData(prev => ({
// //       ...prev,
// //       name,
// //       slug
// //     }));
// //   }, []);

// //   const handleCategoryChange = useCallback(async (e) => {
// //     const categoryId = e.target.value;
// //     setFormData(prev => ({
// //       ...prev,
// //       category_id: categoryId,
// //       brand_id: '' // Reset brand when category changes
// //     }));

// //     await fetchBrandsByCategory(categoryId);
// //   }, [fetchBrandsByCategory]);

// //   const handleImageChange = useCallback((e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
// //     if (!validTypes.includes(file.type)) {
// //       setError('Invalid image type. Please upload a JPEG, PNG, GIF, or WebP image.');
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       setError('Image too large. Maximum size is 5MB.');
// //       return;
// //     }

// //     const previewUrl = URL.createObjectURL(file);
    
// //     setFormData(prev => ({
// //       ...prev,
// //       image: file,
// //       image_url: previewUrl
// //     }));
// //     setError(null);
// //   }, []);

// //  const handleSubmit = useCallback(async (e) => {
// //   e.preventDefault();
// //   try {
// //     setSubmitting(true);
// //     setError(null);

    
// //     // Validate first
// //     if (!validateForm()) return;

// //     const formDataObj = new FormData();
// //     // Append all fields including numbers as strings
// //     formDataObj.append('name', formData.name);
// //     formDataObj.append('slug', formData.slug);
// //     formDataObj.append('description', formData.description || '');
// //     formDataObj.append('price', formData.price.toString());
// //     formDataObj.append('quantity', formData.quantity.toString());
// //     formDataObj.append('category_id', formData.category_id.toString());
// //     formDataObj.append('brand_id', formData.brand_id.toString());
// //     formDataObj.append('is_active', formData.is_active.toString());
    
// //     if (formData.image) {
// //       formDataObj.append('image', formData.image);
// //     }

// //     // Debug: Log what's being sent
// //     for (let [key, value] of formDataObj.entries()) {
// //       console.log(key, value);
// //     }

// //     const config = {
// //       headers: {
// //         'Content-Type': 'multipart/form-data'
// //       }
// //     };

// //     const url = isEditing ? `/${currentProductId}` : '/';
      
// //     const method = isEditing ? 'put' : 'post';
    
// //     console.log(`Making ${method.toUpperCase()} request to:`, url);
    
// //     const response = await api[method](url, formDataObj, config);
    
// //     console.log('Response:', response.data);
    
// //     await fetchProducts();
// //     setModalOpen(false);
// //   } catch (err) {
// //     console.error('Submission error:', {
// //       error: err,
// //       response: err.response,
// //       request: err.request
// //     });
    
// //     let errorMsg = 'Failed to save product';
// //     if (err.response) {
// //       if (err.response.status === 405) {
// //         errorMsg += ': Invalid method (POST/PUT) for this endpoint';
// //       } else {
// //         errorMsg += `: ${err.response.data?.detail || err.response.statusText}`;
// //       }
// //     }
// //     setError(errorMsg);
// //   } finally {
// //     setSubmitting(false);
// //   }
// // }, [isEditing, currentProductId, fetchProducts, formData]);
// //   const handleEditClick = useCallback((product) => {
// //     setFormData({
// //       name: product.name,
// //       slug: product.slug,
// //       description: product.description || '',
// //       price: product.price.toString(),
// //       quantity: product.quantity.toString(),
// //       category_id: product.category?.id?.toString() || '',
// //       brand_id: product.brand?.id?.toString() || '',
// //       is_active: product.is_active,
// //       image: null,
// //       image_url: product.image_url || ''
// //     });
// //     setCurrentProductId(product.id);
// //     setIsEditing(true);
// //     fetchBrandsByCategory(product.category?.id);
// //     setModalOpen(true);
// //   }, [fetchBrandsByCategory]);

// //   const handleDeleteProduct = useCallback(async (productId) => {
// //     if (window.confirm('Are you sure you want to delete this product?')) {
// //       try {
// //         setLoadingProducts(true);
// //         await api.delete(`/${productId}`);
// //         await fetchProducts();
// //       } catch (err) {
// //         setError('Failed to delete product: ' + handleAPIError(err));
// //       } finally {
// //         setLoadingProducts(false);
// //       }
// //     }
// //   }, [fetchProducts, handleAPIError]);

// //   const resetForm = useCallback(() => {
// //     setFormData({
// //       name: '',
// //       slug: '',
// //       description: '',
// //       price: '',
// //       quantity: '0',
// //       category_id: '',
// //       brand_id: '',
// //       is_active: true,
// //       image: null,
// //       image_url: ''
// //     });
// //     setIsEditing(false);
// //     setCurrentProductId(null);
// //     setError(null);
// //     setBrands([]);
// //   }, []);

// //   const toggleModal = useCallback(() => {
// //     setModalOpen(prev => {
// //       if (!prev) resetForm();
// //       return !prev;
// //     });
// //   }, [resetForm]);

// //   // Initial data load
// //   useEffect(() => {
// //     let isMounted = true;
    
// //     const loadData = async () => {
// //       try {
// //         if (isMounted) {
// //           await Promise.all([fetchProducts(), fetchCategories()]);
// //         }
// //       } catch (err) {
// //         if (isMounted) {
// //           setError('Failed to load initial data: ' + handleAPIError(err));
// //         }
// //       }
// //     };
    
// //     loadData();
    
// //     return () => {
// //       isMounted = false;
// //     };
// //   }, [fetchProducts, fetchCategories, handleAPIError]);

// //   // Memoized products list
// //   const memoizedProducts = useMemo(() => products, [products]);

// //   return (
// //     <div className="p-4">
// //       {error && (
// //         <Fade in={!!error} timeout={300}>
// //           <Alert color="danger" toggle={() => setError(null)}>
// //             {error}
// //           </Alert>
// //         </Fade>
// //       )}

// //       <Row className="mb-4">
// //         <Col className="text-end">
// //           <Button color="primary" onClick={toggleModal} disabled={loadingProducts}>
// //             {loadingProducts ? <Spinner size="sm" /> : 'Add Product'}
// //           </Button>
// //         </Col>
// //       </Row>

// //       <Row>
// //         <Col md="12">
// //           <Card>
// //             <CardTitle tag="h5" className="border-bottom p-3 mb-0">Product List</CardTitle>
// //             <CardBody>
// //               {initialLoading ? (
// //                 <div className="text-center py-4">
// //                   <Spinner color="primary" />
// //                   <div>Loading products...</div>
// //                 </div>
// //               ) : memoizedProducts.length === 0 ? (
// //                 <div className="text-center py-4">
// //                   {loadingProducts ? (
// //                     <Spinner color="primary" />
// //                   ) : (
// //                     'No products found'
// //                   )}
// //                 </div>
// //               ) : (
// //                 <Table striped responsive hover>
// //                   <thead>
// //                     <tr>
// //                       <th>#</th>
// //                       <th>Image</th>
// //                       <th>Name</th>
// //                       <th>Price</th>
// //                       <th>Stock</th>
// //                       <th>Category</th>
// //                       <th>Brand</th>
// //                       <th>Status</th>
// //                       <th>Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {memoizedProducts.map((product, index) => (
// //                       <ProductRow 
// //                         key={product.id}
// //                         product={product}
// //                         index={index}
// //                         loadingProducts={loadingProducts}
// //                         handleEditClick={handleEditClick}
// //                         handleDeleteProduct={handleDeleteProduct}
// //                       />
// //                     ))}
// //                   </tbody>
// //                 </Table>
// //               )}
// //             </CardBody>
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* Add/Edit Product Modal */}
// //       <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" onClosed={resetForm}>
// //         <ModalHeader toggle={toggleModal}>{isEditing ? 'Edit Product' : 'Add Product'}</ModalHeader>
// //         <ModalBody>
// //           <ModalFormContent 
// //             formData={formData}
// //             loadingCategories={loadingCategories}
// //             categories={categories}
// //             brands={brands}
// //             handleNameChange={handleNameChange}
// //             handleCategoryChange={handleCategoryChange}
// //             handleImageChange={handleImageChange}
// //             handleSubmit={handleSubmit}
// //             submitting={submitting}
// //             isEditing={isEditing}
// //             setFormData={setFormData}
// //             error={error}
// //             toggleModal={toggleModal}
// //           />
// //         </ModalBody>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ProductManagement;









// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
//   Button, ButtonGroup, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody,
//   Form, FormGroup, Input, Label, Table, Badge, Spinner, Alert, Fade, FormFeedback
// } from 'reactstrap';
// import axios from 'axios';
// import Image from 'next/image';

// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/v1/products',
//   timeout: 10000,
//   headers: {
//     'Accept': 'application/json'
//   }
// });

// // Memoized Product Row Component
// const ProductRow = React.memo(({ product, index, loadingProducts, handleEditClick, handleDeleteProduct }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
  
//   return (
//     <tr key={product.id}>
//       <th scope="row">{index + 1}</th>
//       <td>
//         <img 
//           src={product.image_url ? 
//             (product.image_url.startsWith('http') ? product.image_url : `http://localhost:8000${product.image_url}`) : 
//             'https://via.placeholder.com/50?text=No+Image'}
//           alt={product.name}
//           style={{ 
//             width: '50px', 
//             height: '50px', 
//             objectFit: 'cover',
//             display: imageLoaded ? 'block' : 'none'
//           }}
//           onLoad={() => setImageLoaded(true)}
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/50?text=No+Image';
//             setImageLoaded(true);
//           }}
//         />
//         {!imageLoaded && <div className="text-muted">Loading...</div>}
//       </td>
//       <td>
//         <strong>{product.name}</strong>
//         {product.description && (
//           <div className="small text-muted">{product.description}</div>
//         )}
//       </td>
//       <td>${parseFloat(product.price).toFixed(2)}</td>
//       <td>{product.quantity}</td>
//       <td>{product.category?.name || '-'}</td>
//       <td>{product.brand?.name || '-'}</td>
//       <td>
//         <Badge color={product.is_active ? 'success' : 'secondary'}>
//           {product.is_active ? 'Active' : 'Inactive'}
//         </Badge>
//       </td>
//       <td>
//         <ButtonGroup size="sm">
//           <Button 
//             color="warning" 
//             onClick={() => handleEditClick(product)} 
//             disabled={loadingProducts}
//           >
//             Edit
//           </Button>
//           <Button 
//             color="danger" 
//             onClick={() => handleDeleteProduct(product.id)} 
//             disabled={loadingProducts}
//           >
//             Delete
//           </Button>
//         </ButtonGroup>
//       </td>
//     </tr>
//   );
// });

// // Memoized Modal Form Component
// const ModalFormContent = React.memo(({ 
//   formData, 
//   loadingCategories, 
//   categories, 
//   brands, 
//   handleNameChange, 
//   handleCategoryChange, 
//   handleImageChange, 
//   handleSubmit,
//   submitting, 
//   isEditing,
//   setFormData,
//   error,
//   toggleModal
// }) => {
//   const [validationErrors, setValidationErrors] = useState({});

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.name) errors.name = 'Name is required';
//     if (!formData.slug) {
//       errors.slug = 'Slug is required';
//     } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
//       errors.slug = 'Slug must be lowercase, with hyphens only';
//     }
//     if (!formData.price || formData.price <= 0) errors.price = 'Valid price is required';
//     if (formData.quantity < 0) errors.quantity = 'Quantity cannot be negative';
//     if (!formData.category_id) errors.category_id = 'Category is required';
//     if (!formData.brand_id) errors.brand_id = 'Brand is required';
    
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       handleSubmit(e);
//     }
//   };

//   const generateSlug = () => {
//     if (formData.name) {
//       const slug = formData.name
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/^-+|-+$/g, '');
//       setFormData(prev => ({...prev, slug}));
//     }
//   };

//   return (
//     <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
//       <Row>
//         <Col md={6}>
//           <FormGroup>
//             <Label>Name <span className="text-danger">*</span></Label>
//             <Input 
//               name="name" 
//               value={formData.name} 
//               onChange={handleNameChange} 
//               required 
//               invalid={!!validationErrors.name}
//             />
//             {validationErrors.name && (
//               <FormFeedback>{validationErrors.name}</FormFeedback>
//             )}
//           </FormGroup>
//         </Col>
//         <Col md={6}>
//           <FormGroup>
//             <Label>Slug <span className="text-danger">*</span></Label>
//             <div className="d-flex">
//               <Input 
//                 name="slug" 
//                 value={formData.slug} 
//                 onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))} 
//                 required 
//                 invalid={!!validationErrors.slug}
//               />
//               <Button 
//                 type="button" 
//                 color="secondary" 
//                 onClick={generateSlug}
//                 className="ms-2"
//                 disabled={!formData.name}
//               >
//                 Generate
//               </Button>
//             </div>
//             {validationErrors.slug && (
//               <FormFeedback>{validationErrors.slug}</FormFeedback>
//             )}
//           </FormGroup>
//         </Col>
//       </Row>

//       <FormGroup>
//         <Label>Description</Label>
//         <Input 
//           type="textarea" 
//           name="description" 
//           value={formData.description} 
//           onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} 
//           rows={4}
//         />
//       </FormGroup>

//       <Row>
//         <Col md={4}>
//           <FormGroup>
//             <Label>Price <span className="text-danger">*</span></Label>
//             <Input 
//               type="number" 
//               name="price" 
//               value={formData.price} 
//               onChange={(e) => setFormData(prev => ({...prev, price: parseFloat(e.target.value) || 0}))} 
//               min="0.01"
//               step="0.01"
//               required 
//               invalid={!!validationErrors.price}
//             />
//             {validationErrors.price && (
//               <FormFeedback>{validationErrors.price}</FormFeedback>
//             )}
//           </FormGroup>
//         </Col>
//         <Col md={4}>
//           <FormGroup>
//             <Label>Quantity <span className="text-danger">*</span></Label>
//             <Input 
//               type="number" 
//               name="quantity" 
//               value={formData.quantity} 
//               onChange={(e) => setFormData(prev => ({...prev, quantity: parseInt(e.target.value) || 0}))} 
//               min="0"
//               required 
//               invalid={!!validationErrors.quantity}
//             />
//             {validationErrors.quantity && (
//               <FormFeedback>{validationErrors.quantity}</FormFeedback>
//             )}
//           </FormGroup>
//         </Col>
//         <Col md={4}>
//           <FormGroup>
//             <Label>Product Image</Label>
//             <Input 
//               type="file" 
//               name="image" 
//               onChange={handleImageChange}
//               accept="image/jpeg, image/png, image/gif, image/webp"
//             />
//             {formData.image_url && (
//               <div className="mt-2">
//                 <small>Current Image:</small>
//                 <img 
//                   src={formData.image_url} 
//                   alt="Product preview" 
//                   className="img-thumbnail mt-1"
//                   style={{ 
//                     width: '100px', 
//                     height: '100px', 
//                     objectFit: 'cover',
//                   }}
//                 />
//               </div>
//             )}
//           </FormGroup>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={6}>
//           <FormGroup>
//             <Label>Category <span className="text-danger">*</span></Label>
//             <Input 
//               type="select" 
//               name="category_id" 
//               value={formData.category_id} 
//               onChange={handleCategoryChange} 
//               required
//               disabled={loadingCategories}
//               invalid={!!validationErrors.category_id}
//             >
//               <option value="">Select Category</option>
//               {categories.map(category => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </Input>
//             {validationErrors.category_id && (
//               <FormFeedback>{validationErrors.category_id}</FormFeedback>
//             )}
//           </FormGroup>
//         </Col>
//         <Col md={6}>
//           <FormGroup>
//             <Label>Brand <span className="text-danger">*</span></Label>
//             <Input 
//               type="select" 
//               name="brand_id" 
//               value={formData.brand_id} 
//               onChange={(e) => setFormData(prev => ({...prev, brand_id: e.target.value}))} 
//               required
//               disabled={!formData.category_id || brands.length === 0}
//               invalid={!!validationErrors.brand_id}
//             >
//               <option value="">Select Brand</option>
//               {brands.map(brand => (
//                 <option key={brand.id} value={brand.id}>
//                   {brand.name}
//                 </option>
//               ))}
//             </Input>
//             {validationErrors.brand_id && (
//               <FormFeedback>{validationErrors.brand_id}</FormFeedback>
//             )}
//             {!formData.category_id && (
//               <small className="text-muted">Please select a category first</small>
//             )}
//             {formData.category_id && brands.length === 0 && (
//               <small className="text-danger">No brands available for this category</small>
//             )}
//           </FormGroup>
//         </Col>
//       </Row>

//       <FormGroup check className="mb-3">
//         <Input 
//           type="checkbox" 
//           name="is_active" 
//           checked={formData.is_active} 
//           onChange={(e) => setFormData(prev => ({...prev, is_active: e.target.checked}))} 
//           id="is_active_checkbox"
//         />
//         <Label check for="is_active_checkbox">Active</Label>
//       </FormGroup>

//       {error && (
//         <Alert color="danger" className="mb-3">
//           {error}
//         </Alert>
//       )}

//       <div className="text-end">
//         <Button color="secondary" onClick={toggleModal} className="me-2" disabled={submitting}>
//           Cancel
//         </Button>
//         <Button type="submit" color="primary" disabled={submitting}>
//           {submitting ? (
//             <>
//               <Spinner size="sm" className="me-2" />
//               {isEditing ? 'Updating...' : 'Saving...'}
//             </>
//           ) : isEditing ? 'Update' : 'Save'} Product
//         </Button>
//       </div>
//     </Form>
//   );
// });

// const ProductManagement = () => {
//   // State management
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     price: '',
//     quantity: '0',
//     category_id: '',
//     brand_id: '',
//     is_active: true,
//     image: null,
//     image_url: ''
//   });
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentProductId, setCurrentProductId] = useState(null);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [successMessage, setSuccessMessage] = useState(null);

//   // Helper functions
//   const handleAPIError = useCallback((err) => {
//     if (err.response) {
//       if (err.response.status === 422) {
//         if (err.response.data && err.response.data.detail) {
//           if (Array.isArray(err.response.data.detail)) {
//             return err.response.data.detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join('\n');
//           }
//           return err.response.data.detail;
//         }
//         return 'Validation error occurred';
//       }
//       return err.response.data?.message || err.response.data?.detail || err.response.statusText || 'An error occurred';
//     }
//     return err.message || 'Network error occurred';
//   }, []);

//   // Data fetching
//   const fetchProducts = useCallback(async () => {
//     try {
//       setLoadingProducts(true);
//       setError(null);
//       const response = await api.get('/');
//       setProducts(response.data || []);
//     } catch (err) {
//       const errorMsg = 'Failed to fetch products: ' + handleAPIError(err);
//       setError(errorMsg);
//       console.error('Products fetch error:', err);
//       setProducts([]);
//     } finally {
//       setLoadingProducts(false);
//       setInitialLoading(false);
//     }
//   }, [handleAPIError]);

//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoadingCategories(true);
//       setError(null);
//       const response = await axios.get('http://localhost:8000/api/v1/categories');
//       setCategories(response.data || []);
//     } catch (err) {
//       const errorMsg = 'Failed to fetch categories: ' + handleAPIError(err);
//       setError(errorMsg);
//       console.error('Categories fetch error:', err);
//       setCategories([]);
//     } finally {
//       setLoadingCategories(false);
//     }
//   }, [handleAPIError]);

//   const fetchBrandsByCategory = useCallback(async (categoryId) => {
//     if (!categoryId) {
//       setBrands([]);
//       return;
//     }
//     try {
//       const response = await axios.get(`http://localhost:8000/api/v1/categories/${categoryId}?include_brands=true`);
//       setBrands(response.data.brands || []);
//     } catch (err) {
//       setError('Failed to fetch brands: ' + handleAPIError(err));
//       setBrands([]);
//     }
//   }, [handleAPIError]);

//   // Form handlers
//   const handleNameChange = useCallback((e) => {
//     const name = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       name
//     }));
//   }, []);

//   const handleCategoryChange = useCallback(async (e) => {
//     const categoryId = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       category_id: categoryId,
//       brand_id: '' // Reset brand when category changes
//     }));

//     await fetchBrandsByCategory(categoryId);
//   }, [fetchBrandsByCategory]);

//   const handleImageChange = useCallback((e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//     if (!validTypes.includes(file.type)) {
//       setError('Invalid image type. Please upload a JPEG, PNG, GIF, or WebP image.');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError('Image too large. Maximum size is 5MB.');
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
    
//     setFormData(prev => ({
//       ...prev,
//       image: file,
//       image_url: previewUrl
//     }));
//     setError(null);
//   }, []);

//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();
//     try {
//       setSubmitting(true);
//       setError(null);

//       const formDataObj = new FormData();
      
//       // Append all fields
//       formDataObj.append('name', formData.name);
//       formDataObj.append('slug', formData.slug);
//       formDataObj.append('description', formData.description || '');
//       formDataObj.append('price', formData.price.toString());
//       formDataObj.append('quantity', formData.quantity.toString());
//       formDataObj.append('category_id', formData.category_id.toString());
//       formDataObj.append('brand_id', formData.brand_id.toString());
//       formDataObj.append('is_active', formData.is_active.toString());
      
//       if (formData.image) {
//         formDataObj.append('image', formData.image);
//       }

//       let response;
//       if (isEditing) {
//         // For update, use PUT request
//         response = await api.put(`/${currentProductId}`, formDataObj, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//         setSuccessMessage('Product updated successfully!');
//       } else {
//         // For create, use POST request
//         response = await api.post('/products/', formDataObj, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//         setSuccessMessage('Product created successfully!');
//       }

//       await fetchProducts();
//       setTimeout(() => {
//         setModalOpen(false);
//       }, 1500);
//     } catch (err) {
//       console.error('Submission error:', err);
//       let errorMsg = 'Failed to save product';
      
//       if (err.response) {
//         if (err.response.data?.detail) {
//           errorMsg += `: ${err.response.data.detail}`;
//         } else if (err.response.status === 422) {
//           errorMsg += ': Validation error - please check your inputs';
//         }
//       }
//       setError(errorMsg);
//     } finally {
//       setSubmitting(false);
//     }
//   }, [isEditing, currentProductId, fetchProducts, formData]);

//   const handleEditClick = useCallback((product) => {
//     setFormData({
//       name: product.name,
//       slug: product.slug,
//       description: product.description || '',
//       price: product.price.toString(),
//       quantity: product.quantity.toString(),
//       category_id: product.category?.id?.toString() || '',
//       brand_id: product.brand?.id?.toString() || '',
//       is_active: product.is_active,
//       image: null,
//       image_url: product.image_url ? 
//         (product.image_url.startsWith('http') ? 
//           product.image_url : 
//           `http://localhost:8000${product.image_url}`) : 
//         ''
//     });
//     setCurrentProductId(product.id);
//     setIsEditing(true);
//     fetchBrandsByCategory(product.category?.id);
//     setModalOpen(true);
//   }, [fetchBrandsByCategory]);

//   const handleDeleteProduct = useCallback(async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
//       return;
//     }
    
//     try {
//       setLoadingProducts(true);
//       await api.delete(`/${productId}`);
//       setSuccessMessage('Product deleted successfully!');
//       await fetchProducts();
//     } catch (err) {
//       setError('Failed to delete product: ' + handleAPIError(err));
//     } finally {
//       setLoadingProducts(false);
//     }
//   }, [fetchProducts, handleAPIError]);

//   const resetForm = useCallback(() => {
//     setFormData({
//       name: '',
//       slug: '',
//       description: '',
//       price: '',
//       quantity: '0',
//       category_id: '',
//       brand_id: '',
//       is_active: true,
//       image: null,
//       image_url: ''
//     });
//     setIsEditing(false);
//     setCurrentProductId(null);
//     setError(null);
//     setSuccessMessage(null);
//     setBrands([]);
//   }, []);

//   const toggleModal = useCallback(() => {
//     setModalOpen(prev => {
//       if (!prev) resetForm();
//       return !prev;
//     });
//   }, [resetForm]);

//   // Initial data load
//   useEffect(() => {
//     let isMounted = true;
    
//     const loadData = async () => {
//       try {
//         if (isMounted) {
//           await Promise.all([fetchProducts(), fetchCategories()]);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError('Failed to load initial data: ' + handleAPIError(err));
//         }
//       }
//     };
    
//     loadData();
    
//     return () => {
//       isMounted = false;
//     };
//   }, [fetchProducts, fetchCategories, handleAPIError]);

//   // Memoized products list
//   const memoizedProducts = useMemo(() => products, [products]);

//   return (
//     <div className="p-4">
//       {error && (
//         <Fade in={!!error} timeout={300}>
//           <Alert color="danger" toggle={() => setError(null)}>
//             {error}
//           </Alert>
//         </Fade>
//       )}

//       {successMessage && (
//         <Fade in={!!successMessage} timeout={300}>
//           <Alert color="success" toggle={() => setSuccessMessage(null)}>
//             {successMessage}
//           </Alert>
//         </Fade>
//       )}

//       <Row className="mb-4">
//         <Col className="text-end">
//           <Button color="primary" onClick={toggleModal} disabled={loadingProducts}>
//             {loadingProducts ? <Spinner size="sm" /> : 'Add Product'}
//           </Button>
//         </Col>
//       </Row>

//       <Row>
//         <Col md="12">
//           <Card>
//             <CardTitle tag="h5" className="border-bottom p-3 mb-0">Product List</CardTitle>
//             <CardBody>
//               {initialLoading ? (
//                 <div className="text-center py-4">
//                   <Spinner color="primary" />
//                   <div>Loading products...</div>
//                 </div>
//               ) : memoizedProducts.length === 0 ? (
//                 <div className="text-center py-4">
//                   {loadingProducts ? (
//                     <Spinner color="primary" />
//                   ) : (
//                     'No products found'
//                   )}
//                 </div>
//               ) : (
//                 <Table striped responsive hover>
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Image</th>
//                       <th>Name</th>
//                       <th>Price</th>
//                       <th>Stock</th>
//                       <th>Category</th>
//                       <th>Brand</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {memoizedProducts.map((product, index) => (
//                       <ProductRow 
//                         key={product.id}
//                         product={product}
//                         index={index}
//                         loadingProducts={loadingProducts}
//                         handleEditClick={handleEditClick}
//                         handleDeleteProduct={handleDeleteProduct}
//                       />
//                     ))}
//                   </tbody>
//                 </Table>
//               )}
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>

//       {/* Add/Edit Product Modal */}
//       <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" onClosed={resetForm}>
//         <ModalHeader toggle={toggleModal}>{isEditing ? 'Edit Product' : 'Add Product'}</ModalHeader>
//         <ModalBody>
//           <ModalFormContent 
//             formData={formData}
//             loadingCategories={loadingCategories}
//             categories={categories}
//             brands={brands}
//             handleNameChange={handleNameChange}
//             handleCategoryChange={handleCategoryChange}
//             handleImageChange={handleImageChange}
//             handleSubmit={handleSubmit}
//             submitting={submitting}
//             isEditing={isEditing}
//             setFormData={setFormData}
//             error={error}
//             toggleModal={toggleModal}
//           />
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default ProductManagement;






'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Button, ButtonGroup, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, Table, Badge, Spinner, Alert, Fade, FormFeedback
} from 'reactstrap';
import axios from 'axios';
import Image from 'next/image';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/products',
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
});

// Helper functions
const calculateSellingPrice = (price, discount) => {
  if (!price || !discount) return null;
  return price * (1 - discount / 100);
};

// Memoized Product Row Component
const ProductRow = React.memo(({ product, index, loadingProducts, handleEditClick, handleDeleteProduct }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const displayedSellingPrice = product.selling_price || calculateSellingPrice(product.price, product.discount);
  
  return (
    <tr key={product.id}>
      <th scope="row">{index + 1}</th>
      <td>
        <img 
          src={product.image_url ? 
            (product.image_url.startsWith('http') ? product.image_url : `http://localhost:8000${product.image_url}`) : 
            'https://via.placeholder.com/50?text=No+Image'}
          alt={product.name}
          style={{ 
            width: '50px', 
            height: '50px', 
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/50?text=No+Image';
            setImageLoaded(true);
          }}
        />
        {!imageLoaded && <div className="text-muted">Loading...</div>}
      </td>
      <td>
        <strong>{product.name}</strong>
        {product.description && (
          <div className="small text-muted">{product.description}</div>
        )}
      </td>
      <td>
        <div>${parseFloat(product.price).toFixed(2)}</div>
        {product.discount > 0 && (
          <small className="text-danger">
            <del>${parseFloat(product.price).toFixed(2)}</del>
          </small>
        )}
      </td>
      <td className={product.discount > 0 ? 'text-success fw-bold' : ''}>
        {displayedSellingPrice ? `$${parseFloat(displayedSellingPrice).toFixed(2)}` : '-'}
        {product.discount > 0 && (
          <div className="small text-danger">
            {parseFloat(product.discount).toFixed(0)}% off
          </div>
        )}
      </td>
      <td>{product.quantity}</td>
      <td>{product.category?.name || '-'}</td>
      <td>{product.brand?.name || '-'}</td>
      <td>
        <Badge color={product.is_active ? 'success' : 'secondary'}>
          {product.is_active ? 'Active' : 'Inactive'}
        </Badge>
      </td>
      <td>
        <ButtonGroup size="sm">
          <Button 
            color="warning" 
            onClick={() => handleEditClick(product)} 
            disabled={loadingProducts}
          >
            Edit
          </Button>
          <Button 
            color="danger" 
            onClick={() => handleDeleteProduct(product.id)} 
            disabled={loadingProducts}
          >
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
});

// Memoized Modal Form Component
const ModalFormContent = React.memo(({ 
  formData, 
  loadingCategories, 
  categories, 
  brands, 
  handleNameChange, 
  handleCategoryChange, 
  handleImageChange, 
  handleSubmit,
  submitting, 
  isEditing,
  setFormData,
  error,
  toggleModal
}) => {
  const [validationErrors, setValidationErrors] = useState({});

  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value) || 0;
    setFormData(prev => {
      const sellingPrice = discount > 0 
        ? prev.price * (1 - discount/100)
        : null;
      return {
        ...prev,
        discount,
        selling_price: sellingPrice
      };
    });
  };

  const handleSellingPriceChange = (e) => {
    const sellingPrice = parseFloat(e.target.value) || null;
    setFormData(prev => ({
      ...prev,
      selling_price: sellingPrice,
      discount: sellingPrice && prev.price 
        ? Math.round((1 - (sellingPrice / prev.price)) * 100)
        : 0
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.slug) {
      errors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      errors.slug = 'Slug must be lowercase, with hyphens only';
    }
    if (!formData.price || formData.price <= 0) errors.price = 'Valid price is required';
    if (formData.selling_price && formData.selling_price > formData.price) {
      errors.selling_price = 'Selling price cannot be higher than regular price';
    }
    if (formData.discount < 0 || formData.discount > 100) {
      errors.discount = 'Discount must be between 0-100%';
    }
    if (formData.quantity < 0) errors.quantity = 'Quantity cannot be negative';
    if (!formData.category_id) errors.category_id = 'Category is required';
    if (!formData.brand_id) errors.brand_id = 'Brand is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  const generateSlug = () => {
    if (formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({...prev, slug}));
    }
  };

  return (
    <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Name <span className="text-danger">*</span></Label>
            <Input 
              name="name" 
              value={formData.name} 
              onChange={handleNameChange} 
              required 
              invalid={!!validationErrors.name}
            />
            {validationErrors.name && (
              <FormFeedback>{validationErrors.name}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Slug <span className="text-danger">*</span></Label>
            <div className="d-flex">
              <Input 
                name="slug" 
                value={formData.slug} 
                onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))} 
                required 
                invalid={!!validationErrors.slug}
              />
              <Button 
                type="button" 
                color="secondary" 
                onClick={generateSlug}
                className="ms-2"
                disabled={!formData.name}
              >
                Generate
              </Button>
            </div>
            {validationErrors.slug && (
              <FormFeedback>{validationErrors.slug}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <Label>Description</Label>
        <Input 
          type="textarea" 
          name="description" 
          value={formData.description} 
          onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} 
          rows={4}
        />
      </FormGroup>

      <Row>
        <Col md={4}>
          <FormGroup>
            <Label>Price <span className="text-danger">*</span></Label>
            <Input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={(e) => setFormData(prev => ({
                ...prev, 
                price: parseFloat(e.target.value) || 0,
                selling_price: prev.discount > 0 
                  ? (parseFloat(e.target.value) || 0) * (1 - prev.discount/100)
                  : prev.selling_price
              }))} 
              min="0.01"
              step="0.01"
              required 
              invalid={!!validationErrors.price}
            />
            {validationErrors.price && (
              <FormFeedback>{validationErrors.price}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label>Discount (%)</Label>
            <Input 
              type="number" 
              name="discount" 
              value={formData.discount} 
              onChange={handleDiscountChange}
              min="0"
              max="100"
              step="1"
              invalid={!!validationErrors.discount}
            />
            {validationErrors.discount && (
              <FormFeedback>{validationErrors.discount}</FormFeedback>
            )}
            {formData.discount > 0 && (
              <small className="text-success">
                Final price: ${(formData.price * (1 - formData.discount/100)).toFixed(2)}
              </small>
            )}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label>Selling Price</Label>
            <Input 
              type="number" 
              name="selling_price" 
              value={formData.selling_price || ''} 
              onChange={handleSellingPriceChange}
              min="0.01"
              step="0.01"
              invalid={!!validationErrors.selling_price}
            />
            {validationErrors.selling_price && (
              <FormFeedback>{validationErrors.selling_price}</FormFeedback>
            )}
            <small className="text-muted">Leave empty to use regular price</small>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <FormGroup>
            <Label>Quantity <span className="text-danger">*</span></Label>
            <Input 
              type="number" 
              name="quantity" 
              value={formData.quantity} 
              onChange={(e) => setFormData(prev => ({...prev, quantity: parseInt(e.target.value) || 0}))} 
              min="0"
              required 
              invalid={!!validationErrors.quantity}
            />
            {validationErrors.quantity && (
              <FormFeedback>{validationErrors.quantity}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label>Product Image</Label>
            <Input 
              type="file" 
              name="image" 
              onChange={handleImageChange}
              accept="image/jpeg, image/png, image/gif, image/webp"
            />
            {formData.image_url && (
              <div className="mt-2">
                <small>Current Image:</small>
                <img 
                  src={formData.image_url} 
                  alt="Product preview" 
                  className="img-thumbnail mt-1"
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Category <span className="text-danger">*</span></Label>
            <Input 
              type="select" 
              name="category_id" 
              value={formData.category_id} 
              onChange={handleCategoryChange} 
              required
              disabled={loadingCategories}
              invalid={!!validationErrors.category_id}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Input>
            {validationErrors.category_id && (
              <FormFeedback>{validationErrors.category_id}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Brand <span className="text-danger">*</span></Label>
            <Input 
              type="select" 
              name="brand_id" 
              value={formData.brand_id} 
              onChange={(e) => setFormData(prev => ({...prev, brand_id: e.target.value}))} 
              required
              disabled={!formData.category_id || brands.length === 0}
              invalid={!!validationErrors.brand_id}
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Input>
            {validationErrors.brand_id && (
              <FormFeedback>{validationErrors.brand_id}</FormFeedback>
            )}
            {!formData.category_id && (
              <small className="text-muted">Please select a category first</small>
            )}
            {formData.category_id && brands.length === 0 && (
              <small className="text-danger">No brands available for this category</small>
            )}
          </FormGroup>
        </Col>
      </Row>

      <FormGroup check className="mb-3">
        <Input 
          type="checkbox" 
          name="is_active" 
          checked={formData.is_active} 
          onChange={(e) => setFormData(prev => ({...prev, is_active: e.target.checked}))} 
          id="is_active_checkbox"
        />
        <Label check for="is_active_checkbox">Active</Label>
      </FormGroup>

      {error && (
        <Alert color="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <div className="text-end">
        <Button color="secondary" onClick={toggleModal} className="me-2" disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" color="primary" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner size="sm" className="me-2" />
              {isEditing ? 'Updating...' : 'Saving...'}
            </>
          ) : isEditing ? 'Update' : 'Save'} Product
        </Button>
      </div>
    </Form>
  );
});

const ProductManagement = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    selling_price: '',
    discount: '0',
    quantity: '0',
    category_id: '',
    brand_id: '',
    is_active: true,
    image: null,
    image_url: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAPIError = useCallback((err) => {
    if (err.response) {
      if (err.response.status === 422) {
        if (err.response.data && err.response.data.detail) {
          if (Array.isArray(err.response.data.detail)) {
            return err.response.data.detail.map(d => `${d.loc.join('.')}: ${d.msg}`).join('\n');
          }
          return err.response.data.detail;
        }
        return 'Validation error occurred';
      }
      return err.response.data?.message || err.response.data?.detail || err.response.statusText || 'An error occurred';
    }
    return err.message || 'Network error occurred';
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      setError(null);
      const response = await api.get('/');
      setProducts(response.data || []);
    } catch (err) {
      const errorMsg = 'Failed to fetch products: ' + handleAPIError(err);
      setError(errorMsg);
      console.error('Products fetch error:', err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
      setInitialLoading(false);
    }
  }, [handleAPIError]);

  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      setError(null);
      const response = await axios.get('http://localhost:8000/api/v1/categories');
      setCategories(response.data || []);
    } catch (err) {
      const errorMsg = 'Failed to fetch categories: ' + handleAPIError(err);
      setError(errorMsg);
      console.error('Categories fetch error:', err);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  }, [handleAPIError]);

  const fetchBrandsByCategory = useCallback(async (categoryId) => {
    if (!categoryId) {
      setBrands([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/categories/${categoryId}?include_brands=true`);
      setBrands(response.data.brands || []);
    } catch (err) {
      setError('Failed to fetch brands: ' + handleAPIError(err));
      setBrands([]);
    }
  }, [handleAPIError]);

  const handleNameChange = useCallback((e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name
    }));
  }, []);

  const handleCategoryChange = useCallback(async (e) => {
    const categoryId = e.target.value;
    setFormData(prev => ({
      ...prev,
      category_id: categoryId,
      brand_id: ''
    }));

    await fetchBrandsByCategory(categoryId);
  }, [fetchBrandsByCategory]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid image type. Please upload a JPEG, PNG, GIF, or WebP image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image too large. Maximum size is 5MB.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    
    setFormData(prev => ({
      ...prev,
      image: file,
      image_url: previewUrl
    }));
    setError(null);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      const formDataObj = new FormData();
      
      formDataObj.append('name', formData.name);
      formDataObj.append('slug', formData.slug);
      formDataObj.append('description', formData.description || '');
      formDataObj.append('price', formData.price.toString());
      formDataObj.append('selling_price', formData.selling_price || '');
      formDataObj.append('discount', formData.discount.toString());
      formDataObj.append('quantity', formData.quantity.toString());
      formDataObj.append('category_id', formData.category_id.toString());
      formDataObj.append('brand_id', formData.brand_id.toString());
      formDataObj.append('is_active', formData.is_active.toString());
      
      if (formData.image) {
        formDataObj.append('image', formData.image);
      }

      let response;
      if (isEditing) {
        response = await api.put(`/${currentProductId}`, formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessMessage('Product updated successfully!');
      } else {
        response = await api.post('/products/', formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccessMessage('Product created successfully!');
      }

      await fetchProducts();
      setTimeout(() => {
        setModalOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Submission error:', err);
      let errorMsg = 'Failed to save product';
      
      if (err.response) {
        if (err.response.data?.detail) {
          errorMsg += `: ${err.response.data.detail}`;
        } else if (err.response.status === 422) {
          errorMsg += ': Validation error - please check your inputs';
        }
      }
      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  }, [isEditing, currentProductId, formData, fetchProducts]);

  const handleEditClick = useCallback((product) => {
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price.toString(),
      selling_price: product.selling_price?.toString() || '',
      discount: product.discount?.toString() || '0',
      quantity: product.quantity.toString(),
      category_id: product.category?.id?.toString() || '',
      brand_id: product.brand?.id?.toString() || '',
      is_active: product.is_active,
      image: null,
      image_url: product.image_url ? 
        (product.image_url.startsWith('http') ? 
          product.image_url : 
          `http://localhost:8000${product.image_url}`) : 
        ''
    });
    setCurrentProductId(product.id);
    setIsEditing(true);
    fetchBrandsByCategory(product.category?.id);
    setModalOpen(true);
  }, [fetchBrandsByCategory]);

  const handleDeleteProduct = useCallback(async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoadingProducts(true);
      await api.delete(`/${productId}`);
      setSuccessMessage('Product deleted successfully!');
      await fetchProducts();
    } catch (err) {
      setError('Failed to delete product: ' + handleAPIError(err));
    } finally {
      setLoadingProducts(false);
    }
  }, [fetchProducts, handleAPIError]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      selling_price: '',
      discount: '0',
      quantity: '0',
      category_id: '',
      brand_id: '',
      is_active: true,
      image: null,
      image_url: ''
    });
    setIsEditing(false);
    setCurrentProductId(null);
    setError(null);
    setSuccessMessage(null);
    setBrands([]);
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(prev => {
      if (!prev) resetForm();
      return !prev;
    });
  }, [resetForm]);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        if (isMounted) {
          await Promise.all([fetchProducts(), fetchCategories()]);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load initial data: ' + handleAPIError(err));
        }
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [fetchProducts, fetchCategories, handleAPIError]);

  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <div className="p-4">
      {error && (
        <Fade in={!!error} timeout={300}>
          <Alert color="danger" toggle={() => setError(null)}>
            {error}
          </Alert>
        </Fade>
      )}

      {successMessage && (
        <Fade in={!!successMessage} timeout={300}>
          <Alert color="success" toggle={() => setSuccessMessage(null)}>
            {successMessage}
          </Alert>
        </Fade>
      )}

      <Row className="mb-4">
        <Col className="text-end">
          <Button color="primary" onClick={toggleModal} disabled={loadingProducts}>
            {loadingProducts ? <Spinner size="sm" /> : 'Add Product'}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h5" className="border-bottom p-3 mb-0">Product List</CardTitle>
            <CardBody>
              {initialLoading ? (
                <div className="text-center py-4">
                  <Spinner color="primary" />
                  <div>Loading products...</div>
                </div>
              ) : memoizedProducts.length === 0 ? (
                <div className="text-center py-4">
                  {loadingProducts ? (
                    <Spinner color="primary" />
                  ) : (
                    'No products found'
                  )}
                </div>
              ) : (
                <Table striped responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Selling Price</th>
                      <th>Stock</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memoizedProducts.map((product, index) => (
                      <ProductRow 
                        key={product.id}
                        product={product}
                        index={index}
                        loadingProducts={loadingProducts}
                        handleEditClick={handleEditClick}
                        handleDeleteProduct={handleDeleteProduct}
                      />
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" onClosed={resetForm}>
        <ModalHeader toggle={toggleModal}>{isEditing ? 'Edit Product' : 'Add Product'}</ModalHeader>
        <ModalBody>
          <ModalFormContent 
            formData={formData}
            loadingCategories={loadingCategories}
            categories={categories}
            brands={brands}
            handleNameChange={handleNameChange}
            handleCategoryChange={handleCategoryChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            submitting={submitting}
            isEditing={isEditing}
            setFormData={setFormData}
            error={error}
            toggleModal={toggleModal}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductManagement;