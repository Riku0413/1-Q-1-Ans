import { Outlet } from "react-router-dom";

const Child = () => {
  return (
    <div>
      <h2>Child</h2>
      <Outlet />
    </div>
  );
};

export default Child;
