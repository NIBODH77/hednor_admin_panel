
// // // // // 'use client';
// // // // // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // // // // import {
// // // // //   Button, ButtonGroup, Card, CardBody, CardTitle, Row, Col, Modal, ModalHeader, ModalBody,
// // // // //   Form, FormGroup, Input, Label, Table, Badge, Spinner, Alert, Pagination, PaginationItem, PaginationLink
// // // // // } from 'reactstrap';
// // // // // import axios from 'axios';

// // // // // // Configure axios
// // // // // const api = axios.create({
// // // // //   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000',
// // // // //   timeout: 10000,
// // // // //   headers: { 'Content-Type': 'application/json' }
// // // // // });

// // // // // // Error Boundary (unchanged from previous)
// // // // // class SimpleErrorBoundary extends React.Component {
// // // // //   constructor(props) {
// // // // //     super(props);
// // // // //     this.state = { hasError: false, error: null };
// // // // //   }

// // // // //   static getDerivedStateFromError(error) {
// // // // //     return { hasError: true, error };
// // // // //   }

// // // // //   componentDidCatch(error, errorInfo) {
// // // // //     console.error('Error caught by boundary:', error, errorInfo);
// // // // //   }

// // // // //   handleReset = () => {
// // // // //     this.setState({ hasError: false, error: null });
// // // // //     this.props.onReset?.();
// // // // //   };

// // // // //   render() {
// // // // //     if (this.state.hasError) {
// // // // //       return (
// // // // //         <div className="p-4">
// // // // //           <Alert color="danger">
// // // // //             <h5>Something went wrong:</h5>
// // // // //             <pre className="text-muted">{this.state.error.message}</pre>
// // // // //             <Button color="primary" onClick={this.handleReset}>Try again</Button>
// // // // //           </Alert>
// // // // //         </div>
// // // // //       );
// // // // //     }
// // // // //     return this.props.children;
// // // // //   }
// // // // // }

// // // // // // Bulk Upload Modal Component
// // // // // const BulkUploadModal = ({ 
// // // // //   isOpen, 
// // // // //   toggle, 
// // // // //   onUploadComplete,
// // // // //   categories,
// // // // //   brands 
// // // // // }) => {
// // // // //   const [file, setFile] = useState(null);
// // // // //   const [progress, setProgress] = useState(0);
// // // // //   const [errors, setErrors] = useState([]);
// // // // //   const [isUploading, setIsUploading] = useState(false);
// // // // //   const [validationSummary, setValidationSummary] = useState(null);
// // // // //   const [processedCount, setProcessedCount] = useState(0);

// // // // //   const handleFileChange = (e) => {
// // // // //     setFile(e.target.files[0]);
// // // // //     setErrors([]);
// // // // //     setValidationSummary(null);
// // // // //   };

// // // // //   const downloadTemplate = () => {
// // // // //     const headers = [
// // // // //       'name', 'slug', 'description', 'price', 'quantity', 
// // // // //       'category_id', 'brand_id', 'is_active'
// // // // //     ];
// // // // //     const sampleData = [
// // // // //       {
// // // // //         name: 'Sample Product 1',
// // // // //         slug: 'sample-product-1',
// // // // //         description: 'Description of product 1',
// // // // //         price: '19.99',
// // // // //         quantity: '100',
// // // // //         category_id: '1',
// // // // //         brand_id: '1',
// // // // //         is_active: 'true'
// // // // //       },
// // // // //       {
// // // // //         name: 'Sample Product 2',
// // // // //         slug: '',
// // // // //         description: '',
// // // // //         price: '29.99',
// // // // //         quantity: '50',
// // // // //         category_id: '2',
// // // // //         brand_id: '3',
// // // // //         is_active: 'false'
// // // // //       }
// // // // //     ];

// // // // //     let csvContent = headers.join(',') + '\n';
// // // // //     sampleData.forEach(row => {
// // // // //       csvContent += headers.map(header => `"${row[header]}"`).join(',') + '\n';
// // // // //     });

// // // // //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// // // // //     const url = URL.createObjectURL(blob);
// // // // //     const link = document.createElement('a');
// // // // //     link.setAttribute('href', url);
// // // // //     link.setAttribute('download', 'product_import_template.csv');
// // // // //     link.style.visibility = 'hidden';
// // // // //     document.body.appendChild(link);
// // // // //     link.click();
// // // // //     document.body.removeChild(link);
// // // // //   };

// // // // //   const validateRow = (row, index) => {
// // // // //     const rowErrors = [];
    
// // // // //     // Required fields
// // // // //     if (!row.name) rowErrors.push('Name is required');
// // // // //     if (!row.price) rowErrors.push('Price is required');
// // // // //     if (!row.quantity) rowErrors.push('Quantity is required');
    
// // // // //     // Numeric validation
// // // // //     if (row.price && isNaN(parseFloat(row.price))) {
// // // // //       rowErrors.push('Price must be a number');
// // // // //     }
// // // // //     if (row.quantity && isNaN(parseInt(row.quantity))) {
// // // // //       rowErrors.push('Quantity must be an integer');
// // // // //     }
    
// // // // //     // Category/brand validation
// // // // //     if (row.category_id && !categories.some(c => c.id == row.category_id)) {
// // // // //       rowErrors.push(`Category ID ${row.category_id} not found`);
// // // // //     }
// // // // //     if (row.brand_id && !brands.some(b => b.id == row.brand_id)) {
// // // // //       rowErrors.push(`Brand ID ${row.brand_id} not found`);
// // // // //     }
    
// // // // //     return rowErrors.length > 0 
// // // // //       ? { row, index: index + 1, errors: rowErrors }
// // // // //       : null;
// // // // //   };

// // // // //   const handleSubmit = async () => {
// // // // //     if (!file) {
// // // // //       setErrors(['Please select a file']);
// // // // //       return;
// // // // //     }

// // // // //     setIsUploading(true);
// // // // //     setProgress(0);
// // // // //     setErrors([]);
// // // // //     setValidationSummary(null);
// // // // //     setProcessedCount(0);
    
// // // // //     try {
// // // // //       const formData = new FormData();
// // // // //       formData.append('file', file);
      
// // // // //       // First pass for validation
// // // // //       const reader = new FileReader();
// // // // //       reader.onload = async (e) => {
// // // // //         const content = e.target.result;
// // // // //         const rows = content.split('\n').slice(1).filter(line => line.trim());
// // // // //         let validRows = 0;
// // // // //         const validationErrors = [];
        
// // // // //         rows.forEach((row, i) => {
// // // // //           const values = row.split(',');
// // // // //           const rowData = {
// // // // //             name: values[0]?.replace(/"/g, ''),
// // // // //             slug: values[1]?.replace(/"/g, ''),
// // // // //             description: values[2]?.replace(/"/g, ''),
// // // // //             price: values[3]?.replace(/"/g, ''),
// // // // //             quantity: values[4]?.replace(/"/g, ''),
// // // // //             category_id: values[5]?.replace(/"/g, ''),
// // // // //             brand_id: values[6]?.replace(/"/g, ''),
// // // // //             is_active: values[7]?.replace(/"/g, '')
// // // // //           };
          
