import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { LogIn, Denied, Vendors, SignUp, Billing, PickUp, ViewUser, TableDemo } from './pages';
import MainLayout from './layout/mainlayout';

import PrivateRoute from './Routing/privateRoute';


function App() {


  return (
    <>
      <HashRouter hashType="noslash">
        <Routes>
          <Route index path={'/'} element={<LogIn />} />
          <Route
            path={'/vendors'}
            element={
              <PrivateRoute>
                <MainLayout >
                  <Vendors />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path={'/signup'}
            element={
              <PrivateRoute>
                <MainLayout>
                  <SignUp />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path={'/billing'}
            element={
              <PrivateRoute>
                <MainLayout>
                  <Billing />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path={'/pickup'}
            element={
              <PrivateRoute>
                <MainLayout>
                  <PickUp />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path={'/viewuser'}
            element={
              <PrivateRoute>
                <MainLayout>
                  <ViewUser />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path={'/table'}
            element={
              <PrivateRoute>
                <MainLayout>
                  <TableDemo />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route exact={true} path="/404" element={<MainLayout> <Denied /></MainLayout>} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
