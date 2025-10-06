import { Machinery, TrainingModule, OwnerBooking, CustomerReview, MaintenanceAlert } from './types';

export const CROP_TYPES: string[] = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Vegetables', 'Fruits'];
export const SOIL_TYPES: string[] = ['Red Soil', 'Black Soil', 'Alluvial Soil', 'Laterite Soil', 'Clay Soil', 'Sandy Soil'];
export const REGIONS: string[] = ['Bangalore Rural', 'Bangalore Urban', 'Mysuru', 'Kalaburagi', 'Mangaluru', 'Tumakuru'];

export const CROP_YIELD_DATA: { [key: string]: { baseYield: number, unit: string, optimalSoils: string[], optimalPlantingMonth: number } } = {
  'Wheat': { baseYield: 2.5, unit: 'tons/acre', optimalSoils: ['Alluvial Soil', 'Black Soil'], optimalPlantingMonth: 10 },
  'Rice': { baseYield: 3.0, unit: 'tons/acre', optimalSoils: ['Clay Soil', 'Alluvial Soil'], optimalPlantingMonth: 5 },
  'Cotton': { baseYield: 1.5, unit: 'tons/acre', optimalSoils: ['Black Soil', 'Red Soil'], optimalPlantingMonth: 4 },
  'Sugarcane': { baseYield: 35, unit: 'tons/acre', optimalSoils: ['Alluvial Soil', 'Clay Soil'], optimalPlantingMonth: 1 },
  'Maize': { baseYield: 4.0, unit: 'tons/acre', optimalSoils: ['Red Soil', 'Laterite Soil'], optimalPlantingMonth: 6 },
  'Vegetables': { baseYield: 10, unit: 'tons/acre', optimalSoils: ['Sandy Soil', 'Red Soil'], optimalPlantingMonth: 8 },
  'Fruits': { baseYield: 8, unit: 'tons/acre', optimalSoils: ['Laterite Soil', 'Red Soil'], optimalPlantingMonth: 2 },
};

export const MACHINERY_DATA: Machinery[] = [
    { id: 1, name: 'John Deere 5075E', type: 'Tractor', power: '75 HP', price: 1200, rating: 4.8, image: '🚜', location: 'Devanahalli', address: 'Bangalore Rural', distance: 42, owner: 'Rajesh Kumar', phone: '+91 9876543210', suitable: ['Wheat', 'Rice', 'Cotton'], demand: 'high', soilSuitability: ['Red Soil', 'Black Soil', 'Alluvial Soil'] },
    { id: 2, name: 'Mahindra 575 DI', type: 'Tractor', power: '47 HP', price: 800, rating: 4.5, image: '🚜', location: 'Electronic City', address: 'Bangalore Urban', distance: 18, owner: 'Suresh Reddy', phone: '+91 9876543211', suitable: ['Vegetables', 'Fruits', 'Maize'], demand: 'medium', soilSuitability: ['Red Soil', 'Sandy Soil', 'Laterite Soil'] },
    { id: 3, name: 'Combine Harvester', type: 'Harvester', power: '200 HP', price: 3500, rating: 4.9, image: '🌾', location: 'Mysuru', address: 'Hinkal Road', distance: 145, owner: 'Venkatesh Gowda', phone: '+91 9876543212', suitable: ['Wheat', 'Rice', 'Maize'], demand: 'high', soilSuitability: ['Black Soil', 'Alluvial Soil'] },
    { id: 4, name: 'Rotavator Pro', type: 'Cultivator', power: '50 HP', price: 600, rating: 4.3, image: '⚙️', location: 'Kalaburagi', address: 'Jewargi Road', distance: 612, owner: 'Prakash Singh', phone: '+91 9876543213', suitable: ['Vegetables', 'Cotton', 'Sugarcane'], demand: 'low', soilSuitability: ['Clay Soil', 'Black Soil'] },
    { id: 5, name: 'Sprayer Elite 500', type: 'Sprayer', power: '25 HP', price: 350, rating: 4.7, image: '💧', location: 'Mangaluru', address: 'Bajpe', distance: 352, owner: 'Suresh Reddy', phone: '+91 9876543214', suitable: ['Vegetables', 'Fruits', 'Cotton'], demand: 'high', soilSuitability: ['Red Soil', 'Laterite Soil', 'Sandy Soil'] },
    { id: 6, name: 'New Holland TD90', type: 'Tractor', power: '90 HP', price: 1500, rating: 4.9, image: '🚜', location: 'Tumakuru', address: 'Bangalore Road', distance: 70, owner: 'Krishna Murthy', phone: '+91 9876543215', suitable: ['Wheat', 'Cotton', 'Sugarcane'], demand: 'high', soilSuitability: ['Black Soil', 'Red Soil', 'Clay Soil'] },
    { id: 7, name: 'Seed Drill Master', type: 'Seeder', power: '35 HP', price: 450, rating: 4.6, image: '🌱', location: 'Bangalore North', address: 'Yelahanka', distance: 28, owner: 'Mahesh Patel', phone: '+91 9876543216', suitable: ['Wheat', 'Rice', 'Maize'], demand: 'medium', soilSuitability: ['Alluvial Soil', 'Red Soil'] },
];

