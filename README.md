# Plastic Protocols

Plastic Protocols is a Next.js application designed to raise awareness about plastic, particularly micro- and nano-plastics, in daily life. It provides educational content, resources, and tools to help users understand the impact of plastic on the environment and their health.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting Up Environment Variables

Create a `.env.local` file in the root of your project directory and add the necessary environment variables. For example:

```plaintext
NEXT_PUBLIC_API_URL=https://api.example.com
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

Make sure to replace the placeholder values with your actual configuration.

## Features

- **Homepage**: Displays dynamic content fetched from Contentful, including articles and multimedia.
- **Content Management**: Utilizes Contentful for managing and rendering rich text content, including embedded hyperlinks, assets, and entries.
- **Navigation**: Features a dynamic navigation menu and sidebar, populated with entries fetched from Contentful.
- **Styling**: Uses Tailwind CSS for styling, ensuring a modern and responsive design. Custom styles are defined in SCSS files, including mixins and utility classes.
- **SEO and Metadata**: Metadata such as the title and description are set dynamically to improve SEO and provide relevant information to users.

## Technical Stack

- **Frontend**: React, Next.js
- **Styling**: Tailwind CSS, SCSS
- **Content Management**: Contentful
- **Build Tools**: PostCSS, ESLint
- **Deployment**: Vercel

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

