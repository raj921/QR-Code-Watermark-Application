# 🕵️‍♂️ QR-Code Watermark Application

A personal **steganography application** that allows users to **securely embed and extract encrypted data invisibly in PNG images** using **Least Significant Bit (LSB)** insertion. Inspired by the MVPBlocks aesthetic, this project features beautiful **glass morphism effects**, smooth **Framer Motion animations**, and a sleek **dark gradient theme**.



## ✨ Features

- 🔐 **AES-GCM Encryption** with PBKDF2-based password key derivation
- 🖼️ **LSB Steganography** in PNG alpha channels for invisible data embedding
- 📸 **QR Code Support** for referencing and retrieving stego-images
- 📈 **Activity Stats** showing usage and operations (via PostgreSQL)
- 🎨 **MVPBlocks-Inspired UI** with animations and glassmorphism
- 🧩 **Type-Safe Full Stack** built using modern tools like Vite, React, Express, Drizzle ORM, and Tailwind CSS

---

## 🧠 How It Works

### 🔐 Embedding Flow

1. Upload a PNG image and enter a secret message.
2. Message is encrypted using the **Web Crypto API** (AES-GCM).
3. The encrypted message is embedded into the **alpha channel** using LSB.
4. The modified image is returned as a downloadable file.

### 🔓 Extraction Flow

1. Upload a watermarked PNG.
2. The embedded data is extracted from LSB bits in the alpha channel.
3. The encrypted message is decrypted using the provided key.
4. The original message is displayed to the user.

### 📱 QR Code Flow

- **Generate** QR codes pointing to watermarked images.
- **Scan** QR codes to quickly retrieve hidden data (simulated for now).
- Future support for camera access in PWA.

---

## 🧱 Tech Stack

### Frontend

- **React 18 + TypeScript**
- **Vite** (for blazing-fast development/build)
- **Radix UI** + `shadcn/ui` (for accessible UI components)
- **Tailwind CSS** (with custom theming via CSS variables)
- **Framer Motion** (smooth animations)
- **Wouter** (minimalistic routing)
- **TanStack Query** (server state management)

### Backend

- **Node.js + Express (ESM)**
- **Drizzle ORM** (type-safe DB interactions)
- **PostgreSQL** (hosted via [Neon](https://neon.tech))
- **connect-pg-simple** (for session storage)
- **Zod** (runtime type validation)

---

## ⚙️ Development Setup

### 🔧 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/qr-code-watermark-app.git
cd qr-code-watermark-app

# 2. Install dependencies
pnpm install

# 3. Setup environment
cp .env.example .env
# Add your DATABASE_URL and other secrets

# 4. Run database migrations
pnpm drizzle db:push

# 5. Start the dev server
pnpm dev

