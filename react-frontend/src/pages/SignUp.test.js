import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {  createMemoryRouter, RouterProvider, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import AuthUser from '../components/AuthUser';

jest.mock('../components/AuthUser', () => {

    const mockHttp = {
        post: jest.fn()
        };
    return {
        __esModule: true,
        default: () => ({
            http: mockHttp
        }),
    };
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe('SignUp Component', () => {
    //Test 1: Check If Page Renders properly.

    test('renders login form with email and password inputs', () => {
        const routes = [
          {
            path: '/SignUp',
            element: <SignUp />
          }
        ];
        
        const router = createMemoryRouter(routes, {
          initialEntries: ['/SignUp'],
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
        
        expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText(/repeat your password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
      });

  // Test 2: Shows error on invalid inputs
    test("displays error messages for invalid inputs", async () => {
        const routes = [
        {
            path: "/Signup",
            element: <SignUp />,
        },
        ];
        const router = createMemoryRouter(routes, {
        initialEntries: ["/Signup"],
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

        const nameInput = screen.getByLabelText(/your name/i);
        const emailInput = screen.getByLabelText(/your email/i);
        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText(/repeat your password/i);
        const submitButton = screen.getByRole("button", { name: /register/i });

        fireEvent.change(nameInput, { target: { value: "" } });
        fireEvent.change(emailInput, { target: { value: "invalid-email" } });
        fireEvent.change(passwordInput, { target: { value: "123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "1234" } });
        fireEvent.click(submitButton);

        // As All the fields are not filled check if error of Please fill all fields occur.
        await waitFor(() => {
            expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
        });
    });

    // Test 3: Successful signup
    test("submits form and navigates to SignIn on successful signup", async () => {
        const mockPost = jest.fn().mockResolvedValue({
            data: {
                message: "successful",
                status: 202
            },
        });

        const mockNavigate = jest.fn();
        AuthUser().http.post = mockPost;

        useNavigate.mockReturnValue(mockNavigate);


        const routes = [
            {
                path: "/Signup",
                element: <SignUp />,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ["/Signup"],
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

        const nameInput = screen.getByLabelText(/your name/i);
        const emailInput = screen.getByLabelText(/your email/i);
        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText(/repeat your password/i);
        const submitButton = screen.getByRole("button", { name: /register/i });

        fireEvent.change(nameInput, { target: { value: "Test User" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockPost).toHaveBeenCalledWith("/register", {
                name: "Test User",
                email: "test@example.com",
                password: "password123",
            });
        });

        //Navigates to SignIn Page.
        expect(mockNavigate).toHaveBeenCalledWith("/Signin");
    });

});