// // // // //           const validation = validateRow(rowData, i);
// // // // //           if (validation) {
// // // // //             validationErrors.push(validation);
// // // // //           } else {
// // // // //             validRows++;
// // // // //           }
          
// // // // //           setProcessedCount(i + 1);
// // // // //         });
        
// // // // //         if (validationErrors.length > 0) {
// // // // //           setValidationSummary({
// // // // //             total: rows.length,
// // // // //             valid: validRows,
// // // // //             invalid: validationErrors.length
// // // // //           });
          
// // // // //           const formattedErrors = validationErrors.flatMap(err => 
// // // // //             err.errors.map(e => `Row ${err.index}: ${e}`)
// // // // //           );
// // // // //           setErrors(formattedErrors);
// // // // //           setIsUploading(false);
// // // // //           return;
// // // // //         }
        
// // // // //         // If validation passes, proceed with upload
// // // // //         try {
// // // // //           const response = await api.post('/products/bulk', formData, {
// // // // //             headers: { 'Content-Type': 'multipart/form-data' },
// // // // //             onUploadProgress: (progressEvent) => {
// // // // //               const percentCompleted = Math.round(
// // // // //                 (progressEvent.loaded * 100) / progressEvent.total
// // // // //               );
// // // // //               setProgress(percentCompleted);
// // // // //             }
// // // // //           });
          
// // // // //           onUploadComplete({
// // // // //             success: true,
// // // // //             count: response.data.count,
// // // // //             errors: response.data.errors || []
// // // // //           });
// // // // //           toggle();
// // // // //         } catch (err) {
// // // // //           setErrors(err.response?.data?.errors || ['Upload failed']);
// // // // //         } finally {
// // // // //           setIsUploading(false);
// // // // //         }
// // // // //       };
      
// // // // //       reader.readAsText(file);
// // // // //     } catch (err) {
// // // // //       setErrors(['File processing failed']);
// // // // //       setIsUploading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <Modal isOpen={isOpen} toggle={toggle} size="lg">
// // // // //       <ModalHeader toggle={toggle}>Bulk Product Upload</ModalHeader>
// // // // //       <ModalBody>
// // // // //         <div className="space-y-4">
// // // // //           <div className="flex justify-between items-center">
// // // // //             <Label className="text-lg font-medium">Upload Product CSV</Label>
// // // // //             <Button 
// // // // //               color="link" 
// // // // //               onClick={downloadTemplate}
// // // // //               className="text-indigo-600"
// // // // //             >
// // // // //               <i className="fas fa-download mr-2"></i>
// // // // //               Download Template
// // // // //             </Button>
// // // // //           </div>
          
// // // // //           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
// // // // //             <input 
// // // // //               type="file" 
// // // // //               accept=".csv" 
// // // // //               onChange={handleFileChange}
// // // // //               className="hidden" 
// // // // //               id="bulk-upload"
// // // // //               disabled={isUploading}
// // // // //             />
// // // // //             <label 
// // // // //               htmlFor="bulk-upload" 
// // // // //               className="cursor-pointer"
// // // // //             >
// // // // //               <div className="flex flex-col items-center justify-center">
// // // // //                 <i className={`fas ${file ? 'fa-file-csv' : 'fa-file-upload'} text-4xl text-gray-400 mb-3`}></i>
// // // // //                 <p className="text-sm text-gray-600">
// // // // //                   {file ? file.name : 'Drag and drop or click to select CSV file'}
// // // // //                 </p>
// // // // //                 <p className="text-xs text-gray-500 mt-2">
// // // // //                   Maximum file size: 5MB
// // // // //                 </p>
// // // // //               </div>
// // // // //             </label>
// // // // //           </div>

// // // // //           {processedCount > 0 && (
// // // // //             <div className="bg-blue-50 p-3 rounded-lg">
// // // // //               <div className="flex justify-between text-sm text-gray-700 mb-1">
// // // // //                 <span>Processed {processedCount} records</span>
// // // // //                 {validationSummary && (
// // // // //                   <span>
// // // // //                     {validationSummary.valid} valid, {validationSummary.invalid} with errors
// // // // //                   </span>
// // // // //                 )}
// // // // //               </div>
// // // // //               {progress > 0 && (
// // // // //                 <div className="w-full bg-gray-200 rounded-full h-2">
// // // // //                   <div 
// // // // //                     className="bg-blue-600 h-2 rounded-full" 
// // // // //                     style={{ width: `${progress}%` }}
// // // // //                   ></div>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           )}

// // // // //           {errors.length > 0 && (
// // // // //             <div className="bg-red-50 border-l-4 border-red-500 p-4 max-h-60 overflow-y-auto">
// // // // //               <div className="flex">
// // // // //                 <div className="flex-shrink-0">
// // // // //                   <i className="fas fa-exclamation-circle text-red-500 mt-1"></i>
// // // // //                 </div>
// // // // //                 <div className="ml-3">
// // // // //                   <h3 className="text-sm font-medium text-red-800">
// // // // //                     Found {errors.length} validation errors
// // // // //                   </h3>
// // // // //                   <div className="mt-2 text-sm text-red-700">
// // // // //                     <ul className="space-y-1">
// // // // //                       {errors.slice(0, 20).map((error, index) => (
// // // // //                         <li key={index} className="truncate">{error}</li>
// // // // //                       ))}
// // // // //                       {errors.length > 20 && (
// // // // //                         <li className="text-gray-500">... and {errors.length - 20} more</li>
// // // // //                       )}
// // // // //                     </ul>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           <div className="flex justify-end space-x-3 pt-2">
// // // // //             <Button 
// // // // //               color="secondary" 
// // // // //               onClick={toggle}
// // // // //               disabled={isUploading}
// // // // //             >
// // // // //               Cancel
// // // // //             </Button>
// // // // //             <Button 
// // // // //               color="primary" 
// // // // //               onClick={handleSubmit}
// // // // //               disabled={!file || isUploading}
// // // // //             >
// // // // //               {isUploading ? (
// // // // //                 <>
// // // // //                   <Spinner size="sm" className="me-2" />
// // // // //                   {progress > 0 ? `Uploading (${progress}%)` : 'Validating...'}
// // // // //                 </>
// // // // //               ) : 'Upload'}
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </ModalBody>
// // // // //     </Modal>
// // // // //   );
// // // // // };

// // // // // // Product Management Component
// // // // // const ProductManagement = () => {
// // // // //   // Existing state
// // // // //   const [products, setProducts] = useState([]);
// // // // //   const [categories, setCategories] = useState([]);
// // // // //   const [brands, setBrands] = useState([]);
// // // // //   const [form, setForm] = useState({
// // // // //     name: '', slug: '', description: '', price: '', quantity: 0,
// // // // //     category_id: '', brand_id: '', is_active: true, image: null, image_url: ''
// // // // //   });
// // // // //   const [modalOpen, setModalOpen] = useState(false);
// // // // //   const [bulkModalOpen, setBulkModalOpen] = useState(false);
// // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // //   const [currentProductId, setCurrentProductId] = useState(null);
// // // // //   const [loadingProducts, setLoadingProducts] = useState(false);
// // // // //   const [loadingCategories, setLoadingCategories] = useState(false);
// // // // //   const [submitting, setSubmitting] = useState(false);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [success, setSuccess] = useState(null);
// // // // //   const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });

