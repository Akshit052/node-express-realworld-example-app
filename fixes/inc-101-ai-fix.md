# SENTINEL AI-Generated Fix

## Root Cause
Hardcoded fallback 'superSecret' is used for JWT signing when JWT_SECRET environment variable is undefined, allowing for trivial token forgery.

## Fix
Remove the hardcoded secret fallback and implement a strict check that throws an error if the JWT_SECRET environment variable is not configured.

## Suggested Patch
```
const secret = process.env.JWT_SECRET;
if (!secret || secret === 'superSecret') {
  throw new Error('FATAL: JWT_SECRET environment variable is missing or insecure');
}
```