import { createApiClient, schemas } from "../../generators/zod-client/index";

// Create Zodios client
const api = createApiClient("http://localhost:3001");

// Demo functions
export async function demonstrateZodClient() {
  console.log("=== Zodios Client Demo ===");
  
  try {
    // List users
    console.log("Fetching users...");
    const users = await api.listUsers({ queries: { limit: 10 } });
    console.log("Users:", users);
    
    // Get specific user
    console.log("Fetching user by ID...");
    const user = await api.getUserById({ params: { id: "123e4567-e89b-12d3-a456-426614174000" } });
    console.log("User:", user);
    
    // Create user
    console.log("Creating user...");
    await api.createUser({ 
      body: {
        email: "new@example.com",
        name: "New User",
        role: "user"
      }
    });
    console.log("User created successfully");
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Type examples
export type UserType = typeof schemas.User._output;
export type UsersListType = typeof schemas.UsersListResponse._output;

export { api as zodiosClient };