// // // // //   // Toggle modals
// // // // //   const toggleModal = () => setModalOpen(!modalOpen);
// // // // //   const toggleBulkModal = () => setBulkModalOpen(!bulkModalOpen);

// // // // //   // Handle bulk upload completion
// // // // //   const handleBulkUploadComplete = (result) => {
// // // // //     if (result.success) {
// // // // //       setSuccess(`${result.count} products added successfully`);
// // // // //       fetchProducts();
// // // // //       setTimeout(() => setSuccess(null), 5000);
// // // // //     } else if (result.errors && result.errors.length > 0) {
// // // // //       setError(`Upload completed with ${result.errors.length} errors`);
// // // // //     }
// // // // //   };

// // // // //   // Existing methods (fetchProducts, fetchCategories, etc.) remain unchanged
// // // // //   // ... [Previous implementation of all other methods] ...

// // // // //   return (
// // // // //     <SimpleErrorBoundary onReset={() => { setError(null); fetchProducts(); }}>
// // // // //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
// // // // //         {/* Success Notification */}
// // // // //         {success && (
// // // // //           <Alert 
// // // // //             color="success" 
// // // // //             toggle={() => setSuccess(null)}
// // // // //             className="animate-fade-in-up mb-6 rounded-xl shadow-lg"
// // // // //           >
// // // // //             <i className="fas fa-check-circle mr-2"></i>
// // // // //             {success}
// // // // //           </Alert>
// // // // //         )}

// // // // //         {/* Error Notification */}
// // // // //         {error && (
// // // // //           <Alert 
// // // // //             color="danger" 
// // // // //             toggle={() => setError(null)}
// // // // //             className="animate-bounce-in mb-6 rounded-xl shadow-lg border-l-4 border-red-500"
// // // // //           >
// // // // //             {error}
// // // // //           </Alert>
// // // // //         )}

// // // // //         {/* Action Buttons */}
// // // // //         <div className="flex justify-end mb-6 space-x-3">
// // // // //           <Button 
// // // // //             color="primary" 
// // // // //             onClick={() => { resetForm(); toggleModal(); }}
// // // // //             className="rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-indigo-600 to-purple-600 border-0"
// // // // //           >
// // // // //             <i className="fas fa-plus me-2"></i>
// // // // //             Add Product
// // // // //           </Button>
// // // // //           <Button 
// // // // //             color="success" 
// // // // //             onClick={toggleBulkModal}
// // // // //             className="rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-green-600 to-emerald-600 border-0"
// // // // //           >
// // // // //             <i className="fas fa-upload me-2"></i>
// // // // //             Bulk Upload
// // // // //           </Button>
// // // // //         </div>

// // // // //         {/* Product Table (existing implementation) */}
// // // // //         {/* ... [Previous table implementation] ... */}

// // // // //         {/* Single Product Modal (existing implementation) */}
// // // // //         {/* ... [Previous modal implementation] ... */}

// // // // //         {/* Bulk Upload Modal */}
// // // // //         <BulkUploadModal 
// // // // //           isOpen={bulkModalOpen}
// // // // //           toggle={toggleBulkModal}
// // // // //           onUploadComplete={handleBulkUploadComplete}
// // // // //           categories={categories}
// // // // //           brands={brands}
// // // // //         />
// // // // //       </div>
// // // // //     </SimpleErrorBoundary>
// // // // //   );
// // // // // };
// // // // // export default ProductManagement;






// // // // // import React, { useState, useCallback } from 'react';
// // // // // import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Alert, Spinner, Progress } from 'reactstrap';
// // // // // import axios from 'axios';

// // // // import React, { useState, useCallback } from 'react';
// // // // import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Alert, Spinner, Progress } from 'reactstrap';
// // // // import axios from 'axios';


// // // // const BulkProductManagement = ({ categories, brands, fetchProducts }) => {
// // // //   const [modalOpen, setModalOpen] = useState(false);
// // // //   const [file, setFile] = useState(null);
// // // //   const [progress, setProgress] = useState(0);
// // // //   const [errors, setErrors] = useState([]);
// // // //   const [isUploading, setIsUploading] = useState(false);
// // // //   const [successMessage, setSuccessMessage] = useState('');

// // // //   const toggleModal = () => setModalOpen(!modalOpen);

// // // //   const handleFileChange = (e) => {
// // // //     setFile(e.target.files[0]);
// // // //     setErrors([]);
// // // //     setSuccessMessage('');
// // // //   };

// // // //   const downloadTemplate = () => {
// // // //     const headers = ['Image', 'Name', 'Price', 'Stock', 'Category', 'Brand', 'Status'];
// // // //     const sampleData = [
// // // //       {
// // // //         Image: 'product1.jpg',
// // // //         Name: 'Premium Headphones',
// // // //         Price: '199.99',
// // // //         Stock: '50',
// // // //         Category: 'Electronics',
// // // //         Brand: 'Sony',
// // // //         Status: 'Active'
// // // //       },
// // // //       {
// // // //         Image: 'product2.jpg',
// // // //         Name: 'Wireless Mouse',
// // // //         Price: '29.99',
// // // //         Stock: '100',
// // // //         Category: 'Accessories',
// // // //         Brand: 'Logitech',
// // // //         Status: 'Active'
// // // //       }
// // // //     ];

// // // //     let csvContent = headers.join(',') + '\n';
// // // //     sampleData.forEach(row => {
// // // //       csvContent += headers.map(header => `"${row[header]}"`).join(',') + '\n';
// // // //     });

// // // //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// // // //     const url = URL.createObjectURL(blob);
// // // //     const link = document.createElement('a');
// // // //     link.setAttribute('href', url);
// // // //     link.setAttribute('download', 'bulk_products_template.csv');
// // // //     link.style.visibility = 'hidden';
// // // //     document.body.appendChild(link);
// // // //     link.click();
// // // //     document.body.removeChild(link);
// // // //   };

// // // //   const uploadBulkProducts = async () => {
// // // //     if (!file) {
// // // //       setErrors(['Please select a file to upload']);
// // // //       return;
// // // //     }

// // // //     setIsUploading(true);
// // // //     setProgress(0);
// // // //     setErrors([]);

// // // //     const formData = new FormData();
// // // //     formData.append('file', file);

// // // //     try {
// // // //       const response = await axios.post('/api/products/bulk', formData, {
// // // //         headers: {
// // // //           'Content-Type': 'multipart/form-data',
// // // //         },
// // // //         onUploadProgress: (progressEvent) => {
// // // //           const percentCompleted = Math.round(
// // // //             (progressEvent.loaded * 100) / progressEvent.total
// // // //           );
// // // //           setProgress(percentCompleted);
// // // //         },
// // // //       });

