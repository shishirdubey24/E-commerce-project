import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signupSchema } from "./SignupValiadtion";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(signupSchema),
  });

  const handleRegister = async (data) => {
    console.log(data);

    // API call here
  };

  return (
    <div className="min-h-screen flex justify-center bg-[#f5f5f6] px-4">
      <div className="mt-16 w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">

        {/* Header */}

        <div className="bg-[#fff3f6] border-b border-gray-200 px-6 py-3">
          <p className="text-sm font-semibold text-gray-800">
            JOIN & GET EXCLUSIVE OFFERS
          </p>

          <p className="text-[11px] text-gray-600">
            Get updates on latest trends, offers and more.
          </p>
        </div>

        {/* Body */}

        <div className="px-6 py-6">

          {/* Logo */}

          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-lg">
              M
            </div>

            <span className="text-lg font-semibold tracking-wide text-gray-900">
              Myntra
            </span>
          </div>

          {/* Title */}

          <h1 className="text-base font-semibold text-gray-900 mb-1">
            Register
          </h1>

          <p className="text-xs text-gray-600 mb-4">
            Create your Myntra account to shop faster and track your orders.
          </p>

          {/* Form */}

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-4"
          >

            {/* Username */}

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Full name
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                placeholder="John Doe"
                {...register("username")}
              />

              {errors.username && (
                <p className="text-red-500 text-[11px] mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Phone */}

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Phone
              </label>

              <input
                type="tel"
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                placeholder="9876543210"
                {...register("phone")}
              />

              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Email address
              </label>

              <input
                type="email"
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                placeholder="you@example.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-[11px] mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Password
              </label>

              <input
                type="password"
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-gray-600"
                placeholder="Create a password"
                {...register("password")}
              />

              <p className="mt-1 text-[11px] text-gray-500">
                Minimum 8 characters.
              </p>

              {errors.password && (
                <p className="text-red-500 text-[11px] mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#ff3f6c] hover:bg-[#ff1654] text-white text-sm font-semibold py-3 rounded-sm uppercase tracking-wide disabled:opacity-60"
            >
              {isSubmitting
                ? "Creating account..."
                : "Create account"}
            </button>

          </form>

          {/* Footer */}

          <div className="mt-4 text-[11px] text-gray-600">
            <p>
              Already have an account?{" "}

              <Link
                to="/User/login"
                className="text-pink-500 font-semibold hover:text-pink-600"
              >
                Login
              </Link>

            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;