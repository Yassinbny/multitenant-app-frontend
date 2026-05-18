import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "../components/layout/AppLayout";
import { ErrorPage } from "../routes/ErrorPage";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { RoleRoute } from "../routes/RoleRoute";
import { DashboardPage } from "../features/dashboard/DashboardPage/DashboardPage";
import { LoginPage } from "../features/auth/Login/LoginPage";
import { TenantsPage } from "../features/tenants/listTenants/TenantsPage";
import { UsersPage } from "../features/users/listUsers/UsersPage";
import { SubmissionsPage } from "../features/submissions/listSubmissions/SubmissionsPage";
import { CreateSubmissionPage } from "../features/submissions/createSubmission/CreateSubmissionPage";
import { SubmissionDetailPage } from "../features/submissions/submissionDetail/SubmissionDetailPage";
import { SceneEditorPage } from "../features/scene/sceneEditor/SceneEditorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: "dashboard",
                element: <DashboardPage />,
              },
              {
                element: <RoleRoute allowedRoles={["SUPER_ADMIN"]} />,
                children: [
                  {
                    path: "tenants",
                    element: <TenantsPage />,
                  },
                ],
              },
              {
                element: <RoleRoute allowedRoles={["ADMIN"]} />,
                children: [
                  {
                    path: "users",
                    element: <UsersPage />,
                  },
                ],
              },
              {
                element: <RoleRoute allowedRoles={["ADMIN", "USER"]} />,
                children: [
                  {
                    path: "submissions",
                    element: <SubmissionsPage />,
                  },
                  {
                    path: "submissions/new",
                    element: <CreateSubmissionPage />,
                  },
                  {
                    path: "submissions/:id",
                    element: <SubmissionDetailPage />,
                  },
                  {
                    path: "submissions/:id/scene",
                    element: <SceneEditorPage />,
                  },
                  {
                    path: "scene",
                    element: <SceneEditorPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
