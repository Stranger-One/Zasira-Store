import mongoose from "mongoose";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

const addCartProduct = async (req, res) => {
  // create cart if not
  // check the product exist
  // check the product in stock
  // check the product is in the cart or not
  // add the product to the cart
  // return the new cart list

  try {
    const { userId, productId, quantity, size } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product?.stock <= 0) {
      return res.status(404).json({
        success: false,
        message: "Product is out of stock",
      });
    }

    const findCurrentProductIndex = cart.products.findIndex(
      (prod) => prod.productId.toString() === productId && prod.size === size
    );
    if (findCurrentProductIndex === -1) {
      cart.products.push({ productId, quantity, size });
    } else {
      cart.products[findCurrentProductIndex].quantity += quantity;
    }
    product.stock -= quantity;
    
    await cart.save();
    await product.save();

    const newCart = await Cart.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "prod",
              in: {
                productId: "$$prod.productId",
                quantity: "$$prod.quantity",
                size: "$$prod.size",
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "detail",
                        cond: { $eq: ["$$detail._id", "$$prod.productId"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          productDetails: 0, // Remove extra lookup array
        },
      },
    ]);

    // console.log(newCart);

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully.",
      cart: newCart[0],
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      success: false,
      message: "failed to add product to cart !",
    });
  }
};

const fetchCartProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      });
    }

    let cart = await Cart.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "prod",
              in: {
                productId: "$$prod.productId",
                quantity: "$$prod.quantity",
                size: "$$prod.size",
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "detail",
                        cond: { $eq: ["$$detail._id", "$$prod.productId"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          productDetails: 0, // Remove extra lookup array
        },
      },
    ]);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found with provided userId!",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Cart products fetched successfully",
      cart: cart[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "failed to retrive products!",
    });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity, size } = req.body;
    console.log(req.body)

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found with provided userId!",
      });
    }

    const findCurrentProductIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() && item.size === size
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      });
    }

    const updateStockBy =
      cart.products[findCurrentProductIndex].quantity - quantity;
    

    if (
      cart.products[findCurrentProductIndex].quantity == 1 &&
      quantity == -1
    ) {
      // remove product from cart
      cart.products = cart.products.filter(
        (item) =>
          !(
            item.productId.toString() === productId.toString() &&
            item.size === size
          )
      );
    } else {
      cart.products[findCurrentProductIndex].quantity = quantity;
    }

    
    let product = await Product.findById(productId)
    product.stock += updateStockBy


    await cart.save();
    await product.save();

    const newCart = await Cart.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "prod",
              in: {
                productId: "$$prod.productId",
                quantity: "$$prod.quantity",
                size: "$$prod.size",
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "detail",
                        cond: { $eq: ["$$detail._id", "$$prod.productId"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          productDetails: 0, // Remove extra lookup array
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully!",
      cart: newCart[0],
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "failed to update!",
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found with provided userId!",
      });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully!",
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "failed to clear cart!",
    });
  }
};

const removeCartProduct = async (req, res) => {
  try {
    const { userId } = req.params;
    const { size, productId, quantity } = req.body;

    if (!userId || !productId || !size) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.products = cart.products.filter(
      (item) =>
        !(
          item.productId.toString() === productId.toString() &&
          item.size === size
        )
    );
    let product = await Product.findById(productId)
    product.stock += quantity

    await cart.save();
    await product.save()

    const newCart = await Cart.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "prod",
              in: {
                productId: "$$prod.productId",
                quantity: "$$prod.quantity",
                size: "$$prod.size",
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "detail",
                        cond: { $eq: ["$$detail._id", "$$prod.productId"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          productDetails: 0, // Remove extra lookup array
        },
      },
    ]);

    // console.log({newCart});

    res.status(200).json({
      success: true,
      message: "Product deleted from cart successfully!",
      cart: newCart[0],
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "failed to delete product !",
    });
  }
};

export {
  addCartProduct,
  fetchCartProducts,
  updateProductQuantity,
  removeCartProduct,
  clearCart,
  // createCart,
};
