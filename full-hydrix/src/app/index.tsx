import "./index.scss"
import './index.css'

import { configure } from 'mobx';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './routers/app-router';
import { AuthProvider } from "@/entities/user/context";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


configure({ enforceActions: 'never', });

export function Index() {
  return (
    <>
      <AuthProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
          <ToastContainer position='bottom-right' />
          <RouterProvider router={AppRouter} />
        </LocalizationProvider>

      </AuthProvider>
    </>
  );
}

export default Index;