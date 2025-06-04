import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { serve } from '@hono/node-server';

// Zod schemas for request/response validation
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.string().datetime(),
  isActive: z.boolean(),
  metadata: z.record(z.string()).optional(),
});

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['admin', 'user', 'guest']).default('user'),
  metadata: z.record(z.string()).optional(),
});

const UpdateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  role: z.enum(['admin', 'user', 'guest']).optional(),
  isActive: z.boolean().optional(),
  metadata: z.record(z.string()).optional(),
});

const ErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  code: z.number(),
  details: z.record(z.any()).optional(),
});

const ValidationErrorSchema = z.object({
  error: z.literal('validation_error'),
  message: z.string(),
  code: z.literal(400),
  details: z.object({
    issues: z.array(z.object({
      path: z.array(z.string()),
      message: z.string(),
      code: z.string(),
    })),
  }),
});

const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  total: z.number().int(),
  totalPages: z.number().int(),
});

const UsersListSchema = z.object({
  users: z.array(UserSchema),
  pagination: PaginationSchema,
});

// Mock data
let users: z.infer<typeof UserSchema>[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
    metadata: { department: 'Engineering' }
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'admin',
    createdAt: '2024-01-02T00:00:00Z',
    isActive: true,
  },
];

const app = new OpenAPIHono();

// GET /users - List users with pagination
const listUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List all users',
  description: 'Retrieve a paginated list of users with optional filtering',
  request: {
    query: z.object({
      page: z.string().transform(Number).pipe(z.number().int().min(1)).default('1'),
      limit: z.string().transform(Number).pipe(z.number().int().min(1).max(100)).default('10'),
      role: z.enum(['admin', 'user', 'guest']).optional(),
      isActive: z.string().transform(val => val === 'true').pipe(z.boolean()).optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UsersListSchema,
        },
      },
      description: 'List of users retrieved successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
        },
      },
      description: 'Invalid query parameters',
    },
  },
});

app.openapi(listUsersRoute, (c) => {
  const { page, limit, role, isActive } = c.req.valid('query');
  
  let filteredUsers = users;
  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }
  if (isActive !== undefined) {
    filteredUsers = filteredUsers.filter(user => user.isActive === isActive);
  }
  
  const total = filteredUsers.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  return c.json({
    users: paginatedUsers,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
});

// GET /users/{id} - Get user by ID
const getUserRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Get user by ID',
  description: 'Retrieve a specific user by their unique identifier',
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'User found and returned successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
        },
      },
      description: 'Invalid user ID format',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'User not found',
    },
  },
});

app.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid('params');
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return c.json({
      error: 'not_found',
      message: 'User not found',
      code: 404,
    }, 404);
  }
  
  return c.json(user);
});

// POST /users - Create new user
const createUserRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Create new user',
  description: 'Create a new user with the provided information',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'User created successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
        },
      },
      description: 'Invalid user data',
    },
    409: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'User with email already exists',
    },
  },
});

app.openapi(createUserRoute, (c) => {
  const userData = c.req.valid('json');
  
  // Check if user with email already exists
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    return c.json({
      error: 'conflict',
      message: 'User with this email already exists',
      code: 409,
    }, 409);
  }
  
  const newUser: z.infer<typeof UserSchema> = {
    id: crypto.randomUUID(),
    email: userData.email,
    name: userData.name,
    role: userData.role,
    createdAt: new Date().toISOString(),
    isActive: true,
    metadata: userData.metadata,
  };
  
  users.push(newUser);
  return c.json(newUser, 201);
});

// PUT /users/{id} - Update user
const updateUserRoute = createRoute({
  method: 'put',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Update user',
  description: 'Update an existing user with new information',
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdateUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'User updated successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
        },
      },
      description: 'Invalid user ID or data',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'User not found',
    },
  },
});

app.openapi(updateUserRoute, (c) => {
  const { id } = c.req.valid('params');
  const updateData = c.req.valid('json');
  
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return c.json({
      error: 'not_found',
      message: 'User not found',
      code: 404,
    }, 404);
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...updateData,
  };
  
  return c.json(users[userIndex]);
});

// DELETE /users/{id} - Delete user
const deleteUserRoute = createRoute({
  method: 'delete',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Delete user',
  description: 'Delete a user by their unique identifier',
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    204: {
      description: 'User deleted successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
        },
      },
      description: 'Invalid user ID format',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'User not found',
    },
  },
});

app.openapi(deleteUserRoute, (c) => {
  const { id } = c.req.valid('params');
  
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return c.json({
      error: 'not_found',
      message: 'User not found',
      code: 404,
    }, 404);
  }
  
  users.splice(userIndex, 1);
  return c.body(null, 204);
});

// OpenAPI documentation endpoint
app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'User Management API',
    description: 'A comprehensive API for managing users with full CRUD operations',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
});

// Export the app for testing
export { app };

// Start server only if this file is run directly
if (import.meta.main) {
  console.log('Starting User Management API server...');
  serve({
    fetch: app.fetch,
    port: 3001,
  });
  console.log('Server running on http://localhost:3001');
  console.log('OpenAPI spec available at http://localhost:3001/openapi.json');
}