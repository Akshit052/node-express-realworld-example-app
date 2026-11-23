# SENTINEL AI-Generated Fix

## Root Cause
The application is using a hardcoded fallback string (likely 'secret') for JWT signing and verification. During the security rotation, environment variables were updated, but the application logic continued to validate tokens against the hardcoded default because the 'JWT_SECRET' environment variable was either not correctly mapped or the code provided a 'safe' fallback that matches the old configuration.

## Fix
Remove hardcoded fallback strings for the JWT secret. Update the configuration logic to strictly require the JWT_SECRET environment variable and throw an error during the bootstrap phase if it is missing or insecure.

## Suggested Patch
```
export const config = {
  // OLD CODE:
  // secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  
  // NEW CODE:
  jwtSecret: (() => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret === 'secret') {
      throw new Error('CRITICAL: JWT_SECRET is not set or is using an insecure default. Security rotation requires a unique environment variable.');
    }
    return secret;
  })(),
  port: process.env.PORT || 3000
};
```