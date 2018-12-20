const axios = require('axios');

axios.get('https://api.github.com/users/jsisaacs/events/public')
    .then(function (response) {
        const data = response.data;
        const mostRecentEvents = data.slice(0, 5);
        
        mostRecentEvents.map(event => {
            console.log(event.repo.name);
            console.log(event.payload.commits[0].message);
            console.log(event.created_at);
            console.log('---');
        });
    })
    .catch(function (error) {
        console.log(error);
    });