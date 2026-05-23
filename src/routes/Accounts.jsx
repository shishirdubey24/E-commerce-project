import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { account } from "../components/AUTH/lib/appwrite";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth || {});
  const user = authState.user || authState;
  const isAuthenticated = !!(user && (user.id || user.$id || user.email));

  const handleLogout = useCallback(async () => {
    try {
      await account.deleteSession("current");
    } catch (err) {
      console.error("Logout error:", err);
    }
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <main className="bg-[#f5f5f6] min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-[1100px] mx-auto space-y-4">
        {/* PAGE HEADER */}
        <header className="flex flex-col gap-1 pb-4">
          <h1 className="text-xl font-bold text-[#282c3f]">Account</h1>
          <p className="text-[13px] text-[#282c3f]">
            {isAuthenticated ? user.name || user.email : "Manage your profile, orders, wishlist and more"}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="bg-white border border-[#eaeaec] rounded-sm shadow-sm">
            {/* User header */}
            <div className="px-5 py-5 border-b border-[#eaeaec] flex items-center gap-4">
              <div className="h-10 w-10 overflow-hidden bg-gray-100 flex items-center justify-center">
                 <img src="https://constant.myntassets.com/checkout/assets/img/additional-profile-icon.webp" alt="profile" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-[#696e79] font-semibold">Welcome</p>
                {isAuthenticated ? (
                  <p className="text-sm font-bold text-[#282c3f] truncate">
                    {user.name || user.email || "User"}
                  </p>
                ) : (
                  <p className="text-[13px] font-bold text-[#282c3f]">
                    Sign in to access
                  </p>
                )}
              </div>
            </div>

            {/* Menu sections */}
            <div className="py-2 text-[13px] font-medium text-[#696e79]">
              <section className="py-2">
                <ul className="flex flex-col">
                  {/* Active item uses #ff3f6c or darker gray and bold */}
                  <li className="flex items-center justify-between cursor-pointer px-5 py-2.5 text-[#ff3f6c] font-bold border-l-4 border-[#ff3f6c] bg-[#fff3f6]/50">
                    <span>Account Overview</span>
                  </li>
                </ul>
              </section>

              <hr className="border-[#eaeaec] mx-5 my-1" />

              <section className="py-2">
                <ul className="flex flex-col space-y-0 text-[#696e79]">
                  <li className="flex items-center gap-3 px-5 py-2.5 hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer border-l-4 border-transparent hover:border-[#ff3f6c]">
                    Orders & Returns
                  </li>
                </ul>
              </section>

              <hr className="border-[#eaeaec] mx-5 my-1" />

              <section className="py-2">
                <ul className="flex flex-col space-y-0 text-[#696e79]">
                  <li className="flex items-center gap-3 px-5 py-2.5 hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer border-l-4 border-transparent hover:border-[#ff3f6c]">
                    Profile
                  </li>
                  <li className="flex items-center gap-3 px-5 py-2.5 hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer border-l-4 border-transparent hover:border-[#ff3f6c]">
                    Saved Addresses
                  </li>
                  <li className="flex items-center gap-3 px-5 py-2.5 hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer border-l-4 border-transparent hover:border-[#ff3f6c]">
                    Payments
                  </li>
                </ul>
              </section>

              <hr className="border-[#eaeaec] mx-5 my-1" />

              <section className="py-2">
                <ul className="flex flex-col space-y-0 text-[#696e79]">
                  <li className="flex items-center gap-3 px-5 py-2.5 hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer border-l-4 border-transparent hover:border-[#ff3f6c]">
                    Wishlist
                  </li>
                  <li className="flex items-center gap-3 px-5 py-2.5 hover:text-[#ff3f6c] hover:font-bold transition-colors cursor-pointer border-l-4 border-transparent hover:border-[#ff3f6c]">
                    Help & Support
                  </li>
                </ul>
              </section>

              {isAuthenticated && (
                <>
                  <hr className="border-[#eaeaec] mx-5 my-1" />
                  <div className="px-5 py-3">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#eaeaec] px-4 py-2 text-[12px] font-bold text-[#ff3f6c] hover:border-[#ff3f6c] transition w-full"
                    >
                      <logOut size={14} />
                      <span>LOG OUT</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="space-y-4">
            {/* CARD: Auth / overview */}
            <div className="bg-white border border-[#eaeaec] rounded-sm shadow-sm p-6 sm:px-8 sm:py-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#fffbfa] to-[#ffebf0] rounded-bl-full opacity-50 z-0"></div>
              
              <div className="relative z-10">
                {isAuthenticated ? (
                  <>
                    {/* Profile summary */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-[18px] sm:text-[20px] font-bold text-[#282c3f]">
                          Account Details
                        </h2>
                        <p className="text-[13px] text-[#696e79] mt-1">
                          Manage your profile, orders, and saved items.
                        </p>
                      </div>
                      <div className="border border-[#eaeaec] rounded-sm px-4 py-3 bg-[#f5f5f6]">
                        <p className="text-[11px] text-[#696e79] uppercase font-semibold mb-1">Logged in as</p>
                        <p className="text-[14px] font-bold text-[#282c3f]">
                          {user.name || "Myntra Shopper"}
                        </p>
                        {user.email && (
                          <p className="text-[13px] text-[#696e79] mt-0.5">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-[#eaeaec] hover:border-[#ff3f6c] transition-colors rounded-sm p-5 cursor-pointer flex flex-col justify-between group">
                        <div>
                          <p className="font-bold text-[#282c3f] mb-1">
                            Orders & Returns
                          </p>
                          <p className="text-[13px] text-[#696e79] mb-4">
                            Track your orders, manage returns, or reorder your
                            favourites.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-[#ff3f6c] font-bold text-[12px] text-left group-hover:text-[#ff1654]"
                        >
                          VIEW ORDERS
                        </button>
                      </div>

                      <div className="border border-[#eaeaec] hover:border-[#ff3f6c] transition-colors rounded-sm p-5 cursor-pointer flex flex-col justify-between group">
                        <div>
                          <p className="font-bold text-[#282c3f] mb-1">
                            Wishlist
                          </p>
                          <p className="text-[13px] text-[#696e79] mb-4">
                            See all the products you&apos;ve saved for later.
                          </p>
                        </div>
                        <Link
                          to="/admin" // placeholder route for now
                          className="text-[#ff3f6c] font-bold text-[12px] text-left group-hover:text-[#ff1654]"
                        >
                          VIEW WISHLIST
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-[18px] sm:text-[20px] font-bold text-[#282c3f] mb-2">
                      Welcome to Myntra
                    </h2>
                    <p className="text-[13px] text-[#696e79] mb-6 border-b border-[#eaeaec] pb-6">
                      Login or Sign up to access your orders, wishlist, and personalized
                      recommendations.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="border border-[#eaeaec] hover:border-[#ff3f6c]/30 transition-all rounded-sm p-6 flex flex-col justify-between">
                        <div>
                          <p className="text-[14px] font-bold text-[#282c3f] mb-2">
                            Existing User
                          </p>
                          <p className="text-[13px] text-[#696e79] mb-4">
                            Login to view your profile, track orders and more.
                          </p>
                        </div>
                        <Link
                          to="/User/login"
                          className="inline-flex items-center justify-center w-full bg-[#ff3f6c] hover:bg-[#ff1654] text-white text-[13px] font-bold py-3 px-4 rounded-sm uppercase tracking-wide transition-colors"
                        >
                          Login
                        </Link>
                      </div>

                      <div className="border border-[#eaeaec] hover:border-[#ff3f6c]/30 transition-all rounded-sm p-6 flex flex-col justify-between">
                        <div>
                          <p className="text-[14px] font-bold text-[#282c3f] mb-2">
                            New to Myntra?
                          </p>
                          <p className="text-[13px] text-[#696e79] mb-4">
                            Create your account to save addresses, wishlist items
                            and more.
                          </p>
                        </div>
                        <Link
                          to="/User/SignUp"
                          className="inline-flex items-center justify-center w-full bg-white border border-[#ff3f6c] text-[#ff3f6c] hover:bg-[#ff3f6c]/5 hover:text-[#ff1654] text-[13px] font-bold py-3 px-4 rounded-sm uppercase tracking-wide transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* CARD: Help / support */}
            <div className="bg-white border border-[#eaeaec] rounded-sm shadow-sm p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div>
                  <h2 className="text-[14px] font-bold text-[#282c3f] mb-1">
                    Need help with something?
                  </h2>
                  <p className="text-[13px] text-[#696e79]">
                    For order related queries, returns, or account assistance,
                    you can refer to our Help Center.
                  </p>
                </div>
                <button
                  type="button"
                  className="whitespace-nowrap rounded-sm border border-[#eaeaec] bg-white px-5 py-2.5 text-[12px] font-bold text-[#282c3f] hover:border-[#282c3f] transition-colors"
                >
                  GO TO HELP CENTER
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Account;
