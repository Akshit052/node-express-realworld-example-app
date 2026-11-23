# SENTINEL AI-Generated Fix

## Root Cause
The application is falling back to a hardcoded default string ('secret') for JWT verification when the SECRET environment variable is missing or empty. Consequently, tokens signed with this default remain valid despite the intended security rotation.

## Fix
Remove the hardcoded fallback for the JWT secret and implement a mandatory check that prevents the application from starting if the SECRET environment variable is not explicitly set.

## Suggested Patch
```
--- a/src/config/index.js
+++ b/src/config/index.js
@@ -1,5 +1,9 @@
 module.exports = {
-  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
+  secret: (() => {
+    if (!process.env.SECRET || process.env.SECRET === 'secret') {
+      throw new Error('FATAL ERROR: SECRET environment variable must be set to a secure, non-default value.');
+    }
+    return process.env.SECRET;
+  })(),
```