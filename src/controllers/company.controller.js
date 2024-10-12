import Company from "../models/company.model.js";

// Create a new company
export const createCompany = async (req, res) => {
  try {
    let {
      name,
      url,
      ceo,
      establishedYear,
      country,
      broker,
      platformUse,
      trustPilotReview,
      googleReview,
      paymentMethod,
      payoutMethod,
      minimumPayoutCondition,
      instrument,
      leverage,
      commission,
      evaluationType,
      step_1,
      step_2,
      step_3,
      accountSize,
      actualPrice,
      discountedPrice,
      profitSplit,
      profitTarget,
      drawdownResetType,
      dailyDrawdown,
      maxDrawdown,
      profitToDrawdownRatio,
      countriesServing,
      countriesNotServing,
      paymentSettlementDays,
      timeLimit,
      minimumTradingDays,
      newsTrading,
      weekendHolding,
      expertAdvice,
      highFrequencyTrades,
      tradeCopier,
      firstPayout,
      subsequentPayouts,
    } = req.body;

    newsTrading = Boolean(newsTrading);
    weekendHolding = Boolean(weekendHolding);
    expertAdvice = Boolean(expertAdvice);
    highFrequencyTrades = Boolean(highFrequencyTrades);
    tradeCopier = Boolean(tradeCopier);

    if (
      !name ||
      !url ||
      !ceo ||
      !establishedYear ||
      !country ||
      !broker ||
      !platformUse ||
      !evaluationType
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let logo = "";
    if (req.file) {
      logo = req.file.filename;
    }

    const company = new Company({
      name,
      url,
      ceo,
      establishedYear,
      country,
      broker,
      platformUse,
      trustPilotReview,
      googleReview,
      paymentMethod,
      payoutMethod,
      minimumPayoutCondition,
      instrument,
      leverage,
      commission,
      evaluationType,
      step_1,
      step_2,
      step_3,
      accountSize,
      actualPrice,
      discountedPrice,
      profitSplit,
      profitTarget,
      drawdownResetType,
      dailyDrawdown,
      maxDrawdown,
      profitToDrawdownRatio,
      countriesServing,
      countriesNotServing,
      paymentSettlementDays,
      timeLimit,
      minimumTradingDays,
      newsTrading,
      weekendHolding,
      expertAdvice,
      highFrequencyTrades,
      tradeCopier,
      firstPayout,
      subsequentPayouts,
      logo,
    });

    await company.save();
    res
      .status(201)
      .json({ message: "Company created successfully", data: company });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while creating the company",
      error: err.message,
    });
  }
};

// Get a single company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res
      .status(200)
      .json({ message: "Company fetched successfully", data: company });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching the company",
      error: err.message,
    });
  }
};

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res
      .status(200)
      .json({ message: "Companies fetched successfully", data: companies });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching the companies",
      error: err.message,
    });
  }
};

// Update a company by ID (PATCH)
export const updateCompanyById = async (req, res) => {
  try {
    const updateFields = { ...req.body };

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res
      .status(200)
      .json({ message: "Company updated successfully", data: company });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while updating the company",
      error: err.message,
    });
  }
};

// Delete a company by ID
export const deleteCompanyById = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while deleting the company",
      error: err.message,
    });
  }
};
