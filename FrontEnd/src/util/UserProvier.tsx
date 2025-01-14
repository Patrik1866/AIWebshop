// UserProvider.tsx
import { UserProvider } from './UserContext';

const UserProviderComponent = ({ children }: any) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
};

export default UserProviderComponent;