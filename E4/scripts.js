// Task 1: Understanding Promises
function fetchData(url) {
    return new Promise((resolve, reject) => {
        if (!url.startsWith('http')) {
            reject(new Error('Invalid URL'));
            return;
        }

        // Simulate a random delay between 1-3 seconds
        const delay = Math.floor(Math.random() * 2000) + 1000;

        setTimeout(() => {
            const response = { data: `Response from ${url}` }; // Simulated response
            resolve(response);
        }, delay);
    });
}

// Task 2: Chaining Promises (with improved error handling)
function fetchSequentialData(urls) {
    let results = [];
    return fetchData(urls[0])
        .then(result1 => {
            results.push(result1);
            return fetchData(urls[1]);
        })
        .then(result2 => {
            results.push(result2);
            return results;
        })
        .catch(error => {
            console.error('Error during sequential fetching:', error);
            return results; // Return partial results or handle it as per requirement
        });
}

// Task 3: Multiple Promises (fetching concurrently, with error handling)
function fetchAllData(urls) {
    const promises = urls.map(url => fetchData(url).catch(error => ({ error: error.message }))); // Capture errors without breaking the flow

    return Promise.all(promises)
        .then(results => results)
        .catch(error => {
            console.error('Error in concurrent fetching:', error);
            throw error;
        });
}

// Task 4: Async/Await for Sequential Fetching (with error handling)
async function fetchSequentialDataAsync(urls) {
    try {
        let results = [];
        const result1 = await fetchData(urls[0]);
        results.push(result1);
        const result2 = await fetchData(urls[1]);
        results.push(result2);
        return results;
    } catch (error) {
        console.error('Error during async sequential fetching:', error);
        throw error; // Or handle error as per your logic
    }
}

// Export the functions for auto-testing
module.exports = {
    fetchData,
    fetchSequentialData,
    fetchAllData,
    fetchSequentialDataAsync,
};
