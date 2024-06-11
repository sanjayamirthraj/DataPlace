**Requirements**
Before you begin, ensure you have met the following requirements:
1) Node.js (>= 12.0.0)
2) npm (>= 6.0.0) or yarn (>= 1.22.0)

**Installation**
Clone the repository:
git clone (https://github.com/sanjayamirthraj/lumm-koff)
cd frontend

**Folder Structure**
```bash
├── .github                 # GitHub configuration files
├── backend                 # Backend folder
│   └── story_protocol      # Subdirectory for story_protocol
│       └── filler.sol      # Solidity file for the backend
├── frontend                # Frontend folder
    ├── .api                # API configuration or folder
    ├── .next               # Next.js build folder (usually auto-generated)
    ├── components          # Reusable React components
    ├── functions           # Serverless functions or utilities
    ├── lib                 # Library files and utilities
    ├── node_modules        # Node.js modules (auto-generated)
    ├── pages               # Next.js pages (routes)
    ├── public              # Public assets
    ├── styles              # CSS and style files
    ├── .env.local          # Local environment variables
    ├── .eslintc.json       # ESLint configuration file
    ├── .gitignore          # Git ignore file
    ├── .npmrc              # NPM configuration file
    ├── components.json     # Components configuration or metadata file
    ├── config.tsx          # Configuration file (TypeScript/React)
    ├── database.rules.json # Database rules configuration file
    ├── envConfig.ts        # Environment configuration file (TypeScript)
    ├── firebase-config.ts  # Firebase configuration file (TypeScript)
    ├── firestore.indexes.json  # Firestore indexes configuration file
    ├── firestore.rules     # Firestore rules file
    ├── next-env.d.ts       # Next.js environment types declaration
    ├── next.config.js      # Next.js configuration file
    ├── package-lock.json   # Package lock file (npm)
    ├── package.json        # Project dependencies and scripts
    ├── postcss.config.js   # PostCSS configuration file
    ├── README.md           # Project documentation
    ├── tailwind.config.js  # Tailwind CSS configuration file
    ├── tsconfig.json       # TypeScript configuration file
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
