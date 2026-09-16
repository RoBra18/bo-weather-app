# Weather Forecast App

A simple weather forecast web application built as part of a technical challenge.

The application allows users to select any of the 9 departmental capitals of Bolivia and view current weather information and a 7-day forecast.

# Production project URL:
https://bo-weather-app.vercel.app/

## How to Execute

### Prerequisites

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone git@github.com:RoBra18/bo-weather-app.git

```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

### Production Build

```bash
npm run build
```

## Technologies Used

* React
* TypeScript
* Vite
* Tailwind CSS
* Open-Meteo API
* Vercel for deployment

## API Used

The application uses the [Open-Meteo API](https://open-meteo.com/) to retrieve weather data.

Open-Meteo was chosen because it provides all the weather information required by the challenge without requiring an API key or user account. It provides both current weather data and daily forecasts, including maximum and minimum temperatures, weather conditions, humidity, wind speed, and precipitation probability.

Another useful feature is its support for multiple coordinates, which makes it suitable for retrieving weather information for the 9 required cities.

### Advantages

* No API key or account required for this non-commercial project.
* Provides the weather data required by the challenge.
* Supports current weather and daily forecasts.
* Supports multiple locations in a single request.
* Simple REST API.

### Limitations

* The free API is intended for non-commercial use.
* Weather data depends on the underlying weather models and their coverage.

### Why Open-Meteo Instead of OpenWeather?

Several public weather APIs were compared, including OpenWeather. Open-Meteo was selected because of its ease of use, simple integration, lack of API key requirements, and because it provides all the data needed for the challenge.

## Main Technical Decisions

### Separation of API and UI Logic

API requests are handled through dedicated services instead of being performed directly inside UI components.

This keeps the UI independent from the external API structure and makes the data flow easier to understand and maintain.

### Application-Level Models

Open-Meteo responses are mapped into application-level TypeScript models instead of exposing the API response directly to the UI.

This keeps the external API contract separated from the rest of the application.

### Current Weather and Forecast Data

Current weather information is retrieved from Open-Meteo's current weather data, while the 7-day forecast uses its daily forecast data.


### Simple, Domain-Oriented Structure

The project uses a simple structure inspired by Screaming Architecture, keeping the application focused on its weather-related domain while separating concerns such as pages, services, types, and configuration.

The goal was to keep the project understandable without introducing unnecessary abstractions or over-engineering for the scope of the challenge.

### Error Handling

The application includes loading, empty, and error states

### Git Workflow

GitHub Flow was used to organize the development process, working with short-lived feature branches and pull requests before merging changes into the main branch. This kept the development history organized and made each feature easier to review.

### Scope and Simplicity

Routing and state management libraries such as Redux were intentionally not used because they were not necessary for the scope of this application. Unit tests were not added because the application has a relatively small scope and simple logic, so adding a testing framework was considered unnecessary complexity for this challenge.

## AI USAGE

AI was used as a development assistant throughout the project. The generated code and suggestions were reviewed, tested, and adapted according to the project requirements.

### AI Tools

* **Google Stitch** — Used to generate the initial UI design from a prompt.
* **ChatGPT** — Used for technical research, API comparison, architecture discussions, and reviewing development decisions.
* **Antigravity with Gemini** — Used as an AI coding agent to implement and refine the application step by step.

### How AI Was Used

The development process was divided into several steps, using AI to accelerate repetitive implementation tasks and keeping the main technical decisions under manual review.

First, ChatGPT was used to research and compare public weather APIs and evaluate their advantages and limitations. Based on this analysis, Open-Meteo was selected.

Next, Google Stitch was used to generate an initial UI based on the challenge requirements. The generated interface was then reviewed and adjusted to improve accessibility, contrast, spacing, and visual balance.

Antigravity was then used as a coding agent with step-by-step instructions:

1. Set up the project structure and architecture.
2. Implement the Open-Meteo API integration.
3. Build the UI and connect it to the weather services using the generated UI as reference.
4. Add current weather details such as humidity, wind, and precipitation probability.
5. Add loading, error, retry, and empty states.
6. Perform a final review focused on accessibility, cleanup, and small UI improvements.

After each step, the implementation was manually reviewed and tested to identify issues or changes that were necessary.

For example, Open-Meteo attribution was explicitly added after reviewing its documentation, since the API's attribution requirements needed to be taken into account.

### Example of AI-Generated Code That Was Corrected

One issue was the way the current temperature was initially handled.

The generated implementation calculated the current temperature using:

```text
(maxTemp + minTemp) / 2
```

This does not represent the actual current temperature. It was replaced with Open-Meteo's actual `current.temperature_2m` value.

The AI also initially used default or hardcoded values for some weather details, such as humidity and wind speed. These were replaced with the actual values provided by the API.

Another implementation detail that was changed was the use of `.then()` syntax in some API-related code, which was refactored to `async/await` for consistency with the rest of the implementation.

These examples were identified through code review and testing rather than being accepted directly from the AI.

### What Required the Most Reasoning

One of the main decisions that required reasoning was choosing the weather API.

Although OpenWeather was suggested by the challenge, the requirements did not depend on it. The available data, authentication requirements, simplicity of integration, and licensing considerations were compared before choosing Open-Meteo.

Another important part was deciding how much functionality to implement. Additional features and architectural improvements were considered throughout development, but they were evaluated against the scope of the challenge to avoid unnecessary complexity.

### AI Suggestions That Were Not Used

Some AI suggestions were intentionally not implemented because they were unnecessary for the scope of the challenge.

For example, adding additional weather data such as UV index was considered, but it was not required. Other suggestions, such as introducing an Error Boundary, additional performance abstractions, or more complex architectural patterns, were also not adopted because they would add complexity without providing meaningful value for this project.

## Deployment

Vercel was chosen because it provides a simple deployment workflow with built-in CI/CD integration with GitHub. Every change can be automatically built and deployed, making it a great fit for this challenge without requiring additional infrastructure or configuration.

# Production project URL:
https://bo-weather-app.vercel.app/