// // // //       setSuccessMessage(`Successfully uploaded ${response.data.created_count} products`);
// // // //       fetchProducts();
// // // //       setTimeout(() => {
// // // //         setSuccessMessage('');
// // // //         toggleModal();
// // // //       }, 3000);
// // // //     } catch (error) {
// // // //       if (error.response) {
// // // //         setErrors(error.response.data.detail || ['Upload failed']);
// // // //       } else {
// // // //         setErrors(['Network error. Please try again.']);
// // // //       }
// // // //     } finally {
// // // //       setIsUploading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <Button color="primary" onClick={toggleModal} className="mb-3">
// // // //         <i className="fas fa-upload me-2"></i> Bulk Upload Products
// // // //       </Button>

// // // //       <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
// // // //         <ModalHeader toggle={toggleModal}>Bulk Product Upload</ModalHeader>
// // // //         <ModalBody>
// // // //           <div className="mb-4">
// // // //             <Button color="link" onClick={downloadTemplate} className="p-0">
// // // //               <i className="fas fa-file-download me-2"></i> Download CSV Template
// // // //             </Button>
// // // //           </div>

// // // //           <FormGroup>
// // // //             <Label for="productFile">Select CSV File</Label>
// // // //             <Input
// // // //               type="file"
// // // //               id="productFile"
// // // //               accept=".csv"
// // // //               onChange={handleFileChange}
// // // //               disabled={isUploading}
// // // //             />
// // // //           </FormGroup>

// // // //           {progress > 0 && (
// // // //             <div className="my-3">
// // // //               <div className="d-flex justify-content-between mb-1">
// // // //                 <span>Upload Progress</span>
// // // //                 <span>{progress}%</span>
// // // //               </div>
// // // //               <Progress value={progress} />
// // // //             </div>
// // // //           )}

// // // //           {successMessage && (
// // // //             <Alert color="success" className="mt-3">
// // // //               {successMessage}
// // // //             </Alert>
// // // //           )}

// // // //           {errors.length > 0 && (
// // // //             <Alert color="danger" className="mt-3">
// // // //               <ul className="mb-0 pl-3">
// // // //                 {errors.map((error, index) => (
// // // //                   <li key={index}>{error}</li>
// // // //                 ))}
// // // //               </ul>
// // // //             </Alert>
// // // //           )}

// // // //           <div className="d-flex justify-content-end mt-4">
// // // //             <Button
// // // //               color="primary"
// // // //               onClick={uploadBulkProducts}
// // // //               disabled={!file || isUploading}
// // // //             >
// // // //               {isUploading ? (
// // // //                 <>
// // // //                   <Spinner size="sm" className="me-2" />
// // // //                   Uploading...
// // // //                 </>
// // // //               ) : (
// // // //                 'Upload Products'
// // // //               )}
// // // //             </Button>
// // // //           </div>
// // // //         </ModalBody>
// // // //       </Modal>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BulkProductManagement;




// // // 'use client'; // This directive marks the component as a Client Component

// // // import React, { useState, useCallback } from 'react';
// // // import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Alert, Spinner, Progress } from 'reactstrap';
// // // import axios from 'axios';

// // // const BulkProductManagement = ({ categories, brands, fetchProducts }) => {
// // //   const [modalOpen, setModalOpen] = useState(false);
// // //   const [file, setFile] = useState(null);
// // //   const [progress, setProgress] = useState(0);
// // //   const [errors, setErrors] = useState([]);
// // //   const [isUploading, setIsUploading] = useState(false);
// // //   const [successMessage, setSuccessMessage] = useState('');

// // //   const toggleModal = () => setModalOpen(!modalOpen);

// // //   const handleFileChange = (e) => {
// // //     setFile(e.target.files[0]);
// // //     setErrors([]);
// // //     setSuccessMessage('');
// // //   };

// // //   const downloadTemplate = () => {
// // //     const headers = ['Image', 'Name', 'Price', 'Stock', 'Category', 'Brand', 'Status'];
// // //     const sampleData = [
// // //       {
// // //         Image: 'product1.jpg',
// // //         Name: 'Premium Headphones',
// // //         Price: '199.99',
// // //         Stock: '50',
// // //         Category: 'Electronics',
// // //         Brand: 'Sony',
// // //         Status: 'Active'
// // //       },
// // //       {
// // //         Image: 'product2.jpg',
// // //         Name: 'Wireless Mouse',
// // //         Price: '29.99',
// // //         Stock: '100',
// // //         Category: 'Accessories',
// // //         Brand: 'Logitech',
// // //         Status: 'Active'
// // //       }
// // //     ];

// // //     let csvContent = headers.join(',') + '\n';
// // //     sampleData.forEach(row => {
// // //       csvContent += headers.map(header => `"${row[header]}"`).join(',') + '\n';
// // //     });

// // //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// // //     const url = URL.createObjectURL(blob);
// // //     const link = document.createElement('a');
// // //     link.setAttribute('href', url);
// // //     link.setAttribute('download', 'bulk_products_template.csv');
// // //     link.style.visibility = 'hidden';
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //   };

// // //   const uploadBulkProducts = async () => {
// // //     if (!file) {
// // //       setErrors(['Please select a file to upload']);
// // //       return;
// // //     }

// // //     setIsUploading(true);
// // //     setProgress(0);
// // //     setErrors([]);

// // //     const formData = new FormData();
// // //     formData.append('file', file);

// // //     try {
// // //       const response = await axios.post('/api/products/bulk', formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data',
// // //         },
// // //         onUploadProgress: (progressEvent) => {
// // //           const percentCompleted = Math.round(
// // //             (progressEvent.loaded * 100) / progressEvent.total
// // //           );
// // //           setProgress(percentCompleted);
// // //         },
// // //       });

// // //       setSuccessMessage(`Successfully uploaded ${response.data.created_count} products`);
// // //       fetchProducts();
// // //       setTimeout(() => {
// // //         setSuccessMessage('');
// // //         toggleModal();
// // //       }, 3000);
// // //     } catch (error) {
// // //       if (error.response) {
// // //         setErrors(error.response.data.detail || ['Upload failed']);
// // //       } else {
// // //         setErrors(['Network error. Please try again.']);
// // //       }
// // //     } finally {
// // //       setIsUploading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-4">
// // //       <Button color="primary" onClick={toggleModal} className="mb-3">
// // //         <i className="fas fa-upload me-2"></i> Bulk Upload Products
// // //       </Button>

// // //       <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
// // //         <ModalHeader toggle={toggleModal}>Bulk Product Upload</ModalHeader>
// // //         <ModalBody>
// // //           <div className="mb-4">
// // //             <Button color="link" onClick={downloadTemplate} className="p-0">
// // //               <i className="fas fa-file-download me-2"></i> Download CSV Template
// // //             </Button>
// // //           </div>

// // //           <FormGroup>
// // //             <Label for="productFile">Select CSV File</Label>
// // //             <Input
// // //               type="file"
// // //               id="productFile"
// // //               accept=".csv"
// // //               onChange={handleFileChange}
// // //               disabled={isUploading}
// // //             />
// // //           </FormGroup>

