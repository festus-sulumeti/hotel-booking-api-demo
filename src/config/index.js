const config = {
   jwtSecret: process.env.JWT_SECRET || "supersecret_demo_key",
   env: process.env.NODE_ENV || "development"
};

export default config;
