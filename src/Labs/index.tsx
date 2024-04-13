import Nav from "../Nav";
import Assignment3 from "./a3";
import Assignment4 from "./a4";
import Assignment5 from "./a5";
import store from "./store";
import { Provider } from "react-redux";
import { Routes, Route, Navigate }
  from "react-router";
function Labs() {
  return (
    <div>
      <Nav />

      <Provider store={store}>
        <div className="container-fluid">
          <h1>Labs</h1>
          <Routes>
            <Route path="/"
              element={<Navigate
                to="a3" />} />
            <Route path="a3"
              element={<Assignment3 />} />
            <Route path="a4"
              element={<Assignment4 />} />
            <Route path="a5"
              element={<Assignment5 />} />
          </Routes>
        </div>
      </Provider>
    </div>
  );
}
export default Labs;