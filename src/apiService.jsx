// // const BaseUrl = "http://127.0.0.1:8000/api";

// // // Flag to prevent multiple redirects
// // let isRedirecting = false;

// // const ApiService = async (endpoint, method, data = null, isFormData = false) => {
// //   try {
// //     const options = {
// //       method,
// //       headers: {
// //         Accept: "application/json",
// //         ...(localStorage.getItem("bizwizusertoken") && {
// //           Authorization: `Bearer ${localStorage.getItem("bizwizusertoken")}`,
// //         }),
// //       },
// //     };

// //     if (!isFormData) {
// //       options.headers["Content-Type"] = "application/json";
// //     }

// //     if (method !== "GET" && data) {
// //       options.body = isFormData ? data : JSON.stringify(data);
// //     }

// //     const response = await fetch(`${BaseUrl}${endpoint}`, options);
// //     const responseData = await response.json();

// //     if (!response.ok) {
// //       if (response.status === 401) {
// //         // Handle authentication errors
// //         handleAuthError();
// //         throw { response: { status: 401, data: responseData } };
// //       }

// //       // Handle validation or server errors
// //       if (responseData.errors) {
// //         throw {
// //           response: { status: response.status, data: responseData },
// //           message: responseData.message || "Validation failed",
// //         };
// //       }

// //       // For other errors, use the message from the server if available
// //       throw {
// //         response: { status: response.status, data: responseData },
// //         message: responseData.message || "Something went wrong!",
// //       };
// //     }

// //     return responseData;
// //   } catch (error) {
// //     // If we already created a structured error with response data, pass it through
// //     if (error.response) {
// //       throw error;
// //     }

// //     if (error.message === "Failed to fetch") {
// //       throw new Error("Network error, please check your internet connection.");
// //     }

// //     throw new Error(error.message || "An unexpected error occurred");
// //   }
// // };

// // // Function to handle authentication errors
// // function handleAuthError() {
// //   // Prevent multiple redirects
// //   if (!isRedirecting) {
// //     isRedirecting = true;

// //     // Clear auth token
// //     localStorage.removeItem("bizwizusertoken");

// //     // Redirect to login page
// //     window.location.href = "/userlogin";

// //     // Reset flag after a delay (in case operation is canceled)
// //     setTimeout(() => {
// //       isRedirecting = false;
// //     }, 5000);
// //   }
// // }

// // export default ApiService;




// const BaseUrl = "http://127.0.0.1:8000/api";

// // Flag to prevent multiple redirects
// let isRedirecting = false;

// const ApiService = async (endpoint, method, data = null, isFormData = false, token = null) => {
//   try {
//     const options = {
//       method,
//       headers: {
//         Accept: "application/json",
//         ...(token && {
//           Authorization: `Bearer ${token}`,
//         }),
//       },
//     };

//     if (!isFormData) {
//       options.headers["Content-Type"] = "application/json";
//     }

//     if (method !== "GET" && data) {
//       options.body = isFormData ? data : JSON.stringify(data);
//     }

//     console.log('Request options:', options); // Debug log

//     const response = await fetch(`${BaseUrl}${endpoint}`, options);
//     const responseData = await response.json();

//     console.log('Response data:', responseData); // Debug log

//     if (!response.ok) {
//       if (response.status === 401) {
//         // Handle authentication errors
//         handleAuthError();
//         throw { response: { status: 401, data: responseData } };
//       }

//       // Handle validation or server errors
//       if (responseData.errors) {
//         throw {
//           response: { status: response.status, data: responseData },
//           message: responseData.message || "Validation failed",
//         };
//       }

//       // For other errors, use the message from the server if available
//       throw {
//         response: { status: response.status, data: responseData },
//         message: responseData.message || "Something went wrong!",
//       };
//     }

//     return responseData;
//   } catch (error) {
//     // If we already created a structured error with response data, pass it through
//     if (error.response) {
//       throw error;
//     }

//     if (error.message === "Failed to fetch") {
//       throw new Error("Network error, please check your internet connection.");
//     }

//     throw new Error(error.message || "An unexpected error occurred");
//   }
// };

// // Function to handle authentication errors
// function handleAuthError() {
//   // Prevent multiple redirects
//   if (!isRedirecting) {
//     isRedirecting = true;

//     // Clear auth token
//     localStorage.removeItem("bizwizusertoken");

