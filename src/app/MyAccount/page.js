'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from 'reactstrap';

const MyAccount = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Simulated fetch (replace with real API call)
    const fetchUserData = () => {
      const mockUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
      };
      setUserData(mockUser);
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving user data:', userData);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <Container className="mt-5">
      <h2>My Account</h2>
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </FormGroup>
        <div className="d-flex gap-2">
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default MyAccount;
