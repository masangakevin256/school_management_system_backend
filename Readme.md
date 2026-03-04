# 🚀 TypeScript + Express Backend Setup

This project is a basic Node.js + Express backend application written in **TypeScript**.
It is structured for scalability and follows best practices for development and production builds.

---

## 📦 Tech Stack

* Node.js
* Express
* TypeScript
* ts-node-dev (for development)

---

## 🛠 Project Setup

### 1️⃣ Create Project Directory

```bash
mkdir ts-express-app
cd ts-express-app
```

---

### 2️⃣ Initialize Node Project

```bash
pnpm init 
```

---

### 3️⃣ add Dependencies

#### Production Dependencies

```bash
pnpm add express
```

#### Development Dependencies

```bash
pnpm add -D typescript ts-node-dev @types/node @types/express
```

---

### 4️⃣ Initialize TypeScript

```bash
npx tsc --init
```

Replace the contents of `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## 📁 Project Structure

```
ts-express-app/
│
├── src/
│   └── server.ts
│
├── package.json
├── tsconfig.json
```

---



## ▶️ Scripts

Add the following to your `package.json`:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

---


