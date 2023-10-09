document.addEventListener('DOMContentLoaded', () => {
    const responseElement = document.getElementById('response');
  
    // Create button
    document.getElementById('createBtn').addEventListener('click', () => {
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": "JohnDoe", "email": "john@example.com" }),
      })
        .then(response => response.json())
        .then(data => {
          // Display server response
          responseElement.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
          console.error(error);
          responseElement.textContent = 'Error occurred.';
        });
    });
  
    // Read button
    document.getElementById('readBtn').addEventListener('click', () => {
      fetch('/api/users', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          // Display server response
          responseElement.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
          console.error(error);
          responseElement.textContent = 'Error occurred.';
        });
    });
  
    // Update button
    document.getElementById('updateBtn').addEventListener('click', () => {
      const userId = prompt('Enter user ID to update:');
      if (userId) {
        const updatedData = { /* Provide updated data as needed */ };
        fetch(`/api/users/${userId}`, {
          method: 'PUT', // Use PUT or PATCH based on your route definition
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        })
          .then(response => response.json())
          .then(data => {
            // Display server response
            responseElement.textContent = JSON.stringify(data, null, 2);
          })
          .catch(error => {
            console.error(error);
            responseElement.textContent = 'Error occurred.';
          });
      }
    });
  
    // Delete button
    document.getElementById('deleteBtn').addEventListener('click', () => {
      const userId = prompt('Enter user ID to delete:');
      if (userId) {
        fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.status === 204) {
              // Successful deletion (No Content)
              responseElement.textContent = 'User deleted successfully.';
            } else if (response.status === 404) {
              // User not found
              responseElement.textContent = 'User not found.';
            } else {
              // Other errors
              responseElement.textContent = 'Error occurred.';
            }
          })
          .catch(error => {
            console.error(error);
            responseElement.textContent = 'Error occurred.';
          });
      }
    });
  });
  