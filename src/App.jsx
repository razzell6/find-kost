import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';
import { AuthProvider } from './context/AuthContext'; // Memanggil penampung status login

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;