export const TRAINING_MODULES: TrainingModule[] = [
  { id: 1, title: 'Tractor Operation Basics', type: 'Video', machineryType: ['Tractor'], difficulty: 'Beginner', duration: 15, icon: '📹', description: 'A comprehensive video guide for first-time tractor operators.' },
  { id: 2, title: 'Harvester Pre-flight Checks', type: 'Manual', machineryType: ['Harvester'], difficulty: 'Beginner', duration: 10, icon: '📖', description: 'A step-by-step checklist to perform before starting the harvester.' },
  { id: 3, title: 'Advanced Plowing Techniques', type: 'Video', machineryType: ['Tractor', 'Cultivator'], difficulty: 'Advanced', duration: 25, icon: '📹', description: 'Maximize efficiency with advanced plowing patterns and techniques.' },
  { id: 4, title: 'Sprayer Nozzle Maintenance', type: 'Quick Tip', machineryType: ['Sprayer'], difficulty: 'Intermediate', duration: 5, icon: '💡', description: 'Learn how to clean and maintain sprayer nozzles for optimal performance.' },
  { id: 5, title: 'Seeder Calibration Guide', type: 'Manual', machineryType: ['Seeder'], difficulty: 'Intermediate', duration: 20, icon: '📖', description: 'Ensure accurate seed distribution with proper seeder calibration.' },
  { id: 6, title: 'Operating on Uneven Terrain', type: 'Quick Tip', machineryType: ['Tractor', 'Harvester'], difficulty: 'Advanced', duration: 5, icon: '💡', description: 'Key safety considerations for operating machinery on slopes and hills.' },
  { id: 7, title: 'Daily Tractor Maintenance', type: 'Manual', machineryType: ['Tractor'], difficulty: 'Intermediate', duration: 15, icon: '📖', description: 'A daily routine to keep your rented tractor in top condition.' },
];

export const OWNER_BOOKINGS_DATA: OwnerBooking[] = [
  { id: 1, machineryName: 'Mahindra 575 DI', renterName: 'Anitha Sharma', startDate: '2025-10-02', endDate: '2025-10-05', earnings: 2400, status: 'upcoming' },
  { id: 2, machineryName: 'Sprayer Elite 500', renterName: 'Rohan Patel', startDate: '2025-09-28', endDate: '2025-09-30', earnings: 700, status: 'in-progress' },
  { id: 3, machineryName: 'Mahindra 575 DI', renterName: 'Priya Singh', startDate: '2025-09-20', endDate: '2025-09-23', earnings: 2400, status: 'completed' },
  { id: 4, machineryName: 'Sprayer Elite 500', renterName: 'Vijay Kumar', startDate: '2025-09-15', endDate: '2025-09-18', earnings: 1050, status: 'completed' },
];

export const CUSTOMER_REVIEWS_DATA: CustomerReview[] = [
  { id: 1, renterName: 'Priya Singh', machineryName: 'Mahindra 575 DI', rating: 5, comment: 'Excellent condition and great service from Suresh. Highly recommended!', date: '2025-09-24' },
  { id: 2, renterName: 'Vijay Kumar', machineryName: 'Sprayer Elite 500', rating: 4, comment: 'The sprayer worked perfectly for my vegetable farm. Good machine.', date: '2025-09-19' },
  { id: 3, renterName: 'Amit Desai', machineryName: 'Mahindra 575 DI', rating: 5, comment: 'Very reliable tractor. Will rent again next season.', date: '2025-08-12' },
];

export const MAINTENANCE_ALERTS_DATA: MaintenanceAlert[] = [
  { id: 1, machineryName: 'Mahindra 575 DI', issue: 'Engine oil change overdue', urgency: 'high', dueDate: '2025-10-01' },
  { id: 2, machineryName: 'Sprayer Elite 500', issue: 'Nozzle check and cleaning', urgency: 'medium', dueDate: '2025-10-15' },
];