// // //           {progress > 0 && (
// // //             <div className="my-3">
// // //               <div className="d-flex justify-content-between mb-1">
// // //                 <span>Upload Progress</span>
// // //                 <span>{progress}%</span>
// // //               </div>
// // //               <Progress value={progress} />
// // //             </div>
// // //           )}

// // //           {successMessage && (
// // //             <Alert color="success" className="mt-3">
// // //               {successMessage}
// // //             </Alert>
// // //           )}

// // //           {errors.length > 0 && (
// // //             <Alert color="danger" className="mt-3">
// // //               <ul className="mb-0 pl-3">
// // //                 {errors.map((error, index) => (
// // //                   <li key={index}>{error}</li>
// // //                 ))}
// // //               </ul>
// // //             </Alert>
// // //           )}

// // //           <div className="d-flex justify-content-end mt-4">
// // //             <Button
// // //               color="primary"
// // //               onClick={uploadBulkProducts}
// // //               disabled={!file || isUploading}
// // //             >
// // //               {isUploading ? (
// // //                 <>
// // //                   <Spinner size="sm" className="me-2" />
// // //                   Uploading...
// // //                 </>
// // //               ) : (
// // //                 'Upload Products'
// // //               )}
// // //             </Button>
// // //           </div>
// // //         </ModalBody>
// // //       </Modal>
// // //     </div>
// // //   );
// // // };

// // // export default BulkProductManagement;






// // 'use client';

// // import React, { useState } from 'react';
// // import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Alert, Spinner, Progress } from 'reactstrap';
// // import axios from 'axios';

// // const BulkProductManagement = ({ categories = [], brands = [], fetchProducts = () => {} }) => {
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [file, setFile] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const [errors, setErrors] = useState([]);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');

// //   const toggleModal = () => {
// //     setModalOpen(!modalOpen);
// //     setErrors([]);
// //     setSuccessMessage('');
// //     setFile(null);
// //     setProgress(0);
// //   };

// //   const handleFileChange = (e) => {
// //     const selectedFile = e.target.files[0];
// //     if (selectedFile && selectedFile.type !== 'text/csv') {
// //       setErrors(['Please upload a valid CSV file']);
// //       setFile(null);
// //       return;
// //     }
// //     setFile(selectedFile);
// //     setErrors([]);
// //     setSuccessMessage('');
// //   };

// //   const downloadTemplate = () => {
// //     const activeCategory = categories.find(c => c.is_active) || categories[0] || { id: 1 };
// //     const activeBrand = brands.find(b => b.is_active) || brands[0] || { id: 1 };

// //     const headers = ['name', 'slug', 'price', 'quantity', 'is_active', 'category_id', 'brand_id', 'image_path'];
// //     const sampleData = [
// //       {
// //         name: 'Premium Headphones',
// //         slug: 'premium-headphones',
// //         price: '199.99',
// //         quantity: '50',
// //         is_active: 'True',
// //         category_id: activeCategory.id,
// //         brand_id: activeBrand.id,
// //         image_path: 'uploads/products/headphones.jpg'
// //       },
// //       {
// //         name: 'Wireless Mouse',
// //         slug: 'wireless-mouse',
// //         price: '29.99',
// //         quantity: '100',
// //         is_active: 'True',
// //         category_id: activeCategory.id,
// //         brand_id: activeBrand.id,
// //         image_path: 'uploads/products/mouse.jpg'
// //       }
// //     ];

// //     let csvContent = headers.join(',') + '\n';
// //     sampleData.forEach(row => {
// //       csvContent += headers.map(header => `"${row[header]}"`).join(',') + '\n';
// //     });

