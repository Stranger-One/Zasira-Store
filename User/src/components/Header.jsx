import { FaSearch, FaShoppingCart, FaUser, FaHeadphones } from "react-icons/fa";
import { Menu, MenuItem, Button } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import {
  PersonOutlineOutlined,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Products from "../assets/Products";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!search) setSearchQuery("");
  }, [search]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategory = (event, cat, subCat) => {
    event.stopPropagation();

    const ulr = subCat
      ? `/products?category=${cat}&subCategory=${subCat}`
      : `/products?category=${cat}`;
    navigate(ulr);
  };

  const goToHome = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setOpenSuggestion(e.target.value ? true : false);
    const searchFiltered = Products?.filter(
      (product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.brand.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.category.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.description.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSearchSuggestions(e.target.value ? searchFiltered.slice(0, 15) : []);
    // console.log(searchFiltered.slice(0, 15));
  };

  const handleSuggestionClick = (sugg) => {
    setSearchQuery(sugg);
    navigate(`/products?search=${sugg}`);
    setOpenSuggestion(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
    setOpenSuggestion(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 left-0 w-full z-50">
      <div className=" w-full flex items-center justify-between gap-4 py-2 px-4 md:px-10 ">
        {/* Logo */}
        <button
          onClick={goToHome}
          className="hidden sm:flex items-center space-x-2 flex-shrink-0 cursor-pointer"
        >
          <img
            src="/20240604_155758.png"
            alt="Shopstic Logo"
            className="h-13 "
          />
        </button>

        {/* Large Screen Navigation */}
        <div className="flex items-center justify-end w-full gap-4 ">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-lg flex-shrink-0 z-10">
            <form onSubmit={handleSearchSubmit} className="relative ">
              <input
                value={searchQuery}
                onChange={handleSearchChange}
                type="text"
                placeholder="Search for items..."
                className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring focus:ring-green-300"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
            </form>
            {openSuggestion && (
              <div className="absolute top-full left-0 w-full h-[400px] bg-gray-100 rounded-lg shadow-lg shadow-gray-700 mt-2  overflow-auto">
                <ul className="p-2">
                  {searchSuggestions.length ? (
                    searchSuggestions.map((sugg, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(sugg.title)}
                        className="p-1 cursor-pointer overflow-hidden font-semibold w-full line-clamp-1  border-b-[0px] shadow hover:shadow-lg rounded-md "
                      >
                        {sugg.title}{" "}
                      </li>
                    ))
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <p className="text-gray-500 text-lg">No suggestions</p>
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              onClick={() => navigate("/cart")}
              sx={{ textTransform: "capitalize" }}
              variant="text"
              color="black"
              className="relative cursor-pointer flex"
            >
              <FaShoppingCart className="text-gray-600 text-lg" />
              <span className="absolute top-0 left-0 bg-green-500 text-white text-xs px-1 rounded-full">
                {cart?.length}
              </span>
              <span className="text-sm ml-1">Cart</span>
            </Button>
            <div className="cursor-pointer flex items-center space-x-1">
              <span
                className="text-sm  flex whitespace-nowrap gap-1"
                onClick={handleClick}
              >
                <FaUser className="text-gray-600 text-lg" />
                Account
              </span>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    navigate("/account");
                    handleClose();
                  }}
                  className=" flex whitespace-nowrap gap-1"
                >
                  <PersonOutlineOutlined /> My Account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/orders");
                    handleClose();
                  }}
                  className=" flex whitespace-nowrap gap-1"
                >
                  <LocalShippingOutlined /> Orders
                </MenuItem>
                <MenuItem>
                  <LogoutBtn />
                </MenuItem>
              </Menu>
            </div>
          </div>

          <button className="md:hidden cursor-pointer">
            {isMenuOpen ? (
              <IoMdClose
                onClick={() => setIsMenuOpen((state) => !state)}
                size={28}
              />
            ) : (
              <HiMenu
                onClick={() => setIsMenuOpen((state) => !state)}
                size={28}
              />
            )}
          </button>
        </div>

        {/* Small Screen Navigation */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } bg-white shadow-md md:hidden w-full absolute top-16 left-0 p-4 border-t`}
        >
          <div className="flex w-full items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className=" flex cursor-pointer items-center space-x-2 flex-shrink-0"
            >
              <img src="/Logo.jpg" alt="Shopstic Logo" className="h-7" />
            </div>
          </div>
          <div className="font-semibold grid grid-cols-2 gap-2 mt-4 ">
            <button
              onClick={() => {
                navigate("/account");
                setIsMenuOpen(false);
              }}
              className="block cursor-pointer py-2 bg-zinc-300 text-center rounded-md textwhite "
            >
              My Account
            </button>
            <button
              onClick={() => {
                navigate("/cart");
                setIsMenuOpen(false);
              }}
              className="block cursor-pointer py-2 bg-zinc-300 text-center rounded-md textwhite "
            >
              Carts
            </button>
            <button
              onClick={() => {
                navigate("/orders");
                setIsMenuOpen(false);
              }}
              className="block cursor-pointer py-2 bg-zinc-300 text-center rounded-md textwhite "
            >
              Orders
            </button>
            <LogoutBtn className="block cursor-pointer py-2 bg-zinc-300 text-center rounded-md textwhite " />
          </div>
          <div className=""></div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      {/* h-0 overflow-hidden */}
      <div className="hidden md:flex border-t items-center py-2 px-10 ">
        <nav className="flex space-x-6 lg:ml-6">
          <Button
            onClick={goToHome}
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize"
          >
            Home
          </Button>
          <Button
            onClick={(event) => handleCategory(event, "fashion")}
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize group"
          >
            Fashion
          </Button>
          <Button
            onClick={(event) => handleCategory(event, "electronics")}
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize group"
          >
            Electronics
          </Button>
          <Button
            onClick={(event) => handleCategory(event, "appliances")}
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize group"
          >
            Home appliances
          </Button>
          <Button
            onClick={(event) => handleCategory(event, "footwear")}
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize group"
          >
            Footwear
          </Button>
          <Button
            onClick={(event) => handleCategory(event, "groceries")}
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize"
          >
            Groceries
          </Button>
          <Button
            onClick={(event) => handleCategory(event, "beauty")}
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize"
          >
            Beauty
          </Button>
        </nav>
        <div className="ml-auto hidden md:flex flex-wrap justify-end items-center space-x-2 text-green-600 font-bold">
          <FaHeadphones className="text-gray-600" />
          <span>8881111888</span>
          <span className="text-gray-500 text-sm">24/7 Support Center</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
