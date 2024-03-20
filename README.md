Sure, here are two separate Markdown (.md) files for the backend and frontend parts of the application:

### Backend API (.md)

```markdown
# Backend API

This document describes the backend API for the file upload functionality.

## Technologies Used

- Node.js
- Express.js
- Multer (for handling file uploads)
- CORS (for Cross-Origin Resource Sharing)

## API Endpoints

### POST /upload

- **Description**: Endpoint for uploading a file.
- **Request Body**: Requires a `file` field in a `multipart/form-data` format.
- **Response**:
  - `200 OK` with a JSON object:
    ```json
    {
      "message": "File uploaded successfully."
    }
    ```
  - `400 Bad Request` if the file upload fails:
    ```json
    {
      "error": "Failed to upload file."
    }
    ```

## Usage

1. Clone the repository or set up a new Node.js project.
2. Install dependencies:

   ```bash
   npm install express multer cors
   ```

3. Create the backend server:

   ```javascript
   // server.js

   const express = require('express');
   const cors = require('cors');
   const multer = require('multer');
   const app = express();
   const port = 5000;

   // Configure CORS
   app.use(cors());

   // Multer configuration for file upload
   const upload = multer({ dest: 'uploads/' });

   // POST /upload endpoint for file upload
   app.post('/upload', upload.single('file'), (req, res) => {
     if (!req.file) {
       return res.status(400).json({ error: 'No file uploaded.' });
     }

     // Handle the file upload logic (save to storage, etc.)

     res.status(200).json({ message: 'File uploaded successfully.' });
   });

   app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
   });
   ```

4. Start the backend server:

   ```bash
   node server.js
   ```

5. Your backend API is now running and ready to accept file upload requests.



### Frontend Component (.md)

# Frontend File Upload Component

This document describes the frontend file upload component.

## Technologies Used

- React.js
- Chakra UI (for styling)

## Component Overview

The frontend component allows users to upload an image file using a custom-styled file upload interface. Upon selecting a file and clicking the "Upload" button, it sends a POST request to the backend API for file upload.

## Usage

1. Clone the repository or set up a new React.js project.
2. Install dependencies:

   npm install @chakra-ui/react framer-motion react-icons axios


3. Create the frontend component:

   ```javascript
   import React, { useState } from 'react';
   import { Box, Button, Flex, Input, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';
   import { AiOutlineCloudUpload } from 'react-icons/ai';
   import axios from 'axios';

   function CustomFileUpload() {
     // Component code here (use the provided code for the frontend component)
   }

   export default CustomFileUpload;
   ```

4. Customize the component as needed for your project.
5. Integrate the component into your React application.
6. Ensure the backend API is running to handle file uploads.

## Component Code

The component code is provided in the previous messages. It includes:

- CustomFileUpload component with Chakra UI styling.
- State management for file selection and upload message.
- Functionality to handle file uploads and display upload messages.

## Component Usage

1. Add the `CustomFileUpload` component to any of your React components where you want to include the file upload functionality.
2. Customize the appearance and behavior of the component using Chakra UI's styling and props.
3. When a user clicks on the "Upload" button, the component will send a POST request to the backend API endpoint for file upload.
4. Upon successful upload, it will display a success message. Otherwise, it will display an error message.

Feel free to modify and integrate this component into your React project.

```

These files provide an overview of the backend API setup and the frontend component usage for the file upload functionality. You can further customize the components and server logic based on your specific requirements.
