# CRUD Implementation Guide

## Overview
The leads management application now has full CRUD (Create, Read, Update, Delete) functionality implemented with proper state management using Pinia stores and API integration.

## Key Changes Made

### 1. Store Integration
- **Lead Store** (`src/stores/leadStore.js`): Handles all lead-related operations
- **Auth Store** (`src/stores/authStore.js`): Manages authentication state
- Removed all mock data from components
- Added proper error handling and loading states

### 2. Component Updates

#### TheLeadsGrid.vue
- Integrated with `useLeadStore()` to display real data from API
- Added loading indicators and error messages
- Implemented proper CRUD operations:
  - **Read**: Fetches leads on component mount
  - **Update**: Edit functionality through modal
  - **Delete**: Delete confirmation through modal
- Added refresh button to manually reload data
- Fixed date formatting for API response format

#### TheLeadsForm.vue
- Integrated with `useLeadStore()` for create/update operations
- Added loading states and success/error messages
- **Create**: Submits new leads to API
- **Update**: Updates existing leads via API
- Form validation and proper error handling

#### TheLeadsModal.vue
- Updated to work with real data structure
- Fixed date field references (created_at, updated_at)
- Proper integration with form component for editing

### 3. Authentication
- Added `LoginView.vue` for user authentication
- Updated router with authentication guards
- Added app bar with logout functionality
- Proper token management in localStorage

### 4. API Integration
All CRUD operations now interact with the backend API:

#### CREATE (POST /api/leads)
```javascript
await leadStore.createLead({
  name: 'Lead Name',
  email: 'email@example.com',
  lead_source: 'Website',
  lead_status: 'New'
})
```

#### READ (GET /api/leads)
```javascript
await leadStore.fetchLeads()
// With optional filters
await leadStore.fetchLeads({ lead_status: 'New' })
```

#### UPDATE (PUT /api/leads/:id)
```javascript
await leadStore.updateLead(leadId, {
  name: 'Updated Name',
  email: 'updated@example.com',
  lead_source: 'Referral',
  lead_status: 'In Progress'
})
```

#### DELETE (DELETE /api/leads/:id)
```javascript
await leadStore.deleteLead(leadId)
```

## How to Use the Application

### 1. Authentication
- Navigate to `/login` if not authenticated
- Enter valid credentials to access the application
- Use logout button in the top-right corner to sign out

### 2. Viewing Leads
- Main page (`/`) displays all leads in a data table
- Search functionality to filter leads
- View lead details by clicking the eye icon
- Refresh button to reload data from API

### 3. Creating Leads
- Click "Add New Lead" button
- Fill in the form with required information:
  - Lead Name (required, min 3 characters)
  - Email (required, valid email format)
  - Lead Source (required, min 3 characters)
  - Lead Status (required, min 3 characters)
- Click "Save Lead" to create the new lead
- Success message will appear and redirect to leads list

### 4. Editing Leads
- Click the pencil icon next to any lead in the table
- Modal opens with pre-filled form
- Make changes and click "Update Lead"
- Changes are saved to the database and reflected immediately

### 5. Deleting Leads
- Click the delete icon next to any lead
- Confirmation modal appears
- Click "Delete" to permanently remove the lead
- Lead is removed from both database and local state

## Error Handling
- Network errors are displayed as alert messages
- Form validation prevents invalid data submission
- Loading states provide user feedback during operations
- Authentication errors redirect to login page

## State Management
- All application state is managed through Pinia stores
- Real-time updates when data changes
- Optimistic UI updates for better user experience
- Proper error recovery and state cleanup

## Technical Features
- Proper authentication with JWT tokens
- Request/response interceptors for API calls
- Form validation with real-time feedback
- Responsive design with Vuetify components
- Loading states and error boundaries
- Route guards for protected pages

The application is now fully functional with complete CRUD operations, authentication, and proper state management, ready for production use with a backend API.
