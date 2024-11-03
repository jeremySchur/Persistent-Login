import Register from './Register'
import Login from './Login'
import Home from './Home';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />

        {/* Private Routes */}
        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth />}>
              <Route path='/' element={<Home />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
