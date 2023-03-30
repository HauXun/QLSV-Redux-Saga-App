import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    // <Routes>
    //   <Route path="login" element={<LoginPage />} />
    //   <Route path="admin" element={<PrivateRoute />}>
    //     <Route element={<AdminLayout />}>
    //       <Route path="dashboard" element={<Dashboard />} />
    //       <Route path="students" element={<StudentFeature />}>
    //         <Route index element={<ListPage />} />
    //         <Route path={'add'} element={<AddEditPage />} />
    //         <Route path={':studentId'} element={<AddEditPage />} />
    //       </Route>
    //     </Route>
    //   </Route>
    //   <Route path="*" element={<NotFound />} />
    // </Routes>
    <Outlet />
  );
}

export default App;