//     // Redirect to login page
//     window.location.href = "/userlogin";

//     // Reset flag after a delay (in case operation is canceled)
//     setTimeout(() => {
//       isRedirecting = false;
//     }, 5000);
//   }
// }

// export default ApiService;



// const BaseUrl = "http://127.0.0.1:8000/api";

// // Flag to prevent multiple redirects
// let isRedirecting = false;

// const ApiService = async (endpoint, method, data = null, isFormData = false, token = null) => {
//   try {
//     // If no token provided, get from localStorage
//     const authToken = token || localStorage.getItem("bizwizusertoken");
    
//     const options = {
//       method,
//       headers: {
//         Accept: "application/json",
//         ...(authToken && {
//           Authorization: `Bearer ${authToken}`,
//         }),
//       },
//     };

//     if (!isFormData) {
//       options.headers["Content-Type"] = "application/json";
//     }

//     if (method !== "GET" && data) {
//       options.body = isFormData ? data : JSON.stringify(data);
//     }

//     console.log('Request options:', options); // Debug log

//     const response = await fetch(`${BaseUrl}${endpoint}`, options);
//     const responseData = await response.json();

//     console.log('Response data:', responseData); // Debug log

//     if (!response.ok) {
//       if (response.status === 401) {
//         // Handle authentication errors
//         handleAuthError();
//         throw { response: { status: 401, data: responseData } };
//       }

//       // Handle validation or server errors
//       if (responseData.errors) {
//         throw {
//           response: { status: response.status, data: responseData },
//           message: responseData.message || "Validation failed",
//         };
//       }

//       // For other errors, use the message from the server if available
//       throw {
//         response: { status: response.status, data: responseData },
//         message: responseData.message || "Something went wrong!",
//       };
//     }

//     return responseData;
//   } catch (error) {
//     console.error('Fetch error from ' + BaseUrl + endpoint + ':', error.message || error);
    
//     // If we already created a structured error with response data, pass it through
//     if (error.response) {
//       throw error;
//     }

//     if (error.message === "Failed to fetch") {
//       throw new Error("Network error, please check your internet connection.");
//     }

//     throw new Error(error.message || "An unexpected error occurred");
//   }
// };

// // Function to handle authentication errors
// function handleAuthError() {
//   // Prevent multiple redirects
//   if (!isRedirecting) {
//     isRedirecting = true;

//     // Clear auth token
//     localStorage.removeItem("bizwizusertoken");

//     // Redirect to login page
//     window.location.href = "/userlogin";

//     // Reset flag after a delay (in case operation is canceled)
//     setTimeout(() => {
//       isRedirecting = false;
//     }, 5000);
//   }
// }

// export default ApiService;



const BaseUrl = "/api";

// Flag to prevent multiple redirects
let isRedirecting = false;

const ApiService = async (endpoint, method, data = null, isFormData = false, token = null) => {
  try {
    // If no token provided, get from localStorage
    const authToken = token || localStorage.getItem("bizwizusertoken");
    
    const options = {
      method,
      headers: {
        Accept: "application/json",
        ...(authToken && {
          Authorization: `Bearer ${authToken}`,
        }),
      },
    };

    if (!isFormData) {
      options.headers["Content-Type"] = "application/json";
    }

    if (method !== "GET" && data) {
      options.body = isFormData ? data : JSON.stringify(data);
    }

    const response = await fetch(`${BaseUrl}${endpoint}`, options);
    const responseData = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        handleAuthError();
        throw { response: { status: 401, data: responseData } };
      }

      if (responseData.errors) {
        throw {
          response: { status: response.status, data: responseData },
          message: responseData.message || "Validation failed",
        };
      }

      throw {
        response: { status: response.status, data: responseData },
        message: responseData.message || "Something went wrong!",
      };
    }

    return responseData;
  } catch (error) {
    if (error.response) {
      throw error;
    }

    if (error.message === "Failed to fetch") {
      throw new Error("Network error, please check your internet connection.");
    }

    throw new Error(error.message || "An unexpected error occurred");
  }
};

// Function to handle authentication errors
function handleAuthError() {
  if (!isRedirecting) {
    isRedirecting = true;
    localStorage.removeItem("bizwizusertoken");
    window.location.href = "/userlogin";
    setTimeout(() => {
      isRedirecting = false;
    }, 5000);
  }
}

export default ApiService;
