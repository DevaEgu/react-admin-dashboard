import  {useEffect} from 'react';

import useAuthStore from './store/authStore';
import AppRoutes from './routes/AppRoutes';

export const App = () => {
  
  const { fetchUser, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUser();
    }

  }, [token, fetchUser]);

  return (
    <div className="App">
        <AppRoutes />
    </div>
  );
}

