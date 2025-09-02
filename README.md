# Vividly 🎥✨

Vividly is a modern SaaS platform that lets users **upload, compress, and download videos** with a sleek UI and authentication system.  
Built with **Next.js, TailwindCSS, Prisma, Clerk, and Cloudinary**.

---

## 🚀 Features

- 🔐 Authentication (Clerk with Google login)
- 📹 Video uploads with Cloudinary
- ⚡ Automatic video compression
- 📥 Secure video downloads
- 🎨 Modern UI with TailwindCSS
- 🛠️ Prisma + PostgreSQL database

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** [Clerk](https://clerk.com/)
- **Storage/Media:** [Cloudinary](https://cloudinary.com/)

---

## 📂 Project Structure

vividly/
├── saas/ # Main application source code
│ ├── app/ # Next.js app router
│ ├── components/ # Reusable UI components
│ ├── lib/ # Utilities and helpers
│ ├── prisma/ # Prisma schema and migrations
│ ├── public/ # Static assets
│ ├── styles/ # Global styles
│ └── ...
├── .env.example # Example environment variables
├── .gitignore # Git ignore rules
├── README.md # Documentation
└── package.json # Project config

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/aayushsaini-dev/vividly.git
cd vividly/saas
2️⃣ Install Dependencies
bash
Copy code
npm install
# or
yarn install

3️⃣ Setup Environment Variables

Copy .env.example → .env.local

Fill in your credentials:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

DATABASE_URL=   # (Duplicate in both .env and .env.local)

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


⚠️ Note:

DATABASE_URL should be present in both .env and .env.local.

Keep real .env files private. They are not committed (ignored by .gitignore).

4️⃣ Run Database Migrations
npx prisma migrate dev

5️⃣ Start Development Server
npm run dev


Visit: http://localhost:3000

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

📜 License

This project is licensed under the MIT License.

💡 Inspiration

Built as part of my daily dev sprint, learning journey, and SaaS exploration. Special thanks to Hitesh Choudhary
 for guidance 🙏.
```
