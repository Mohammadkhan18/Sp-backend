import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  ceo: { type: String, required: true },
  establishedYear: { type: Number, required: true },
  country: { type: String, required: true },
  broker: { type: String, required: true },
  platformUse: [String],
  trustPilotReview: { type: String },
  googleReview: { type: String },
  paymentMethod: [String],
  payoutMethod: [String],
  minimumPayoutCondition: { type: String },
  instrument: [String],
  leverage: [String],
  commission: [String],
  evaluationType:[
    String
  ],
  step_1: {
    type: String,
  },
  step_2: {
    type: String,
  },
  step_3: {
    type: String,
  },
  accountSize: { type: String },
  actualPrice: { type: Number },
  discountedPrice: { type: Number },
  profitSplit: { type: String },
  profitTarget: { type: String },
  drawdownResetType: { type: String },
  dailyDrawdown: { type: Number },
  maxDrawdown: { type: Number },
  profitToDrawdownRatio: { type: String },
  countriesServing: [String],
  countriesNotServing: [String],
  paymentSettlementDays: { type: String },
  timeLimit: { type: String },
  minimumTradingDays: { type: Number },
  newsTrading: { type: Boolean },
  weekendHolding: { type: Boolean },
  expertAdvice: { type: Boolean },
  highFrequencyTrades: { type: Boolean },
  tradeCopier: { type: Boolean },
  firstPayout: {
    type: String,
  },
  subsequentPayouts: {
    type: String,
  },
  logo: { type: String },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
