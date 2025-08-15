const express = require("express");
const app = express();
const PORT = 3000;

app.get("/check-time", (req, res) => {
    const now = new Date();
    
    // Optional: Nepal time adjustment (+5:45)
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const nepalHours = (utcHours + 5 + Math.floor((utcMinutes + 45) / 60)) % 24;

    const day = now.getDay(); // 0 = Sunday, 6 = Saturday

    if (day === 6) {
        // Saturday -> always success
        res.json({ status: "success", message: "It's Saturday! 24/7 success 🎉" });
    } else if (nepalHours >= 18 || nepalHours < 6) {
        // 6 PM to 6 AM -> success
        res.json({ status: "success", message: "Night time success 🌙" });
    } else {
        // Day time -> fail
        res.json({ status: "failed", message: "It's day time ☀️" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
