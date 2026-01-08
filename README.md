# UiPath Orchestrator Control Center

Professional enterprise dashboard for managing UiPath Orchestrator processes, assets, and Action Center tasks.

[cloudflarebutton]

## Overview

UiPath Orchestrator Control Center is a comprehensive web application designed to provide centralized management of UiPath automation resources. The application features two primary sections: Resources and Action Center, offering enterprise-grade filtering capabilities and real-time data synchronization with your UiPath Orchestrator environment.

### Key Features

- **Resources Management**: View and manage all processes and assets from UiPath Orchestrator
- **Action Center Integration**: Complete task management with assignment and completion workflows
- **Real-time Data**: Live synchronization with UiPath SDK and appropriate refresh intervals
- **Enterprise Filtering**: Advanced filtering by status, folder, date ranges, and search functionality
- **Professional UI**: Clean, neutral design with information-dense tables and clear visual hierarchy
- **Responsive Design**: Optimized for desktop and mobile devices

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icons

### UiPath Integration
- **UiPath SDK** - Official TypeScript SDK for UiPath services
- **React Query** - Server state management and caching
- **OAuth Authentication** - Secure authentication with UiPath Orchestrator

### Build & Deployment
- **Vite** - Fast build tool and development server
- **Cloudflare Pages** - Static site hosting and deployment

## Prerequisites

- **Bun** (latest version)
- **UiPath Orchestrator** instance with OAuth app configured
- **Modern web browser** with JavaScript enabled

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uipath-orchestrator-control-center
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root with your UiPath OAuth configuration:
   ```env
   VITE_UIPATH_BASE_URL=https://your-instance.uipath.com
   VITE_UIPATH_ORG_NAME=your-organization-name
   VITE_UIPATH_TENANT_NAME=your-tenant-name
   VITE_UIPATH_CLIENT_ID=your-oauth-client-id
   VITE_UIPATH_REDIRECT_URI=http://localhost:3000
   VITE_UIPATH_SCOPE=OR.Execution OR.Assets OR.Tasks
   ```

4. **Start development server**
   ```bash
   bun run dev
   ```

   The application will be available at `http://localhost:3000`

## UiPath OAuth Setup

To use this application, you need to configure an OAuth application in your UiPath Orchestrator:

1. **Navigate to Admin > External Applications** in UiPath Orchestrator
2. **Create a new External Application** with the following settings:
   - **Application Type**: Confidential Client
   - **Grant Types**: Authorization Code
   - **Redirect URIs**: Add your application URL (e.g., `http://localhost:3000` for development)
   - **Scopes**: Select appropriate scopes (OR.Execution, OR.Assets, OR.Tasks, etc.)
3. **Copy the Client ID** and add it to your `.env` file
4. **Configure the redirect URI** to match your application URL

## Usage

### Resources Tab

The Resources tab displays two main sections:

**Processes Section**
- View all available processes from your UiPath Orchestrator
- Filter by status (Available, Running, Failed) or folder
- Search processes by name
- Start processes directly from the interface
- View process details including version, last run time, and folder

**Assets Section**
- Browse all assets in your environment
- View asset type, value (with security masking for credentials), and folder
- Filter and search assets by name or type
- View last modified dates and asset metadata

### Action Center Tab

The Action Center tab provides comprehensive task management:

- **View Tasks**: See all tasks organized by status (Pending, In Progress, Completed)
- **Filter Options**: Filter by priority, status, assignment state, or search by title
- **Task Assignment**: Assign tasks to users through the assignment dialog
- **Task Completion**: Complete tasks with appropriate forms based on task type
- **Real-time Updates**: Automatic refresh to show current task status

### Navigation

- Use the tab navigation to switch between Resources and Action Center
- Apply filters using the dropdown menus and search inputs
- Use pagination controls to navigate through large datasets
- Refresh data manually or rely on automatic refresh intervals

## Development

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── uipath/         # UiPath-specific components
├── hooks/              # React Query hooks for UiPath services
├── lib/                # Utility functions and UiPath SDK configuration
├── pages/              # Application pages
└── contexts/           # React contexts for authentication
```

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run lint` - Run ESLint

### Development Guidelines

1. **Authentication**: Always use the `UiPathAuthProvider` and `useUiPathAuth` hook
2. **Data Fetching**: Use the provided React Query hooks (never create mock data)
3. **UI Components**: Prefer shadcn/ui components and follow the design system
4. **Error Handling**: Implement proper loading states and error boundaries
5. **TypeScript**: Use proper types from the UiPath SDK

### Adding New Features

1. **Create hooks** in `src/hooks/` for new UiPath services
2. **Add components** in `src/components/uipath/` for UiPath-specific UI
3. **Follow patterns** established in existing code
4. **Test thoroughly** with real UiPath data

## Deployment

### Cloudflare Pages

This application is optimized for deployment on Cloudflare Pages:

[cloudflarebutton]

**Manual Deployment:**

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Deploy to Cloudflare Pages**
   - Connect your repository to Cloudflare Pages
   - Set build command: `bun run build`
   - Set build output directory: `dist`
   - Add environment variables in Cloudflare Pages dashboard

3. **Configure environment variables** in Cloudflare Pages:
   - Add all `VITE_UIPATH_*` variables from your `.env` file
   - Update `VITE_UIPATH_REDIRECT_URI` to your production URL

### Other Static Hosts

The built application (`dist/` directory) can be deployed to any static hosting service:

- **Vercel**: Connect repository and deploy
- **Netlify**: Drag and drop `dist/` folder or connect repository
- **GitHub Pages**: Use GitHub Actions to build and deploy

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_UIPATH_BASE_URL` | Your UiPath Orchestrator instance URL | Yes |
| `VITE_UIPATH_ORG_NAME` | Organization name in UiPath | Yes |
| `VITE_UIPATH_TENANT_NAME` | Tenant name in UiPath | Yes |
| `VITE_UIPATH_CLIENT_ID` | OAuth client ID from External App | Yes |
| `VITE_UIPATH_REDIRECT_URI` | OAuth redirect URI | Optional |
| `VITE_UIPATH_SCOPE` | OAuth scopes | Optional |

### Customization

- **Branding**: Update colors in `tailwind.config.js`
- **Refresh Intervals**: Modify intervals in React Query hooks
- **Folder Context**: Configure default folder IDs in components
- **UI Components**: Customize shadcn/ui components in `src/components/ui/`

## Troubleshooting

### Common Issues

**Authentication Errors**
- Verify OAuth configuration in UiPath Orchestrator
- Check that redirect URI matches exactly
- Ensure client ID is correct

**Data Not Loading**
- Confirm UiPath Orchestrator is accessible
- Check network connectivity
- Verify user permissions in UiPath

**Build Errors**
- Run `bun install` to ensure dependencies are installed
- Check TypeScript errors with proper UiPath SDK types
- Verify environment variables are set correctly

### Support

For issues related to:
- **UiPath SDK**: Check UiPath documentation and community forums
- **Application bugs**: Create an issue in the repository
- **Deployment**: Refer to Cloudflare Pages documentation

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the development guidelines
4. Test thoroughly with real UiPath data
5. Submit a pull request

## Acknowledgments

- Built with the official UiPath TypeScript SDK
- UI components powered by shadcn/ui
- Deployed on Cloudflare Pages