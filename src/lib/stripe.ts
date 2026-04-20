// This file ensures `stripe` npm package is treated as a server-only module.
// It is imported only inside src/app/api/* route files, never in client components.
export {}
