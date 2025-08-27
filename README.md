# Finology - Technical Test

## Overview

This is a simple user list application made with ReactJS for the purpose of finishing the technical test from Finology

## How to use

### Local

If you want to run this project locally, you can do so by first installing all the dependencies required:

```
bun --bun install
```

Then, start the development environment:

```
bun --bun run dev
```

## Development Requirements

- IDE (VSCode, WebStorm, Cursor, Atom, Notepad++, VIM, etc.)
- BunJS (`npm install -g bun`)

## Environment Variables

| Name          | Optional | Description                                                           |
| ------------- | -------- | --------------------------------------------------------------------- |
| VITE_BASE_URL | no       | Base URL of [JSON Placeholder](https://jsonplaceholder.typicode.com/) |

## Approach and Assumptions

- Approach
  - The tools used to make this project are:
    - Tanstack Query: data fetching and caching
    - Tanstack Form: handle form state management with type-safe
    - Tanstack Router: implement type-safe file-based routing system (similar to NextJS and React Router)
    - TailwindCSS: class-based CSS styling
    - ShadCN UI: easily implement and modify ready-made components without having to create them from scratch
    - Zod: Typescript-first schema validation
  - The reason I used Query, Form, and Router from Tanstack is because they are from the same maker, and that they are easy to integrate between each other
  - The app consists of 2 pages. The home page (`/`) consists of a table containing list of users, as well as a filtering system on top of it. The detail page (`/:userId`) consists of a card containing the detail of the selected user
  - The `logic` folder consists of logics that a certain component used. I decided to separate between the component render and the logic used in it for easier maintainability (reducing the amount of lines a file has)
  - There are folders with prefix `-` (e.g. `-components`) so that Tanstack Router doesn't assume that those are routes
- Assumptions
  - Accoding to the [documentation](https://jsonplaceholder.typicode.com/), the user API only has 10 users. Therefore, I decided not to include any pagination
  - The test states that the filtering system should include seach by user `name`, not `username`. Therefore, the search bar implemented in the app only filters by `name` and not `username`
  - Client doesn't store the list for companies and cities. When a user uses the filter, the options for companies and cities will change according to the response from the server
