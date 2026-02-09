const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const connectDb = require('./config/db');
const User = require('./models/User');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'medibook-backend' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/doctors', require('./routes/doctors'));

const port = process.env.PORT || 5000;

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'Admin';

  if (!adminEmail || !adminPassword) {
    console.warn('Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD is not set');
    return;
  }

  const existing = await User.findOne({ email: adminEmail.toLowerCase() });
  if (existing) {
    return;
  }

  const hashed = await bcrypt.hash(adminPassword, 10);
  await User.create({
    name: adminName,
    email: adminEmail.toLowerCase(),
    phone: '0000000000',
    password: hashed,
    role: 'admin'
  });

  console.log(`Seeded admin user: ${adminEmail}`);
};

connectDb()
  .then(async () => {
    await ensureAdminUser();
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect DB:', err.message);
    process.exit(1);
  });
