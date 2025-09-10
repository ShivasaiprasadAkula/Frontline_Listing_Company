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
    const { search, sort, page, limit, ...filters } = req.query;

    let filterQuery = { ...filters };

    if (search) {
      const regex = new RegExp(search, "i");
      filterQuery.$or = [
        { name: regex },
        { industry: regex },
        { description: regex },
        { address: regex },
        { city: regex },
        { state: regex },
        { country: regex },
        { pincode: regex },
        { type: regex },
        { website: regex },
        { email: regex },
        { phone: regex }
      ];
    }

    let sortQuery = {};
    if (sort) {
      sort.split(",").forEach(field => {
        const [key, order] = field.split(":");
        sortQuery[key] = order === "desc" ? -1 : 1;
      });
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const totalCount = await Company.countDocuments({});

    const companies = await Company.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: totalCount, 
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


const deleteCompany = async (req, res) => {
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
