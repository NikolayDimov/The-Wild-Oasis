import React, { ReactNode, useEffect } from "react";
import { UserState, useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    // 1. Load the authenticated user
    const { isLoading, isAuthenticated }: UserState = useUser();

    // 3. If there is NO authenticated user, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);

    // 2. While loading, Show a spinner
    if (isLoading) {
        return (
            <FullPage>
                <Spinner />;
            </FullPage>
        );
    }

    // 4. If there IS a user, render the app
    if (isAuthenticated) {
        return children;
    }
};

export default ProtectedRoute;
