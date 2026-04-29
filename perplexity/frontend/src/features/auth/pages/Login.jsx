import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
export default function LoginForm() {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.loading);

  // login
  const { handleLogin } = useAuth();
  // navigate
  const navigate = useNavigate();
  // form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // user data from store
  const error = useSelector((state) => state.error);
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    await handleLogin(payload);
    if (error) return;
    navigate("/");
  };
  // geeting data
  if (!loading && user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="bg-gray-50 px-4 md:px-8 dark:bg-neutral-900">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-8 dark:bg-neutral-800 dark:border-neutral-700">
            <h1 className="text-slate-900 text-center text-3xl font-bold dark:text-slate-50">
              Sign in
            </h1>

            <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@readymadeui.com"
                  required
                  className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                />
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2">
                <div className="flex items-start flex-wrap gap-2">
                  <label className="flex items-center group has-[input:checked]:text-slate-900">
                    <input
                      onChange={handleChange}
                      id="tmc"
                      name="tmc"
                      type="checkbox"
                      required
                      className="sr-only"
                    />
                    {/* Custom box */}
                    <span
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-600
                              bg-white dark:bg-neutral-700
                              group-has-[input:checked]:bg-blue-600
                              group-has-[input:checked]:outline-blue-600
                              group-focus-within:outline-2
                              group-focus-within:outline-blue-600"
                      aria-hidden="true"
                    >
                      {/* Checkmark */}
                      <svg
                        className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
                        viewBox="0 0 12 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 5l3 3 7-7" />
                      </svg>
                    </span>
                    <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                      I accept the
                    </span>
                  </label>

                  <a
                    href="#"
                    className="ml-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    Terms and Conditions
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded-md"
              >
                Sign in
              </button>

              <div className="mt-6 text-slate-900 text-sm text-center dark:text-slate-50">
                Don't have an account?
                <Link to="/register" className="text-blue-600 ml-1">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
