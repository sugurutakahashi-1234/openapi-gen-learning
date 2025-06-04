import { createApiClient, schemas } from "../../generators/zod-client/index";

// Create Zodios client
const api = createApiClient("http://petstore.swagger.io/v1");

// Demo functions
export async function demonstrateZodClient() {
  console.log("=== Zodios Client Demo ===");
  
  try {
    // List pets
    console.log("Fetching pets...");
    const pets = await api.listPets({ queries: { limit: 10 } });
    console.log("Pets:", pets);
    
    // Get specific pet
    console.log("Fetching pet by ID...");
    const pet = await api.showPetById({ params: { petId: "1" } });
    console.log("Pet:", pet);
    
    // Create pet (this will likely fail since we're using a mock API)
    console.log("Creating pet...");
    await api.createPets(undefined);
    console.log("Pet created successfully");
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Type examples
export type PetType = typeof schemas.Pet._output;
export type PetsType = typeof schemas.Pets._output;

export { api as zodiosClient };