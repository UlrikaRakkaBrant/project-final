# Final Project

Pocket Oracle

A small full-stack tarot app where you can draw cards, save readings, and revisit them later.


## The problem

Planning: wrote a few user stories (“draw one card”, “save a 3-card reading”, “see my history”), sketched the pages, then built backend → frontend → deploy in that order.

Tech stack:

Frontend: React (Vite), React Router, axios, react-hook-form + Zod, styled-components for theme tokens.

Backend: Node + Express, MongoDB (Mongoose), JWT auth, bcrypt.

Deployment: Netlify (frontend) and Render (backend).

How I solved it:

Created REST endpoints for auth and readings (CRUD).

Used a shared axios instance with a request interceptor to attach the JWT to every call.

Set up CORS to allow Netlify + localhost.
Kept colors/spacing in CSS variables so the hero image + palette were easy to tune.

If I had more time: find /make better readings, implement AI, fix so all tarot cards show, daily card with history - calenderview, search/filter for readings, better a11y & loading states, overall visual clean-up - make it more user logical and a small test suite (Vitest/RTL).


## View it live

App: https://pocketoracle.netlify.app

API (Render): https://pocket-oracle.onrender.com



Thanks to:
https://github.com/krates98/tarotcardapi for images and more.
https://commons.wikimedia.org/wiki/File:Sebastian_Pether_(1790-1844)_-_Moonlit_Landscape_with_a_Gothic_Ruin_-_1449048_-_National_Trust.jpg for hero image