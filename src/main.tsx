import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import ReduxProviderWrapper from "./redux/readux-provider/reduxProviderWrapper.tsx";
import { DashboardToaster } from "./components/ui/Toaster.tsx";

import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./providers/SocketProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ReduxProviderWrapper>
        <SocketProvider>
          <RouterProvider router={routes} />
          <DashboardToaster />
          <Toaster position="top-right" />
        </SocketProvider>
      </ReduxProviderWrapper>
    </Provider>
  </StrictMode>,
);

