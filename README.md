# AI Engineer Portfolio

A premium Next.js portfolio for Sayon Manna with a calm glassmorphism aesthetic, animated atmospheric background, kinetic cursor, and separate route-based sections for About, Experience, Projects, Research, and Contact.

## Tech Stack

- Next.js 16 App Router
- React 18
- TypeScript
- CSS with custom glassmorphism and motion styling
- Canvas-based background effects
- GitHub Actions for CI/CD
- Vercel for deployment

## What’s Included

- Animated homepage hero with vaporize text
- Kinetic cursor grid and sparkle background
- Separate pages for each portfolio section
- Smooth scroll and page transition styling
- Responsive layout for desktop and mobile
- Production-ready Vercel deployment workflow

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production server locally
- `npm run lint` - run lint checks

## Deployment

This repository includes a GitHub Actions workflow that deploys to Vercel.

Required GitHub secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Project Files

- `app/layout.tsx` - document shell and metadata
- `app/page.tsx` - homepage content and section hub
- `app/globals.css` - visual system, layout, and motion rules
- `components/SiteFrame.tsx` - shared shell, navigation, and background layers
- `components/KineticGrid.tsx` - cursor-reactive grid effect
- `components/Sparkles.tsx` - background particle atmosphere
- `components/VaporizeTextCycle.tsx` - animated name treatment on the homepage
- `.github/workflows/vercel.yml` - GitHub Actions CI/CD pipeline

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
