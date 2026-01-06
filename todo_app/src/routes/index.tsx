import { Navigate, type RouteObject } from 'react-router-dom';
import { TodoContainer } from '../components/TodoContainer';

export const getRoutes = (todoProps: React.ComponentProps<typeof TodoContainer>): RouteObject[] => [
    {
        path: '/',
        element: <Navigate to="/all" replace />,
    },
    {
        path: '/:filter',
        element: <TodoContainer {...todoProps} />,
    }
];