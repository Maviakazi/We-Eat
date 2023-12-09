require('dotenv').config();
require('./config/database');
const Restaurant = require('./models/restaurant');

const restaurantData = [
    {
        name: 'Culinary Delight',
        address: '123 Main Street, Cityville',
        menu: [
            { name: 'Bruschetta', category: 'starters', price: 8 },
            { name: 'Shrimp Cocktail', category: 'starters', price: 12 },
            { name: 'Caprese Salad', category: 'starters', price: 10 },
            {
                name: 'Chicken Alfredo',
                category: 'maincourse',
                price: 18,
            },
            {
                name: 'Grilled Salmon',
                category: 'maincourse',
                price: 22,
            },
            {
                name: 'Vegetable Lasagna',
                category: 'maincourse',
                price: 16,
            },
            {
                name: 'Chicken Curry',
                category: 'maincourse',
                price: 15,
            },
            { name: 'Beef Biryani', category: 'maincourse', price: 18 },
            {
                name: 'Eggplant Masala',
                category: 'maincourse',
                price: 12,
            },
            { name: 'Tiramisu', category: 'dessert', price: 9 },
            {
                name: 'Chocolate Fondue',
                category: 'dessert',
                price: 12,
            },
            {
                name: 'New York Cheesecake',
                category: 'dessert',
                price: 10,
            },
        ],
    },

    {
        name: 'Mediterranean Delight',
        address: '789 Pine Avenue, Seaside',
        menu: [
            { name: 'Hummus with Pita Bread', category: 'starters', price: 8 },
            { name: 'Spanakopita', category: 'starters', price: 12 },
            { name: 'Bruschetta', category: 'starters', price: 10 },
            { name: 'Greek Salad', category: 'maincourse', price: 14 },
            { name: 'Chicken Souvlaki', category: 'maincourse', price: 16 },
            { name: 'Seafood Paella', category: 'maincourse', price: 20 },
            { name: 'Baklava', category: 'dessert', price: 7 },
            { name: 'Tiramisu', category: 'dessert', price: 9 },
            { name: 'Lemon Sorbet', category: 'dessert', price: 6 },
        ],
    },
    {
        name: 'Sushi Haven',
        address: '101 Sakura Street, Zen City',
        menu: [
            { name: 'Edamame', category: 'starters', price: 6 },
            { name: 'Agedashi Tofu', category: 'starters', price: 8 },
            { name: 'Spicy Tuna Roll', category: 'starters', price: 12 },
            { name: 'Sashimi Platter', category: 'maincourse', price: 18 },
            { name: 'Dragon Roll', category: 'maincourse', price: 16 },
            { name: 'Vegetarian Udon', category: 'maincourse', price: 14 },
            { name: 'Green Tea Ice Cream', category: 'dessert', price: 5 },
            { name: 'Mochi', category: 'dessert', price: 7 },
            { name: 'Red Bean Dorayaki', category: 'dessert', price: 8 },
        ],
    },
    {
        name: 'Burger Bistro',
        address: '789 Patty Parkway, Sizzleburg',
        menu: [
            { name: 'Cheese Fries', category: 'starters', price: 8 },
            { name: 'Mozzarella Sticks', category: 'starters', price: 10 },
            { name: 'Onion Rings', category: 'starters', price: 7 },
            { name: 'Classic Burger', category: 'maincourse', price: 12 },
            { name: 'BBQ Bacon Burger', category: 'maincourse', price: 14 },
            { name: 'Veggie Burger', category: 'maincourse', price: 11 },
            { name: 'Chocolate Shake', category: 'dessert', price: 6 },
            { name: 'Apple Pie', category: 'dessert', price: 8 },
            { name: 'Brownie Sundae', category: 'dessert', price: 9 },
        ],
    },
    {
        name: 'Sushi Delight',
        address: '101 Sashimi Street, Nori City',
        menu: [
            { name: 'Edamame', category: 'starters', price: 5 },
            { name: 'Spicy Tuna Roll', category: 'starters', price: 12 },
            { name: 'Miso Soup', category: 'starters', price: 6 },
            { name: 'Sashimi Platter', category: 'maincourse', price: 18 },
            { name: 'Dragon Roll', category: 'maincourse', price: 15 },
            { name: 'Vegetarian Sushi', category: 'maincourse', price: 14 },
            { name: 'Green Tea Ice Cream', category: 'dessert', price: 7 },
            { name: 'Mochi', category: 'dessert', price: 8 },
            { name: 'Red Bean Cake', category: 'dessert', price: 6 },
        ],
    },
    {
        name: 'Taco Haven',
        address: '202 Queso Blvd, Guacamole Town',
        menu: [
            { name: 'Guacamole & Chips', category: 'starters', price: 8 },
            { name: 'Queso Fundido', category: 'starters', price: 10 },
            { name: 'Nachos Supreme', category: 'starters', price: 12 },
            { name: 'Chicken Tacos', category: 'maincourse', price: 14 },
            { name: 'Beef Burrito', category: 'maincourse', price: 16 },
            {
                name: 'Vegetarian Enchiladas',
                category: 'maincourse',
                price: 13,
            },
            { name: 'Churros', category: 'dessert', price: 6 },
            { name: 'Tres Leches Cake', category: 'dessert', price: 9 },
            { name: 'Flan', category: 'dessert', price: 7 },
        ],
    },
    {
        name: 'Italian Ristorante',
        address: '606 Olive Garden Lane, Pasta Town',
        menu: [
            { name: 'Garlic Bread', category: 'starters', price: 7 },
            { name: 'Margherita Pizza', category: 'maincourse', price: 16 },
            {
                name: 'Chicken Alfredo Pasta',
                category: 'maincourse',
                price: 18,
            },
            { name: 'Tiramisu', category: 'dessert', price: 8 },
            { name: 'Cannoli', category: 'dessert', price: 7 },
        ],
    },
    {
        name: 'Mexican Cantina',
        address: '707 Salsa Street, Guacamole City',
        menu: [
            { name: 'Chips and Salsa', category: 'starters', price: 5 },
            { name: 'Taco Platter', category: 'maincourse', price: 15 },
            { name: 'Enchilada Supreme', category: 'maincourse', price: 14 },
            { name: 'Churros', category: 'dessert', price: 6 },
            { name: 'Tres Leches Cake', category: 'dessert', price: 9 },
        ],
    },
    {
        name: 'Mexican Cantina',
        address: '707 Salsa Street, Guacamole City',
        menu: [
            { name: 'Chips and Salsa', category: 'starters', price: 5 },
            { name: 'Taco Platter', category: 'maincourse', price: 15 },
            { name: 'Enchilada Supreme', category: 'maincourse', price: 14 },
            { name: 'Churros', category: 'dessert', price: 6 },
            { name: 'Tres Leches Cake', category: 'dessert', price: 9 },
        ],
    },
];

async function seedData() {
    try {
        // Delete existing data
        await Restaurant.deleteMany();

        // Create new restaurants
        const createdRestaurants = await Restaurant.create(restaurantData);

        console.log('Successfully seeded restaurant data:');
        console.log(createdRestaurants);
        console.log(JSON.stringify(createdRestaurants, null, 2));
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        // Ensure a clean exit
        process.exit();
    }
}

seedData();
