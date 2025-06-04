import { createClient } from '@hey-api/client-fetch';
import { listUsers, createUser, getUserById } from '../../generators/hey-api/sdk.gen';

// Create client with base URL
const client = createClient({
  baseUrl: 'http://localhost:3001'
});

// Demo functions
export async function demonstrateHeyApiClient() {
  console.log("=== Hey API Client Demo ===");
  
  try {
    // List users
    console.log("Fetching users...");
    const usersResponse = await listUsers({ 
      client,
      query: { limit: 10 }
    });
    
    if (usersResponse.data) {
      console.log("Users:", usersResponse.data);
    }
    
    // Get specific user
    console.log("Fetching user by ID...");
    const userResponse = await getUserById({ 
      client,
      path: { id: "123e4567-e89b-12d3-a456-426614174000" }
    });
    
    if (userResponse.data) {
      console.log("User:", userResponse.data);
    }
    
    // Create user
    console.log("Creating user...");
    const createResponse = await createUser({ 
      client,
      body: {
        email: "new@example.com",
        name: "New User",
        role: "user"
      }
    });
    console.log("User created successfully:", createResponse);
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Type examples - re-export for convenience
export type { User, UsersListResponse } from '../../generators/hey-api/types.gen';

export { client as heyApiClient };