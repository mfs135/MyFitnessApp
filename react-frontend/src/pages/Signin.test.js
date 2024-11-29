import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {  createMemoryRouter, RouterProvider } from 'react-router-dom';
import SignIn from './Signin';
import AuthUser from '../components/AuthUser';

// Mock dependencies
jest.mock('../components/AuthUser', () => {

    const mockHttp = {
        post: jest.fn() // Mock the post method
        };
    return {
        __esModule: true,
        default: () => ({
            http: mockHttp,
            settoken: jest.fn()
        }),
    };
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(() => jest.fn()), // Mock navigation
  }));
  

describe('SignIn Component', () => {
  // Test 1: Renders SignIn form correctly
  test('renders login form with email and password inputs', () => {
    const routes = [
      {
        path: '/Signin',
        element: <SignIn />
      }
    ];
    
    const router = createMemoryRouter(routes, {
      initialEntries: ['/Signin'],
      initialIndex: 0,
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }
    });
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  // Test 2: Form validation prevents submission with invalid inputs
  test('prevents form submission with invalid email and short password', async () => {

    const routes = [
      {
        path: '/Signin',
        element: <SignIn />
      }
    ];
    
    const router = createMemoryRouter(routes, {
      initialEntries: ['/Signin'],
      initialIndex: 0,
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }
    });

    render(<RouterProvider router={router} />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  // Test 3: Successful login submission
  test('submits form and navigates to dashboard on successful login', async () => {
    const mockPost = jest.fn().mockResolvedValue({
      data: {
        status: 'success',
        access_token: 'fake_token',
        token_type: 'bearer',
        user: {
            created_at: "2024-11-28T16:30:10.000000Z",
            email: "qasim.sajjad12378@gmail.com",
            email_verified_at: null,
            id: 11,
            name: "qasim",
            updated_at: "2024-11-28T16:30:10.000000Z"
        }
      }
    });
    
    const mockSetToken = jest.fn();

    AuthUser().http.post = mockPost;
    AuthUser().settoken = mockSetToken;

    const routes = [
      {
        path: '/Signin',
        element: <SignIn />
      }
    ];
    
    const router = createMemoryRouter(routes, {
      initialEntries: ['/Signin'],
      initialIndex: 0,
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }
    });

    render(<RouterProvider router={router} />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'qasim.sajjad12378@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/login', {
        email: 'qasim.sajjad12378@gmail.com',
        password: '123456'
      });
    });
  });
});