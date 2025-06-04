import { createClient } from '@hey-api/client-fetch';
import { listPets, createPets, showPetById } from '../../generators/hey-api/sdk.gen';
import { 
  zPet, 
  zPets, 
  zListPetsResponse, 
  zShowPetByIdResponse,
  zListPetsParameterLimit,
  zShowPetByIdParameterPetId 
} from '../../generators/hey-api-zod/zod.gen';
import type { Pet, Pets } from '../../generators/hey-api/types.gen';

// Create client with base URL
const client = createClient({
  baseUrl: 'http://petstore.swagger.io/v1'
});

// Demo functions with Zod validation
export async function demonstrateHeyApiZodClient() {
  console.log("=== Hey API + Zod Client Demo ===");
  
  try {
    // List pets with parameter validation
    console.log("Fetching pets...");
    const limit = 10;
    
    // Validate request parameter
    const validatedLimit = zListPetsParameterLimit.parse(limit);
    console.log("Validated limit:", validatedLimit);
    
    const petsResponse = await listPets({ 
      client,
      query: { limit: validatedLimit }
    });
    
    if (petsResponse.data) {
      // Validate response data
      const validatedPets = zListPetsResponse.parse(petsResponse.data);
      console.log("Validated pets response:", validatedPets);
      console.log("Pets:", petsResponse.data);
    }
    
    // Get specific pet with path parameter validation
    console.log("Fetching pet by ID...");
    const petId = "1";
    
    // Validate path parameter
    const validatedPetId = zShowPetByIdParameterPetId.parse(petId);
    console.log("Validated petId:", validatedPetId);
    
    const petResponse = await showPetById({ 
      client,
      path: { petId: validatedPetId }
    });
    
    if (petResponse.data) {
      // Validate response data
      const validatedPet = zShowPetByIdResponse.parse(petResponse.data);
      console.log("Validated pet response:", validatedPet);
      console.log("Pet:", petResponse.data);
    }
    
    // Create pet (this will likely fail since we're using a mock API)
    console.log("Creating pet...");
    const createResponse = await createPets({ client });
    console.log("Pet created successfully:", createResponse);
    
    // Example of manual data validation
    console.log("Manual data validation examples...");
    
    // Valid pet data
    const validPetData = {
      id: BigInt(123),
      name: "Fluffy",
      tag: "cat"
    };
    
    const validatedPetData = zPet.parse(validPetData);
    console.log("Valid pet data:", validatedPetData);
    
    // Invalid pet data (will throw)
    try {
      const invalidPetData = {
        id: "not-a-number", // This should be a number/bigint
        name: "Fluffy"
        // missing required 'name' field in some cases
      };
      zPet.parse(invalidPetData);
    } catch (validationError) {
      console.log("Caught validation error:", validationError);
    }
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Utility functions for validation
export function validatePetData(data: unknown): Pet {
  return zPet.parse(data) as Pet;
}

export function validatePetsData(data: unknown): Pets {
  return zPets.parse(data) as Pets;
}

export function safeParsePet(data: unknown) {
  return zPet.safeParse(data);
}

export function safeParsePets(data: unknown) {
  return zPets.safeParse(data);
}

// Type examples - combining Hey API types with Zod validation
export type ValidatedPet = typeof zPet._output;
export type ValidatedPets = typeof zPets._output;

// Re-export for convenience
export type { Pet, Pets } from '../../generators/hey-api/types.gen';
export { 
  zPet, 
  zPets, 
  zListPetsResponse, 
  zShowPetByIdResponse 
} from '../../generators/hey-api-zod/zod.gen';

export { client as heyApiZodClient };