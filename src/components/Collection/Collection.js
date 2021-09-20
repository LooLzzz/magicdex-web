import { Redirect } from "react-router";

const Collection = (props) => {
  if (localStorage.getItem('access-token') === null)
    return <Redirect to="login" />;
  return <div>test</div>;
};

export default Collection;