// //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.setAttribute('href', url);
// //     link.setAttribute('download', 'bulk_products_template.csv');
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   const uploadBulkProducts = async () => {
// //     if (!file) {
// //       setErrors(['Please select a CSV file to upload']);
// //       return;
// //     }

// //     setIsUploading(true);
// //     setProgress(0);
// //     setErrors([]);
// //     setSuccessMessage('');

// //     const formData = new FormData();
// //     formData.append('file', file);

// //     try {
// //       const response = await axios.post('/api/products/bulk-upload', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //         onUploadProgress: (progressEvent) => {
// //           const percentCompleted = Math.round(
// //             (progressEvent.loaded * 100) / (progressEvent.total || 1)
// //           );
// //           setProgress(percentCompleted);
// //         },
// //       });

// //       if (response.data.errors && response.data.errors.length > 0) {
// //         setErrors(response.data.errors.map(err => `Row ${err.row}: ${err.error}`));
// //         setSuccessMessage(response.data.success_count > 0 
// //           ? `Successfully uploaded ${response.data.success_count} products (${response.data.errors.length} failed)`
// //           : '');
// //       } else {
// //         setSuccessMessage(`Successfully uploaded ${response.data.success_count} products`);
// //         fetchProducts();
// //         setTimeout(() => {
// //           toggleModal();
// //         }, 2000);
// //       }
// //     } catch (error) {
// //       let errorMessages = ['Upload failed. Please try again.'];
      
// //       if (error.response) {
// //         if (error.response.data.detail) {
// //           errorMessages = [error.response.data.detail];
// //         } else if (error.response.data.message) {
// //           errorMessages = [error.response.data.message];
// //         } else if (Array.isArray(error.response.data.errors)) {
// //           errorMessages = error.response.data.errors.map(err => `Row ${err.row}: ${err.error}`);
// //         }
// //       } else if (error.message) {
// //         errorMessages = [error.message];
// //       }
      
// //       setErrors(errorMessages);
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-4">
// //       <Button color="primary" onClick={toggleModal} className="mb-3">
// //         <i className="fas fa-upload me-2"></i> Bulk Upload Products
// //       </Button>

// //       <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" backdrop="static">
// //         <ModalHeader toggle={toggleModal}>Bulk Product Upload</ModalHeader>
// //         <ModalBody>
// //           <div className="mb-4">
// //             <Button color="link" onClick={downloadTemplate} className="p-0">
// //               <i className="fas fa-file-download me-2"></i> Download CSV Template
// //             </Button>
// //             <div className="mt-2 small text-muted">
// //               <p className="mb-1">Required columns: name, slug, price, quantity, is_active, category_id, brand_id</p>
// //               <p className="mb-0">Optional column: image_path</p>
// //             </div>
// //           </div>

// //           <FormGroup>
// //             <Label for="productFile">Select CSV File</Label>
// //             <Input
// //               type="file"
// //               id="productFile"
// //               accept=".csv"
// //               onChange={handleFileChange}
// //               disabled={isUploading}
// //             />
// //             {file && (
// //               <div className="small mt-2">
// //                 Selected file: <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)
// //               </div>
// //             )}
// //           </FormGroup>

// //           {progress > 0 && (
// //             <div className="my-3">
// //               <div className="d-flex justify-content-between mb-1">
// //                 <span>Upload Progress</span>
// //                 <span>{progress}%</span>
// //               </div>
// //               <Progress value={progress} />
// //             </div>
// //           )}

// //           {successMessage && (
// //             <Alert color="success" className="mt-3">
// //               <i className="fas fa-check-circle me-2"></i>
// //               {successMessage}
// //             </Alert>
// //           )}

// //           {errors.length > 0 && (
// //             <Alert color="danger" className="mt-3">
// //               <div className="d-flex align-items-center">
// //                 <i className="fas fa-exclamation-circle me-2"></i>
// //                 <strong>Upload Issues</strong>
// //               </div>
// //               <ul className="mb-0 mt-2 ps-3">
// //                 {errors.map((error, index) => (
// //                   <li key={index}>{error}</li>
// //                 ))}
// //               </ul>
// //             </Alert>
// //           )}

// //           <div className="d-flex justify-content-end mt-4 gap-2">
// //             <Button
// //               color="secondary"
// //               onClick={toggleModal}
// //               disabled={isUploading}
// //             >
// //               Cancel
// //             </Button>
// //             <Button
// //               color="primary"
// //               onClick={uploadBulkProducts}
// //               disabled={!file || isUploading}
// //             >
// //               {isUploading ? (
// //                 <>
// //                   <Spinner size="sm" className="me-2" />
// //                   Uploading...
// //                 </>
// //               ) : (
// //                 'Upload Products'
// //               )}
// //             </Button>
// //           </div>
// //         </ModalBody>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default BulkProductManagement;








// 'use client';
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input,
//   Alert, Spinner, Progress, Table, Badge, Card, CardBody, CardTitle,
//   Row, Col
// } from 'reactstrap';
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/v1',
//   timeout: 10000,
//   headers: {
//     'Accept': 'application/json'
//   }
// });

// const BulkProductManagement = () => {
//   // State management
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [bulkModalOpen, setBulkModalOpen] = useState(false);
//   const [bulkFile, setBulkFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [errors, setErrors] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   // Fetch initial data
//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       const [productsRes, categoriesRes] = await Promise.all([
//         api.get('/products'),
//         api.get('/categories')
//       ]);
//       setProducts(productsRes.data);
//       setCategories(categoriesRes.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setErrors(['Failed to load initial data. Please try again.']);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files?.[0];
    
//     if (!selectedFile) {
//       setErrors(['No file selected']);
//       setBulkFile(null);
//       return;
//     }

//     if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
//       setErrors(['Please upload a valid CSV file']);
//       setBulkFile(null);
//       return;
//     }

//     if (selectedFile.size > 5 * 1024 * 1024) {
//       setErrors(['File size exceeds 5MB limit']);
//       setBulkFile(null);
//       return;
//     }

//     setBulkFile(selectedFile);
//     setErrors([]);
//   };

//   // Download CSV template
//   const downloadTemplate = () => {
//     try {
//       const activeCategory = categories.find(c => c.is_active) || { id: 1, name: 'Electronics' };
//       const activeBrand = brands.find(b => b.is_active) || { id: 1, name: 'Brand' };

//       const headers = ['name', 'slug', 'price', 'quantity', 'is_active', 'category_id', 'brand_id', 'image_path'];
//       const sampleData = [
//         {
//           name: 'Samsung Galaxy S23',
//           slug: 'samsung-galaxy-s23',
//           price: '899.99',
//           quantity: '50',
//           is_active: 'True',
//           category_id: activeCategory.id,
//           brand_id: activeBrand.id,
//           image_path: 'uploads/products/phone.jpg'
//         }
//       ];

//       let csvContent = headers.join(',') + '\n';
//       sampleData.forEach(row => {
//         csvContent += headers.map(header => `"${row[header]}"`).join(',') + '\n';
//       });

//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'product_upload_template.csv';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       setErrors(['Failed to generate template. Please try again.']);
//       console.error('Template generation error:', error);
//     }
//   };

//   // Bulk upload products
//   const uploadBulkProducts = async () => {
//     if (!bulkFile) {
//       setErrors(['Please select a file to upload']);
//       return;
//     }

//     setIsUploading(true);
//     setUploadProgress(0);
//     setErrors([]);
//     setSuccessMessage('');

//     const formData = new FormData();
//     formData.append('file', bulkFile);

//     try {
//       const response = await api.post('/products/bulk-upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(percentCompleted);
//         }
//       });

//       if (response.data?.errors?.length > 0) {
//         const formattedErrors = response.data.errors.map(error => 
//           `Row ${error.row}: ${error.error}${error.data ? ` (${JSON.stringify(error.data)})` : ''}`
//         );
        
//         setErrors(formattedErrors);
        
//         if (response.data.success_count > 0) {
//           setSuccessMessage(`Successfully processed ${response.data.success_count} items (${response.data.errors.length} errors)`);
//           fetchData();
//         }
//       } else {
//         setSuccessMessage(`Successfully uploaded ${response.data.success_count} products`);
//         fetchData();
//         setTimeout(() => {
//           setBulkModalOpen(false);
//         }, 3000);
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
      
//       let errorMessage = 'Upload failed. Please try again.';
      
//       if (error.response) {
//         if (error.response.data?.detail) {
//           errorMessage = error.response.data.detail;
//         } else if (error.response.data?.message) {
//           errorMessage = error.response.data.message;
//         } else if (error.response.status === 413) {
//           errorMessage = 'File too large. Maximum size is 5MB.';
//         } else if (error.response.status === 400) {
//           errorMessage = error.response.data || 'Invalid file format';
//         } else if (error.response.status === 500) {
//           errorMessage = 'Server error. Please try again later.';
//         }
//       } else if (error.code === 'ECONNABORTED') {
//         errorMessage = 'Request timeout. Please try again.';
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       setErrors([errorMessage]);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // Edit product
//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//     setEditModalOpen(true);
//   };

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.put(`/products/${editingProduct.id}`, editingProduct);
//       setSuccessMessage('Product updated successfully');
//       fetchData();
//       setTimeout(() => {
//         setEditModalOpen(false);
//       }, 2000);
//     } catch (error) {
//       console.error('Update error:', error);
//       setErrors(['Failed to update product. Please try again.']);
//     }
//   };

//   // Delete product
//   const handleDeleteProduct = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await api.delete(`/products/${id}`);
//         setSuccessMessage('Product deleted successfully');
//         fetchData();
//       } catch (error) {
//         console.error('Delete error:', error);
//         setErrors(['Failed to delete product. Please try again.']);
//       }
//     }
//   };

//   return (
//     <div className="p-4">
//       <Card>
//         <CardBody>
//           <Row className="mb-4">
//             <Col>
//               <CardTitle tag="h5">Bulk Product Management</CardTitle>
//             </Col>
//             <Col className="text-end">
//               <Button color="primary" onClick={() => setBulkModalOpen(true)}>
//                 <i className="fas fa-upload me-2"></i> Bulk Upload
//               </Button>
//             </Col>
//           </Row>

//           {successMessage && (
//             <Alert color="success" className="mt-3">
//               <i className="fas fa-check-circle me-2"></i>
//               {successMessage}
//             </Alert>
//           )}

//           {errors.length > 0 && (
//             <Alert color="danger" className="mt-3">
//               <div className="d-flex align-items-center mb-2">
//                 <i className="fas fa-exclamation-circle me-2"></i>
//                 <strong>Error</strong>
//               </div>
//               <ul className="mb-0 ps-3">
//                 {errors.map((error, index) => (
//                   <li key={index}>{error}</li>
//                 ))}
//               </ul>
//             </Alert>
//           )}

//           {loading ? (
//             <div className="text-center py-5">
//               <Spinner color="primary" />
//               <p>Loading products...</p>
//             </div>
//           ) : (
//             <Table striped responsive>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Price</th>
//                   <th>Stock</th>
//                   <th>Category</th>
//                   <th>Brand</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map(product => (
//                   <tr key={product.id}>
//                     <td>{product.name}</td>
//                     <td>${product.price}</td>
//                     <td>{product.quantity}</td>
//                     <td>{product.category?.name || '-'}</td>
//                     <td>{product.brand?.name || '-'}</td>
//                     <td>
//                       <Badge color={product.is_active ? 'success' : 'secondary'}>
//                         {product.is_active ? 'Active' : 'Inactive'}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Button 
//                         color="info" 
//                         size="sm" 
//                         className="me-2"
//                         onClick={() => handleEditProduct(product)}
//                       >
//                         <i className="fas fa-edit"></i>
//                       </Button>
//                       <Button 
//                         color="danger" 
//                         size="sm"
//                         onClick={() => handleDeleteProduct(product.id)}
//                       >
//                         <i className="fas fa-trash"></i>
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </CardBody>
//       </Card>

//       {/* Bulk Upload Modal */}
//       <Modal isOpen={bulkModalOpen} toggle={() => setBulkModalOpen(false)} size="lg" backdrop="static">
//         <ModalHeader toggle={!isUploading ? () => setBulkModalOpen(false) : undefined}>
//           Bulk Product Upload
//         </ModalHeader>
//         <ModalBody>
//           <div className="mb-4">
//             <Button 
//               color="link" 
//               onClick={downloadTemplate} 
//               className="p-0"
//               disabled={isUploading}
//             >
//               <i className="fas fa-file-download me-2"></i> Download CSV Template
//             </Button>
//             <div className="mt-2 small text-muted">
//               <p className="mb-1"><strong>Required columns:</strong> name, slug, price, category_id, brand_id</p>
//               <p className="mb-1"><strong>Optional columns:</strong> quantity, is_active, image_path</p>
//               <p className="mb-0"><strong>Max file size:</strong> 5MB</p>
//             </div>
//           </div>

//           <FormGroup>
//             <Label for="productFile">Select CSV File</Label>
//             <Input
//               type="file"
//               id="productFile"
//               accept=".csv"
//               onChange={handleFileChange}
//               disabled={isUploading}
//             />
//             {bulkFile && (
//               <div className="small mt-2">
//                 Selected file: <strong>{bulkFile.name}</strong> ({(bulkFile.size / 1024 / 1024).toFixed(2)} MB)
//               </div>
//             )}
//           </FormGroup>

//           {uploadProgress > 0 && (
//             <div className="my-3">
//               <div className="d-flex justify-content-between mb-1">
//                 <span>Upload Progress</span>
//                 <span>{uploadProgress}%</span>
//               </div>
//               <Progress value={uploadProgress} />
//             </div>
//           )}

//           <div className="d-flex justify-content-end mt-4 gap-2">
//             <Button
//               color="secondary"
//               onClick={() => setBulkModalOpen(false)}
//               disabled={isUploading}
//             >
//               Cancel
//             </Button>
//             <Button
//               color="primary"
//               onClick={uploadBulkProducts}
//               disabled={!bulkFile || isUploading}
//             >
//               {isUploading ? (
//                 <>
//                   <Spinner size="sm" className="me-2" />
//                   Uploading...
//                 </>
//               ) : (
//                 <>
//                   <i className="fas fa-upload me-2"></i>
//                   Upload Products
//                 </>
//               )}
//             </Button>
//           </div>
//         </ModalBody>
//       </Modal>

//       {/* Edit Product Modal */}
//       <Modal isOpen={editModalOpen} toggle={() => setEditModalOpen(false)}>
//         <ModalHeader toggle={() => setEditModalOpen(false)}>
//           Edit Product
//         </ModalHeader>
//         <ModalBody>
//           {editingProduct && (
//             <form onSubmit={handleUpdateProduct}>
//               <FormGroup>
//                 <Label>Name</Label>
//                 <Input
//                   type="text"
//                   value={editingProduct.name}
//                   onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label>Price</Label>
//                 <Input
//                   type="number"
//                   step="0.01"
//                   value={editingProduct.price}
//                   onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label>Stock Quantity</Label>
//                 <Input
//                   type="number"
//                   value={editingProduct.quantity}
//                   onChange={(e) => setEditingProduct({...editingProduct, quantity: parseInt(e.target.value)})}
//                   required
//                 />
//               </FormGroup>
//               <FormGroup check>
//                 <Input
//                   type="checkbox"
//                   checked={editingProduct.is_active}
//                   onChange={(e) => setEditingProduct({...editingProduct, is_active: e.target.checked})}
//                   id="isActiveCheck"
//                 />
//                 <Label for="isActiveCheck" check>
//                   Active Product
//                 </Label>
//               </FormGroup>
//               <div className="d-flex justify-content-end mt-4 gap-2">
//                 <Button color="secondary" onClick={() => setEditModalOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button color="primary" type="submit">
//                   Save Changes
//                 </Button>
//               </div>
//             </form>
//           )}
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default BulkProductManagement;









'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input,
  Alert, Spinner, Progress, Table, Badge, Card, CardBody, CardTitle,
  Row, Col, Form, FormFeedback
} from 'reactstrap';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
});

