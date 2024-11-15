import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="bg-[url('./images/log-bg.png')] bg-no-repeat flex items-center  bg-center ">
      <div className="h-1/2 w-[40rem]">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
