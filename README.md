![The5ers](./readme/the5ers.png)
# The5ers Technical Assignment


## Overview
The goal of this assignment is to create a **Stock Management Website** that allows users to manage their stock portfolios and view detailed stock information. The application will consist of two main pages:
- **Portfolio Page**: Where users can manage their stock portfolios.
- **Stock Details Page**: Where users can view the latest stock quote and percentage changes.

## User Stories
- The user can save and edit their portfolio (add/remove stocks).
- The user can navigate between the portfolio and individual stock detail pages freely.
- The user can view the stock's latest quote and percentage change for today on the stock detail page.

## Tech Stack
This project uses the following technologies:

### Frontend
- **React**
- **MobX**
- **Ant Design**

### Backend
- **NestJS** (Express)
- **Mongoose**
- **MongoDB**

---

## Project Structure
```plaintext
assignment/
├── readme/              # Useful information
├── libs/services
│   └── fmp/             # Financial Modeling Prep API wrapper
├── apps/
│   ├── frontend/       # React app for the user interface
│   ├── backend-express/       # Express backend service
│   └── backend-nestjs/  # NestJS backend service
├── docker-compose.yml    # Docker configuration for MongoDB
└── README.md            # Project documentation
```

## Evaluation Criteria
Your submission will be evaluated based on the following:
- Adherence to best practices.
- Modularity, reusability, and separation of concerns.
- Functional correctness and robustness.
- Performance and maintainability.
- User interface design and usability.

---

## Submission Guidelines
1. Upload your repository to your GitHub account and make it public.
2. Include any necessary `.env` files.
3. Notify the team when your submission is ready.

---

## Notes
Feel free to use any stock API of your choice. One recommendation is the **Financial Modeling Prep API**:
- [FMP](./readme/fmp.md): Details about the Financial Modeling Prep API.


## Additional Documentation

- [Run](./readme/run.md): Instructions on how to run the project.
- [Nx Setup](./readme/nx.md): Details about configuring and using Nx in the project.

---

### High 5!

