const cron = require('node-cron');
const Intake = require('../models/Intake');

/**
 * Daily cleanup service for intakes
 * Runs every day at midnight (00:00) to reset/clear old intake records
 */
const startDailyCleanup = () => {
  // Schedule task to run at midnight every day (0 0 * * *)
  cron.schedule('0 0 * * *', async () => {
    try {
      const now = new Date();
      console.log(`🧹 [${now.toISOString()}] Running daily intakes cleanup...`);

      // Calculate date threshold (keep only today's intakes, delete older ones)
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      // Delete all intakes older than today
      const result = await Intake.deleteMany({
        date: { $lt: startOfToday }
      });

      console.log(`✅ Daily cleanup complete: Removed ${result.deletedCount} old intake records`);
    } catch (error) {
      console.error('❌ Daily cleanup failed:', error.message);
    }
  });

  console.log('📅 Daily cleanup scheduler started (runs at midnight)');
};

/**
 * Manual cleanup endpoint - can be triggered via API
 */
const runManualCleanup = async () => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const result = await Intake.deleteMany({
      date: { $lt: startOfToday }
    });

    return {
      success: true,
      deletedCount: result.deletedCount,
      message: `Removed ${result.deletedCount} old intake records`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = { startDailyCleanup, runManualCleanup };