const BulkProductManagement = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkFile, setBulkFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState({
    id: '',
    name: '',
    slug: '',
    description: '',
    price: '',
    quantity: '0',
    category_id: '',
    brand_id: '',
    is_active: true,
    image: null,
    image_url: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  // Fetch initial data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrors(['Failed to load initial data. Please try again.']);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle file selection for bulk upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) {
      setErrors(['No file selected']);
      setBulkFile(null);
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      setErrors(['Please upload a valid CSV file']);
      setBulkFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors(['File size exceeds 5MB limit']);
      setBulkFile(null);
      return;
    }

    setBulkFile(selectedFile);
    setErrors([]);
  };

  // Handle image change for edit form
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors(['Invalid image type. Please upload a JPEG, PNG, GIF, or WebP image.']);
      return;
    }

    // Validate image size
    if (file.size > 5 * 1024 * 1024) {
      setErrors(['Image too large. Maximum size is 5MB.']);
      return;
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setEditingProduct(prev => ({
      ...prev,
      image: file
    }));
  };

  // Download CSV template
  const downloadTemplate = () => {
    try {
      const activeCategory = categories.find(c => c.is_active) || { id: 1, name: 'Electronics' };
      const activeBrand = brands.find(b => b.is_active) || { id: 1, name: 'Brand' };

      const headers = ['name', 'slug', 'price', 'quantity', 'is_active', 'category_id', 'brand_id', 'image_path'];
      const sampleData = [
        {
          name: 'Samsung Galaxy S23',
          slug: 'samsung-galaxy-s23',
          price: '899.99',
          quantity: '50',
          is_active: 'True',
          category_id: activeCategory.id,
          brand_id: activeBrand.id,
          image_path: 'uploads/products/phone.jpg'
        }
      ];

      let csvContent = headers.join(',') + '\n';
      sampleData.forEach(row => {
        csvContent += headers.map(header => `"${row[header]}"`).join(',') + '\n';
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'product_upload_template.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setErrors(['Failed to generate template. Please try again.']);
      console.error('Template generation error:', error);
    }
  };

  // Bulk upload products
  const uploadBulkProducts = async () => {
    if (!bulkFile) {
      setErrors(['Please select a file to upload']);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setErrors([]);
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('file', bulkFile);

    try {
      const response = await api.post('/products/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      if (response.data?.errors?.length > 0) {
        const formattedErrors = response.data.errors.map(error => 
          `Row ${error.row}: ${error.error}${error.data ? ` (${JSON.stringify(error.data)})` : ''}`
        );
        
        setErrors(formattedErrors);
        
        if (response.data.success_count > 0) {
          setSuccessMessage(`Successfully processed ${response.data.success_count} items (${response.data.errors.length} errors)`);
          fetchData();
        }
      } else {
        setSuccessMessage(`Successfully uploaded ${response.data.success_count} products`);
        fetchData();
        setTimeout(() => {
          setBulkModalOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      let errorMessage = 'Upload failed. Please try again.';
      
      if (error.response) {
        if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 413) {
          errorMessage = 'File too large. Maximum size is 5MB.';
        } else if (error.response.status === 400) {
          errorMessage = error.response.data || 'Invalid file format';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors([errorMessage]);
    } finally {
      setIsUploading(false);
    }
  };

  // Edit product
  const handleEditProduct = (product) => {
    setEditingProduct({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      category_id: product.category?.id?.toString() || '',
      brand_id: product.brand?.id?.toString() || '',
      is_active: product.is_active,
      image: null,
      image_url: product.image_url || ''
    });
    setImagePreview(product.image_url ? `http://localhost:8000${product.image_url}` : '');
    setEditModalOpen(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      setErrors([]);
      setSuccessMessage('');
      
      const formData = new FormData();
      formData.append('name', editingProduct.name);
      formData.append('slug', editingProduct.slug);
      formData.append('description', editingProduct.description);
      formData.append('price', editingProduct.price);
      formData.append('quantity', editingProduct.quantity);
      formData.append('category_id', editingProduct.category_id);
      formData.append('brand_id', editingProduct.brand_id);
      formData.append('is_active', editingProduct.is_active);
      
      if (editingProduct.image) {
        formData.append('image', editingProduct.image);
      }

      const response = await api.put(`/products/${editingProduct.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMessage('Product updated successfully');
      fetchData(); // Refresh the product list
      setTimeout(() => {
        setEditModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Update error:', error);
      let errorMessage = 'Failed to update product. Please try again.';
      
      if (error.response) {
        if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.status === 422) {
          errorMessage = 'Validation error - please check your inputs';
        }
      }
      setErrors([errorMessage]);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        setSuccessMessage('Product deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Delete error:', error);
        setErrors(['Failed to delete product. Please try again.']);
      }
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardBody>
          <Row className="mb-4">
            <Col>
              <CardTitle tag="h5">Bulk Product Management</CardTitle>
            </Col>
            <Col className="text-end">
              <Button color="primary" onClick={() => setBulkModalOpen(true)}>
                <i className="fas fa-upload me-2"></i> Bulk Upload
              </Button>
            </Col>
          </Row>

          {successMessage && (
            <Alert color="success" className="mt-3">
              <i className="fas fa-check-circle me-2"></i>
              {successMessage}
            </Alert>
          )}

          {errors.length > 0 && (
            <Alert color="danger" className="mt-3">
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-exclamation-circle me-2"></i>
                <strong>Error</strong>
              </div>
              <ul className="mb-0 ps-3">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-5">
              <Spinner color="primary" />
              <p>Loading products...</p>
            </div>
          ) : (
            <Table striped responsive>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      {product.image_url ? (
                        <img 
                          src={`http://localhost:8000${product.image_url}`} 
                          alt={product.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                          }}
                        />
                      ) : (
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#f8f9fa' }}></div>
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category?.name || '-'}</td>
                    <td>{product.brand?.name || '-'}</td>
                    <td>
                      <Badge color={product.is_active ? 'success' : 'secondary'}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        color="info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEditProduct(product)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button 
                        color="danger" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Bulk Upload Modal */}
      <Modal isOpen={bulkModalOpen} toggle={() => !isUploading && setBulkModalOpen(false)} size="lg" backdrop="static">
        <ModalHeader toggle={!isUploading ? () => setBulkModalOpen(false) : undefined}>
          Bulk Product Upload
        </ModalHeader>
        <ModalBody>
          <div className="mb-4">
            <Button 
              color="link" 
              onClick={downloadTemplate} 
              className="p-0"
              disabled={isUploading}
            >
              <i className="fas fa-file-download me-2"></i> Download CSV Template
            </Button>
            <div className="mt-2 small text-muted">
              <p className="mb-1"><strong>Required columns:</strong> name, slug, price, category_id, brand_id</p>
              <p className="mb-1"><strong>Optional columns:</strong> quantity, is_active, image_path</p>
              <p className="mb-0"><strong>Max file size:</strong> 5MB</p>
            </div>
          </div>

          <FormGroup>
            <Label for="productFile">Select CSV File</Label>
            <Input
              type="file"
              id="productFile"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {bulkFile && (
              <div className="small mt-2">
                Selected file: <strong>{bulkFile.name}</strong> ({(bulkFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </FormGroup>

          {uploadProgress > 0 && (
            <div className="my-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Upload Progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <div className="d-flex justify-content-end mt-4 gap-2">
            <Button
              color="secondary"
              onClick={() => setBulkModalOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={uploadBulkProducts}
              disabled={!bulkFile || isUploading}
            >
              {isUploading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-upload me-2"></i>
                  Upload Products
                </>
              )}
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={editModalOpen} toggle={() => setEditModalOpen(false)}>
        <ModalHeader toggle={() => setEditModalOpen(false)}>
          Edit Product
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleUpdateProduct}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                step="0.01"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                value={editingProduct.quantity}
                onChange={(e) => setEditingProduct({...editingProduct, quantity: e.target.value})}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Product Image</Label>
              <Input
                type="file"
                onChange={handleImageChange}
                accept="image/jpeg, image/png, image/gif, image/webp"
              />
              {(imagePreview || editingProduct.image_url) && (
                <div className="mt-2">
                  <img 
                    src={imagePreview || editingProduct.image_url} 
                    alt="Product preview" 
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      objectFit: 'cover',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              )}
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                checked={editingProduct.is_active}
                onChange={(e) => setEditingProduct({...editingProduct, is_active: e.target.checked})}
                id="isActiveCheck"
              />
              <Label for="isActiveCheck" check>
                Active Product
              </Label>
            </FormGroup>
            <div className="d-flex justify-content-end mt-4 gap-2">
              <Button color="secondary" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BulkProductManagement;