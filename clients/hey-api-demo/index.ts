import { createClient } from '@hey-api/client-fetch';
import { listPets, createPets, showPetById } from '../../generators/hey-api/sdk.gen';

// Create client with base URL
const client = createClient({
  baseUrl: 'http://petstore.swagger.io/v1'
});

// Demo functions
export async function demonstrateHeyApiClient() {
  console.log("=== Hey API Client Demo ===");
  
  try {
    // List pets
    console.log("Fetching pets...");
    const petsResponse = await listPets({ 
      client,
      query: { limit: 10 }
    });
    
    if (petsResponse.data) {
      console.log("Pets:", petsResponse.data);
    }
    
    // Get specific pet
    console.log("Fetching pet by ID...");
    const petResponse = await showPetById({ 
      client,
      path: { petId: "1" }
    });
    
    if (petResponse.data) {
      console.log("Pet:", petResponse.data);
    }
    
    // Create pet (this will likely fail since we're using a mock API)
    console.log("Creating pet...");
    const createResponse = await createPets({ client });
    console.log("Pet created successfully:", createResponse);
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Type examples - re-export for convenience
export type { Pet, Pets } from '../../generators/hey-api/types.gen';

export { client as heyApiClient };