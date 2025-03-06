export default function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white p-8 rounded-lg shadow-md w-[700px]">
        
        {/* Left Side - Javi2 Image */}
        <div className="w-1/2 flex justify-center items-center">
          <img
            src="/images/Javi2.jpg"
            alt="Javi2"
            className="w-48"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Buttons */}
          <div className="flex gap-2">
            <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
              Sign In
            </button>
            <button className="w-full border py-2 rounded-md hover:bg-gray-100">
              Register
            </button>
          </div>

          {/* Forgot Password */}
          <p className="text-sm text-blue-600 text-center mt-3 cursor-pointer hover:underline">
            Forgot password?
          </p>

          {/* Social Login */}
          <div className="flex justify-center gap-4 mt-4">
            <img src="/images/google.png" alt="Google" className="w-8 h-8 cursor-pointer" />
            <img src="/images/facebook.png" alt="Facebook" className="w-8 h-8 cursor-pointer" />
          </div>
        </div>

      </div>
    </div>
  );
}
