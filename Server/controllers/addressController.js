import Address from "../models/AddressModel.js";

const addAddress = async (req, res) => {
  try {
    const {
      user,
      fullName,
      email,
      phoneNumber,
      country,
      street,
      apartment,
      city,
      state,
      postcode,
    } = req.body;
    // console.log("address", req.body);

    if (
      !user ||
      !fullName ||
      !email ||
      !phoneNumber ||
      !country ||
      !street ||
      !city ||
      !state ||
      !postcode
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields.",
      });
    }

    const address = await Address.findOne({ user });

    if (!address) {
      const newAddress = new Address({
        user,
        fullName,
        email,
        phoneNumber,
        country,
        street,
        apartment,
        city,
        state,
        postcode,
      });

      await newAddress.save();

      res.status(201).json({
        success: true,
        message: "Address added successfully",
        address: newAddress,
      });
    } else {
      const updatedAddress = await Address.findOneAndUpdate(
        { user },
        {
          fullName,
          email,
          phoneNumber,
          country,
          street,
          apartment,
          city,
          state,
          postcode,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Address updated successfully",
        address: updatedAddress,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "failed to add address!",
    });
  }
};

const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    const address = await Address.findOne({ user: userId });
    if (!address) {
      return res.status(200).json({
        success: true,
        message: "Address not found",
        address: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Address find successfully",
      address,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "failed to get address!",
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const newData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId or addressId",
      });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      newData,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully.",
      data: updatedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "failed to update address!",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId or addressId",
      });
    }

    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully.",
      data: deletedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "failed to delete address!",
    });
  }
};

export { addAddress, getAddress, updateAddress, deleteAddress };
