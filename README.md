# My Slooze Internship Challenge 🚀

Hi! This is my project for the Slooze internship selection. I tried to build a clean and simple dashboard to manage commodities, focusing on making it look good and making the different user roles work correctly.

## Getting it started
I've set up a command to install and run everything at once so you don't have to go into different folders.

1. **Install everything**: 
   Open your terminal in the main folder and run:
   ```bash
   npm run install:all
   ```
2. **Run the app**:
   After that, just run:
   ```bash
   npm run dev
   ```
   This will start both the frontend (Next.js) and the backend (NestJS) at the same time.

3. **Check it out**:
   Go to http://localhost:3000 in your browser.

---

## Test Accounts
You can use these two accounts to see how the dashboard changes based on who is logged in:

**Manager Account** (Can see the dashboard and delete items)
*   Email: `manager@slooze.com`
*   Password: `password123`

**Store Keeper Account** (Can only see the inventory and add items)
*   Email: `keeper@slooze.com`
*   Password: `password123`

---

## What I built
*   **Role-Based Access**: One of the coolest parts I worked on was making the sidebar and buttons change depending on if you are a Manager or a Keeper.
*   **Inventory CRUD**: You can add, view, and edit products. I also made sure only Managers can delete things.
*   **Dark Mode**: I added a toggle so you can switch between dark and light themes.
*   **Tech Stuff**: I used Next.js for the frontend and NestJS with GraphQL for the backend. I also used Prisma with a simple SQLite database.

I had a lot of fun working on this and learned a lot about how to connect a GraphQL backend to a React frontend. Hope you like it!

**[Your Name]**
