import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    // Optional: Dev fallback if User-Agent is missing
    if (!req.headers['user-agent']) {
      req.headers['user-agent'] = 'DevClient/1.0';
    }

    // ✅ Correct usage: pass the full req object
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Too many requests" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot detected" });
      }

      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next(error);
  }
};

export default arcjetMiddleware;
