import { AuthWrapper } from "../components";
const Protected = () => {
  return (
    <AuthWrapper>
      <div>
        <h1>Protected Data here</h1>
      </div>
    </AuthWrapper>
  );
};

export default Protected;
