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

// Task 2: Chaining Promises
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
            console.error('Error in fetching data sequentially:', error);
            throw error;
        });
}

// Optional: Extending fetchSequentialData to handle any size of URLs array
// function fetchSequentialData(urls) {
//     let results = [];
//     let promise = Promise.resolve();

//     urls.forEach(url => {
//         promise = promise
//             .then(() => fetchData(url))
//             .then(result => results.push(result))
//             .catch(error => {
//                 console.error('Error in fetching data sequentially:', error);
//                 throw error;
//             });
//     });

//     return promise.then(() => results);
// }

// Task 3: Multiple Promises (Fetching data concurrently)
function fetchAllData(urls) {
    const promises = urls.map(url => fetchData(url));

    return Promise.all(promises)
        .then(results => results)
        .catch(error => {
            console.error('Error in fetching data concurrently:', error);
            throw error;
        });
}

// Task 4: Power of Async (Using async/await for sequential fetching)
async function fetchSequentialDataAsync(urls) {
    try {
        let results = [];
        const result1 = await fetchData(urls[0]);
        results.push(result1);
        const result2 = await fetchData(urls[1]);
        results.push(result2);
        return results;
    } catch (error) {
        console.error('Error in fetching data asynchronously:', error);
        throw error;
    }
}

// Export the functions for auto-testing
module.exports = {
    fetchData,
    fetchSequentialData,
    fetchAllData,
    fetchSequentialDataAsync,
};
