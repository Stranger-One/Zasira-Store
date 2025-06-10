import { useSelector } from "react-redux";
import AddressForm from "../components/AddressForm";
import { LogoutBtn } from "../components";

const MyAccount = () => {
  const userDate = useSelector((state) => state.auth.userData);

  const profileImage =
    userDate?.avatar ||
    "https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png";

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 p-10">
      <div className=" flex flex-col justify-between p-6 bg-white shadow-md rounded-md ">
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">My Account</h2>
          <div className="flex mt-6">
            {/* Profile Image */}
            <div className="w-24 h-24 border-2 border-blue-600 rounded-full flex-shrink-0 overflow-hidden">
              <img src={profileImage} alt="" />
            </div>

            <div className="ml-6 w-full">
              {/* User id */}
              <div className="mb-4">
                <label className="text-sm font-semibold">User Id</label>
                <input
                  value={userDate?.id || ""}
                  disabled
                  type="text"
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="text-sm font-semibold">Name</label>
                <input
                  type="text"
                  value={userDate?.name || ""}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="text-sm font-semibold">Email</label>
                <input
                  value={userDate?.email || ""}
                  disabled
                  type="email"
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <LogoutBtn className={'hover:bg-slate-300 px-4 py-2 rounded-md cursor-pointer duration-150'}/>
        </div>
      </div>
      <AddressForm />
    </div>
  );
};

export default MyAccount;
