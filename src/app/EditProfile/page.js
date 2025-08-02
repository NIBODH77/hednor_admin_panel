'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

const EditProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    // Simulated API call
    const fetchProfile = () => {
      const mockData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        bio: 'Web developer with a passion for React.',
      };
      setFormData(mockData);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
    alert('Profile updated successfully!');
    router.push('/account'); // Redirect back to My Account
  };

  const handleCancel = () => {
    router.push('/account');
  };

  return (
    <Container className="mt-5">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="bio">Bio</Label>
          <Input
            id="bio"
            name="bio"
            type="textarea"
            value={formData.bio}
            onChange={handleChange}
          />
        </FormGroup>
        <div className="d-flex gap-2">
          <Button type="submit" color="primary">
            Save Changes
          </Button>
          <Button type="button" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditProfile;
