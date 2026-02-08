# Valentine Website Debugging Guide

If you are encountering issues with sending emails (404 Not Found or other errors), follow these steps to troubleshoot.

## 1. Restart the Servers
The most common fix for the `404 /api/send-email not found` error is to restart your development server so it picks up the new proxy configuration.

1. **Stop the current frontend server** (Ctrl+C in the terminal running `npm run dev`).
2. **Start it again**:
   ```bash
   cd client
   npm run dev
   ```
3. **Ensure the backend is running**:
   Open a new terminal and run:
   ```bash
   cd server
   npm run dev
   ```
   You should see: `Server is running on http://localhost:5000`

## 2. Verify Backend is Running
Open your browser or use a tool like Postman/Curl to check if the backend is alive.
- **URL**: `http://localhost:5000/api/message`
- **Expected Result**: A JSON response `{"message": "I love you..."}`.

## 3. Check Console Logs
### Frontend Console (Browser)
1. Right-click on the page -> Inspect -> **Console** tab.
2. Click the "Send ❤️" button.
3. Look for logs:
   - `Sending email to: ...`
   - `Response status: 200` (Success)
   - `Response status: 404` (Proxy issue - Restart Vite!)
   - `Response status: 500` (Server error - Check backend logs)

### Backend Console (Terminal)
Check the terminal where `server` is running. You should see:
- `[Date] - POST /api/send-email`
- `Email sent successfully` OR `Error sending email: ...`

## 4. Common Errors & Fixes

### Error: `404 Not Found`
- **Cause**: The frontend (Vite) doesn't know how to forward `/api` requests to the backend (Express).
- **Fix**: 
  1. Check `client/vite.config.js` has the `server.proxy` setting (we added this!).
  2. **RESTART** the `npm run dev` command in the client folder.

### Error: `500 Failed to send email`
- **Cause**: Nodemailer cannot authenticate with Gmail.
- **Fix**: 
  1. Check `server/.env` file.
  2. Ensure `EMAIL_PASS` is a **Google App Password**, not your regular password.
  3. Ensure 2-Step Verification is enabled on your Google Account.

### Error: `Network Error` / `Failed to connect`
- **Cause**: Backend server is not running.
- **Fix**: Open a terminal, `cd server`, and run `npm run dev`.
