const Company = require("../models/companyModel");

const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      message: "Company listing has been successfully created.",
      data: company
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "The follwing fields are missing",
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create company.",
      error: error.message
    });
  }
};


const getCompanies = async (req, res) => {
  try {
    let queryObj = { ...req.query };

    const excludeFields = ["sort", "search", "page", "limit"];
    excludeFields.forEach(field => delete queryObj[field]);

    let filterQuery = { ...queryObj };

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      filterQuery.$or = [
        { name: searchRegex },
        { industry: searchRegex },
        { description: searchRegex },
        { address: searchRegex },
        { city: searchRegex },
        { state: searchRegex },
        { country: searchRegex },
        { pincode: searchRegex },
        { type: searchRegex },
        { website: searchRegex },
        { email: searchRegex },
        { phone: searchRegex }
      ];
    }

    let sortQuery = {};
    if (req.query.sort) {
      const sortFields = req.query.sort.split(",");
      sortFields.forEach(field => {
        const [key, order] = field.split(":");
        sortQuery[key] = order === "desc" ? -1 : 1;
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const companies = await Company.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: companies.length,
      page,
      data: companies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Company fetched successfully.",
      data: company
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch company.",
      error: error.message
    });
  }
};

const Company = require("../models/companyModel");

const updateCompany = async (req, res) => {
  try {
    const requiredFields = [
      "name",
      "industry",
      "address",
      "city",
      "state",
      "country",
      "pincode",
      "foundedYear",
      "employeeCount",
      "type",
      "website",
      "email",
      "phone"
    ];

    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `Field '${field}' is missing`
        });
      }
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Company listing has been successfully updated.",
      data: company
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update company.",
      error: error.message
    });
  }
};


const deleteCompanyById = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Company has been successfully deleted."
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete company.",
      error: error.message
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
