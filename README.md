 QR-Code Watermark Application
A personal steganography application built with ❤️ using modern web technologies. This proof-of-concept tool lets users encrypt and hide data invisibly in PNG images using Least Significant Bit (LSB) steganography combined with AES-GCM encryption, all wrapped in a beautiful MVPBlocks-inspired UI.

✨ Features
🔒 Secure Encryption — AES-GCM with PBKDF2 key derivation

🖼️ Invisible Embedding — Data is hidden inside PNG alpha channels

📷 QR Code Workflow — Generate and scan QR codes for sharing stego-images

💾 PostgreSQL Database — Tracks embedding and extraction usage

🎨 Gorgeous UI — Glass morphism, smooth animations, and responsive design

🛠️ Optimized Dev Stack — Vite, React 18, TypeScript, Express, Drizzle ORM

🧠 How It Works
🔐 Embed Process
User uploads a PNG image and inputs a secret message.

Message is encrypted using AES-GCM via Web Crypto API.

Encrypted message is embedded into the image using LSB manipulation.

The stego-image is generated and made available for download.

🔓 Extract Process
User uploads the watermarked PNG image.

LSB algorithm extracts the hidden encrypted message.

AES-GCM decryption reveals the original secret message.

Payload is displayed in the UI.

📱 QR Code Workflow
QR Generator: Creates a QR code pointing to the watermarked image.

QR Scanner: (Simulated) detects QR codes and initiates extraction workflow.

Camera Access: PWA-enabled for future mobile camera integration.

🧱 Tech Stack
🖥️ Frontend
Framework: React 18 + TypeScript

Build Tool: Vite

UI: Radix UI + shadcn/ui

Styling: Tailwind CSS + CSS variables

Animations: Framer Motion

Routing: Wouter

State Management: TanStack Query

🌐 Backend
Runtime: Node.js (ESM)

Framework: Express.js

Database: PostgreSQL via Neon (serverless)

ORM: Drizzle ORM

Session Management: connect-pg-simple

📂 Project Structure
bash
Copy
Edit
/
├── client/                 # React frontend
│   └── ...
├── server/                 # Express backend
│   └── ...
├── shared/                # Shared types/utilities between frontend and backend
├── drizzle/               # Drizzle ORM config and migrations
├── .env                   # Environment variables
├── vite.config.ts         # Vite setup with middleware
├── tsconfig.json
└── README.md
🧪 Database Schema
🧑 Users
Field	Type
id	UUID
username	Text
email	Text

📥 Embeddings
Field	Type
id	UUID
user_id	UUID FK
filename	Text
payload_size	Integer
created_at	Timestamp

📤 Extractions
Field	Type
id	UUID
user_id	UUID FK
filename	Text
success	Boolean
created_at	Timestamp

⚙️ Development
🔧 Local Setup
bash
Copy
Edit
# 1. Clone the repo
git clone https://github.com/yourusername/qr-watermark-app.git
cd qr-watermark-app

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.example .env
# Fill in DATABASE_URL and any necessary secrets

# 4. Run database migrations
pnpm drizzle db:push

# 5. Start dev server (client + API)
pnpm dev

