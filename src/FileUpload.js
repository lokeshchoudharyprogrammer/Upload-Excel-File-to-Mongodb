import React, { useState } from 'react';
import axios from 'axios'
import { Box, Button, Flex, useToast, Heading, Input, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { AiOutlineCloudUpload } from 'react-icons/ai'; // Importing the cloud upload icon
// import "axios" from 'axios';
// import { useToast } from '@chakra-ui/react'
function CustomFileUpload() {
    const [file, setFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState(null); // State for upload message
    const toast = useToast()

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle file upload logic
            // window.alert("File Upload Successfully")
            if (response.data.message) {
                toast({
                    title: `File ${response.data.message} `,
                    position: 'top-right',
                    isClosable: true,
                })

            } else {

                toast({
                    title: `Data Not uploaded to the server!`,
                    position: 'top-right',
                    isClosable: true,
                })
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <VStack spacing={6} align="center" maxW="300px" m="auto" mt="200px">
            {uploadMessage && (
                <Alert status={uploadMessage.type} variant="solid" w="100%">
                    <AlertIcon />
                    {uploadMessage.text}
                </Alert>
            )}
            <Heading as="h2" size="md">
                Upload Excel File to Mongodb
            </Heading>
            <Box
                p="6"
                borderWidth="2px"
                borderRadius="lg"
                borderStyle="dashed"
                borderColor="#e8e8e8"
                bg="#212121"
                cursor="pointer"
                boxShadow="0px 48px 35px -48px #e8e8e8"
                w="100%"
                textAlign="center"
                onClick={() => document.getElementById('file-input').click()}
            >
                <Flex direction="column" align="center">
                    <Box as={AiOutlineCloudUpload} w="24px" h="24px" color="#e8e8e8" mb="4" />
                    <Text fontSize="sm" fontWeight="400" color="#e8e8e8">
                        Click to upload .xls & .xlsx
                    </Text>
                </Flex>
                <Input
                    id="file-input"
                    type="file"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'blue.400' }}
                    variant="outline"
                    onChange={handleFileChange}
                    display="none"
                    accept=".xls,.xlsx"
                // value={file}
                />
            </Box>
            <Button colorScheme="blue" onClick={handleSubmit} w="100%">
                Upload
            </Button>
        </VStack>
    );
}

export default CustomFileUpload;
