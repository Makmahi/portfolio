# Recipe Finder

A modern web application that helps users find recipes based on ingredients they have available. The application uses the Spoonacular API to provide detailed recipe information, including ingredients, instructions, and nutritional information.

## Features

- Search recipes by ingredients
- Filter by dietary preferences (vegetarian, vegan, gluten-free, etc.)
- Filter by cuisine type
- Filter by meal type
- View detailed recipe information
- Responsive design for all devices
- Interactive ingredient management
- Recipe cards with images and key information

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- JavaScript (ES6+)
- Spoonacular API
- Font Awesome Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recipe-finder.git
```

2. Get a Spoonacular API key:
   - Go to [Spoonacular API](https://spoonacular.com/food-api)
   - Sign up for a free account
   - Get your API key from the dashboard

3. Add your API key:
   - Open `script.js`
   - Replace `'YOUR_SPOONACULAR_API_KEY'` with your actual API key

4. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## Usage

1. Enter ingredients you have available
2. Add them to the search using the + button or Enter key
3. Select any dietary preferences, cuisine type, or meal type
4. Click "Find Recipes" to search
5. Click on any recipe card to view detailed information

## API Usage

This project uses the Spoonacular API with the following endpoints:
- `/recipes/findByIngredients` - Search recipes by ingredients
- `/recipes/{id}/information` - Get detailed recipe information

Note: The free tier of the Spoonacular API has a limit of 150 points per day. Each API call costs points based on the endpoint and parameters used.

## Project Structure

```
recipe-finder/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## Contributing

Feel free to fork this project and customize it for your own use. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for providing the recipe data
- [Font Awesome](https://fontawesome.com/) for the icons 