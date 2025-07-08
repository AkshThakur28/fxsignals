require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: 'lax',
    maxAge: 30 * 60 * 1000 // 30 mins
  }
}));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Uploads directory created.');
}

const routes = {
  authRoutes: require('./routes/admin/authRoutes'),
  userRoutes: require('./routes/admin/userRoutes'),
  imageRoutes: require('./routes/admin/imageRoutes'),
  newsRoutes: require('./routes/admin/newsRoutes'),
  newsCategoryRoutes: require('./routes/admin/newsCategoryRoutes'),
  newsSubCategoryRoutes: require('./routes/admin/newsSubCategoryRoutes'),
  advertisementRoutes: require('./routes/admin/advertisementRoutes'),
  contactUsRoutes: require('./routes/admin/contactUsRoutes'),
  blogRoutes: require('./routes/admin/blogRoutes'),
  pricingRoutes: require('./routes/admin/pricingRoutes'),
  pricingFeaturesRoutes: require('./routes/admin/pricingFeaturesRoutes'),
  signalManagerProfileRoutes: require('./routes/admin/signalManagerProfileRoutes'),
  tradeRoutes: require('./routes/admin/tradeRoutes'),
  analysisRoutes: require('./routes/admin/analysisRoutes'),
  seoRoutes: require('./routes/admin/seoRoutes'),
  typeRoutes: require('./routes/admin/typeRoutes'),
  subTypeRoutes: require('./routes/admin/subTypeRoutes'),
  newsTypeRoutes: require('./routes/admin/newsTypeRoutes'),
  authorRoleRoutes: require('./routes/admin/authorRoleRoutes'),
  authorRoutes: require('./routes/admin/authorRoutes'),
  authorProfileRoutes: require('./routes/admin/authorProfileRoutes'),
  authorPricingRoutes: require('./routes/admin/authorPricingRoutes'),
  authorPricingFeaturesRoutes: require('./routes/admin/authorPricingFeaturesRoutes'),
  currencyPairRoutes: require('./routes/admin/currencyPairRoutes'),
  tradingSignalsRoutes: require('./routes/admin/tradingSignalsRoutes'),
  enquiryRoutes: require('./routes/admin/enquiryRoutes'),
  signalManagerRoutes: require('./routes/admin/signalManagerRoutes'),
  brokerRoutes: require('./routes/admin/brokerRoutes'),
  brokerDetailRoutes: require('./routes/admin/brokerDetailRoutes'),
  forecastRoutes: require('./routes/admin/forecastRoutes'),
  marketPrimerRoutes: require('./routes/admin/marketPrimerRoutes'),
};

app.use('/admin/auth', routes.authRoutes);
app.use('/admin/users', routes.userRoutes);
app.use('/admin/upload_image', routes.imageRoutes);
app.use('/admin/news', routes.newsRoutes);
app.use('/admin/news_category', routes.newsCategoryRoutes);
app.use('/admin/news_sub_category', routes.newsSubCategoryRoutes);
app.use('/admin/advertisement', routes.advertisementRoutes);
app.use('/admin/contact_us', routes.contactUsRoutes);
app.use('/admin/blog', routes.blogRoutes);
app.use('/admin/pricing', routes.pricingRoutes);
app.use('/admin/pricing_features', routes.pricingFeaturesRoutes);
app.use('/admin/signal_manager_profile', routes.signalManagerProfileRoutes);
app.use('/admin/trade', routes.tradeRoutes);
app.use('/admin/analysis', routes.analysisRoutes);
app.use('/admin/seo', routes.seoRoutes);
app.use('/admin/type', routes.typeRoutes);
app.use('/admin/sub_type', routes.subTypeRoutes);
app.use('/admin/news_type', routes.newsTypeRoutes);
app.use('/admin/author_role', routes.authorRoleRoutes);
app.use('/admin/author', routes.authorRoutes);
app.use('/admin/author_profile', routes.authorProfileRoutes);
app.use('/admin/author_pricing', routes.authorPricingRoutes);
app.use('/admin/author_pricing_features', routes.authorPricingFeaturesRoutes);
app.use('/admin/currency_pair', routes.currencyPairRoutes);
app.use('/admin/trading_signals', routes.tradingSignalsRoutes);
app.use('/admin/enquiry', routes.enquiryRoutes);
app.use('/admin/signal_manager', routes.signalManagerRoutes);
app.use('/admin/broker', routes.brokerRoutes);
app.use('/admin/broker_detail', routes.brokerDetailRoutes);
app.use('/admin/forecast', routes.forecastRoutes);
app.use('/admin/market_primer', routes.marketPrimerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
