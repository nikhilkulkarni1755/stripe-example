# Stripe Checkout Example

A simple React + Express app that demonstrates Stripe Checkout integration for accepting payments.

## What This App Does

- Displays a product (Winter Coat - $5.00) 
- Creates a Stripe Checkout session when user clicks "Checkout"
- Redirects to Stripe's hosted checkout page
- Handles success/cancel redirects back to your app

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Stripe Products & Get Your Keys

#### Get Your Stripe Keys:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API Keys**
3. Copy your **Secret Key** (starts with `sk_test_` for test mode)

#### Create a Product & Get Price ID:
1. In Stripe Dashboard, go to **Products** → **Add Product**
2. Add product details (name, description, price)
3. After creating, click on the product
4. Copy the **Price ID** (starts with `price_`)

### 3. Set Environment Variables

Create a `.env` file in the root directory:

```env
STRIPE_SECRET_KEY=sk_test_your_actual_key_here
STRIPE_PRICE_ID=price_your_actual_price_id_here
```

### 4. Run the Application

```bash
npm start
```

This starts both the React frontend (port 3000) and Express backend (port 4242).

### 5. Test the Payment

1. Open [http://localhost:3000/checkout](http://localhost:3000/checkout)
2. Click the "Checkout" button
3. Use Stripe's test card numbers:
   - Success: `4242 4242 4242 4242`
   - Any future expiry date and any 3-digit CVC

## Code Structure

### Frontend Code (React)
- **`src/App.jsx`** - Main React component with product display and success/cancel handling
- **`public/index.html`** - HTML template

### Backend Code (Express)
- **`server.js:5`** - Stripe initialization with API key
- **`server.js:14-42`** - `/create-checkout-session` endpoint that creates Stripe sessions

### Key Stripe Integration Points
1. **Stripe Setup**: `server.js:5` - Initialize Stripe with secret key
2. **Session Creation**: `server.js:24-35` - Create checkout session with price ID
3. **Redirect Handling**: `src/App.jsx:33-46` - Handle success/cancel URLs

## Important Notes

- The hardcoded Stripe key in `server.js:5` is a test placeholder - replace with your actual key via environment variables
- Test mode transactions won't charge real money
- For production, use live keys (starting with `sk_live_`)