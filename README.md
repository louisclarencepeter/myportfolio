# Louis Peter — Full Stack Portfolio

A single-page portfolio built with React, Vite, and Sass showcasing my projects, skills, and contact info.

![Portfolio Screenshot](./appimg/Screenshot%202023-11-08%20154051.png)
![Portfolio Screenshot](./appimg/Screenshot%202023-11-08%20154108.png)
![Portfolio Screenshot](./appimg/Screenshot%202023-11-08%20154138.png)
![Portfolio Screenshot](./appimg/Screenshot%202023-11-08%20154148.png)

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

Clone the repo, install dependencies, and start the dev server:

```sh
git clone https://github.com/louisclarencepeter/myportfolio.git
cd myportfolio
npm install
npm run dev
```

The dev server runs on `http://localhost:3007` by default.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint `src/` with ESLint |

## Contact Form

The contact form posts to the Netlify Function at `/api/contact` by default.
Configure these server-only environment variables in Netlify:

```sh
RESEND_API_KEY=
RESEND_FROM_EMAIL="Portfolio Contact <contact@yourdomain.com>"
CONTACT_TO_EMAIL="louisclarencepeters@gmail.com"
```

Do not prefix the Resend key with `VITE_`, because Vite exposes `VITE_*`
variables to the browser bundle.

## Project Structure

```
myportfolio/
├── netlify/
│   └── functions/
│       └── contact.js
├── netlify.toml
├── public/
│   └── favicon.jpg
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── components/
│   │   ├── CookieBanner/
│   │   │   ├── CookieBanner.jsx
│   │   │   └── CookieBanner.scss
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.scss
│   │   ├── Header/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.scss
│   │   └── Main/
│   │       ├── About.jsx
│   │       ├── Contact.jsx
│   │       ├── Home.jsx
│   │       ├── Main.jsx
│   │       ├── Project.jsx
│   │       └── *.scss
│   ├── config/
│   │   └── contact.js
│   ├── styles/
│   │   └── App.scss
│   ├── App.jsx
│   └── main.jsx
├── impressum.html
├── index.html
└── vite.config.js
```

## Tech Stack

- **React 18** — UI library
- **Vite** — build tool and dev server
- **Sass** — component-scoped styles
- **Font Awesome** — icon set
- **ESLint** — linting

## Contributing

Contributions are welcome.

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.

## Contact

Louis Peter — [louisclarencepeters@gmail.com](mailto:louisclarencepeters@gmail.com)
