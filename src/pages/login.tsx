import {
  Form,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";
  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get("email") != null;
  const actionData = useActionData() as { error: string } | undefined;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xs rounded-lg bg-blue-100 p-6 shadow-lg">
        <h2 className="flex items-center justify-center text-lg text-black font-medium">
          Login
        </h2>
        <Form method="post" replace className="space-y-4">
          <input type="hidden" name="redirectTo" value={from} />
          <label className="block text-sm font-medium">
            Email:{" "}
            <input
              name="email"
              className="input input-bordered mb-3 mt-2 w-full text-black "
            />
            Password:{" "}
            <input
              type="password"
              name="password"
              className="input input-bordered mb-3 mt-2 w-full text-black "
            />
          </label>{" "}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="btn btn-primary mt-6 w-full border-blue-900 bg-blue-700 text-white hover:bg-blue-600"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
          {actionData && actionData.error ? (
            <p className="mt-4 text-center text-black">{actionData.error}</p>
          ) : null}
        </Form>
      </div>
    </div>
  );
};

export default Login;
