import createClient from "openapi-fetch";
import type { paths } from "../../generators/openapi-typescript/schema";

// Create typed client
const client = createClient<paths>({ 
  baseUrl: "http://petstore.swagger.io/v1" 
});

// Demo functions
export async function demonstrateOpenApiTypescriptClient() {
  console.log("=== OpenAPI TypeScript Client Demo ===");
  
  try {
    // List pets
    console.log("Fetching pets...");
    const { data: pets, error: petsError } = await client.GET("/pets", {
      params: {
        query: { limit: 10 }
      }
    });
    
    if (petsError) {
      console.error("Error fetching pets:", petsError);
    } else {
      console.log("Pets:", pets);
    }
    
    // Get specific pet
    console.log("Fetching pet by ID...");
    const { data: pet, error: petError } = await client.GET("/pets/{petId}", {
      params: {
        path: { petId: "1" }
      }
    });
    
    if (petError) {
      console.error("Error fetching pet:", petError);
    } else {
      console.log("Pet:", pet);
    }
    
    // Create pet (this will likely fail since we're using a mock API)
    console.log("Creating pet...");
    const { data: createResult, error: createError } = await client.POST("/pets");
    
    if (createError) {
      console.error("Error creating pet:", createError);
    } else {
      console.log("Pet created successfully:", createResult);
    }
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Type examples
export type Pet = paths["/pets/{petId}"]["get"]["responses"]["200"]["content"]["application/json"];
export type Pets = paths["/pets"]["get"]["responses"]["200"]["content"]["application/json"];
export type CreatePetResponse = paths["/pets"]["post"]["responses"]["201"];

export { client as openApiTypescriptClient };