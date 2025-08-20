# Ne'Na'Na Landingpage PWA

This is the landing page PWA for the Ne'Na'Na project. It provides a store selection interface to OpenFoodNetwork and manages user registration for OFN hubs.

## Project Overview

Ne'Na'Na Box is a project that connects users with local OpenFoodNetwork (OFN) hubs where they can purchase local food products. This landing page serves as an entry point for users to:

1. Select their preferred pickup location/store
2. Register for a new account with their chosen hub
3. Be redirected to the appropriate OFN store

## Features

- **Store Selection**: Users can browse and select from available pickup locations/stores
- **Persistent Selection**: User's store selection is saved in cookies for future visits
- **User Registration**: New users can register for an account with their chosen hub
- **Multilingual Support**: Available in German and English
- **Responsive Design**: Works across desktop and mobile devices

## Technical Architecture

The application is built with:
- [Remix](https://remix.run/) - React-based web framework
- TypeScript
- Tailwind CSS
- Daisy UI
- [React Email](https://react.email/) - For email templates

## Store Location Data

Store/hub location data is managed in an external JSON file, which is fetched at runtime and used to populate the store selection interface. The schema for the JSON file is defined in the `public/store-location-data.schema.json` file.

## Transactional Emails

The application sends transactional emails during the registration process:

### Hub Application Emails

When a user registers for a hub, two emails are sent:

1. **User Notification Email**
   - Sent to: The customer who registered
   - Content: Confirmation of registration submission and next steps
   - Available in: German and English

2. **Manager Notification Email**
   - Sent to: The hub manager
   - Content: Customer registration details including:
     - Customer name, email, phone
     - Notification preferences (email/Telegram)
     - Hub details

### Email Development

- Email templates are built using React Email components
- Run `yarn email` to preview email templates during development
- Email sending is disabled in non-production environments

## Development

### Getting Started

```bash
# Install dependencies
yarn install

# Environment variables for local development
cp .env.example .env

# Start the development server
yarn dev

# Build for production
yarn build

# Preview transactional emails during development
yarn email
```

### Environment Variables

See `.env` file for environment variables.

### Internationalization

The application supports German and English:
- Translation files are in `app/locales/`
- Run `yarn i18n:extract` to extract translation keys
- Run `yarn i18n:generate` to generate TypeScript types for translations

## Deployment

The application is designed to be deployed to any hosting platform that supports Docker containers.
