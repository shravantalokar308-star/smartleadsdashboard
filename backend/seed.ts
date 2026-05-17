import mongoose from 'mongoose';
import User from './src/models/User';
import Lead from './src/models/Lead';
import config from './src/config';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Lead.deleteMany({});

    // Create admin user
    const adminHash = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminHash,
      role: 'admin'
    });
    console.log('✓ Admin user created:', admin.email);

    // Create sales user
    const salesHash = await bcrypt.hash('sales123', 10);
    const sales = await User.create({
      name: 'Sales User',
      email: 'sales@example.com',
      password: salesHash,
      role: 'sales'
    });
    console.log('✓ Sales user created:', sales.email);

    // Create test leads
    const testLeads = [
      { name: 'Rahul Singh', email: 'rahul@example.com', status: 'Qualified', source: 'Instagram', assignedTo: sales._id },
      { name: 'Priya Sharma', email: 'priya@example.com', status: 'New', source: 'Website', assignedTo: sales._id },
      { name: 'Amit Patel', email: 'amit@example.com', status: 'Contacted', source: 'Referral', assignedTo: sales._id },
      { name: 'Sneha Das', email: 'sneha@example.com', status: 'Qualified', source: 'Instagram', assignedTo: sales._id },
      { name: 'Vikram Kumar', email: 'vikram@example.com', status: 'Lost', source: 'Website' },
      { name: 'Anjali Verma', email: 'anjali@example.com', status: 'New', source: 'Instagram' },
      { name: 'Rohan Gupta', email: 'rohan@example.com', status: 'Contacted', source: 'Referral' },
      { name: 'Neha Singh', email: 'neha@example.com', status: 'Qualified', source: 'Website' },
      { name: 'Arjun Reddy', email: 'arjun@example.com', status: 'New', source: 'Instagram', assignedTo: sales._id },
      { name: 'Deepak Nair', email: 'deepak@example.com', status: 'Contacted', source: 'Referral' }
    ];

    await Lead.insertMany(testLeads);
    console.log('✓ 10 test leads created');

    console.log('\n✅ Seed completed!\n');
    console.log('Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin Email:     admin@example.com');
    console.log('Admin Password:  admin123');
    console.log('');
    console.log('Sales Email:     sales@example.com');
    console.log('Sales Password:  sales123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
