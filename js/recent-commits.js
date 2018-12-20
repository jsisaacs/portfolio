const recentCommitsDiv = document.getElementsByClassName('recent-commits')[0];

const config = {
    'user-agent': 'username: jsisaacs'
  };

axios.get('https://api.github.com/users/jsisaacs/events/public?access_token=2830290cc5daef3c9c05f872d05e38d91940b807')
    .then(function (response) {
        const data = response.data;
        const mostRecentEvents = [];
        
        // get the 5 most recent PushEvents
        data.map(event => {
            if (event.type === 'PushEvent') {
                mostRecentEvents.push(event);
            }
        });

        filteredCommits = mostRecentEvents.slice(0, 5);
        
        filteredCommits.map(event => {
            createdAt = new Date(event.created_at);

            const commitLink = document.createElement('a');
            commitLink.className = 'event-link';
            commitLink.href = 'https://github.com/' + event.repo.name;

            const eventLevel = document.createElement('div');
            eventLevel.id = 'event-commit-level';
            eventLevel.className = 'level is-mobile';

            const levelItem1 = document.createElement('div');
            levelItem1.className = 'level-item';

            const levelItem2 = document.createElement('div');
            levelItem2.className = 'level-item';

            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-div';

            const repoName = document.createElement('p');
            repoName.className = 'event-repo';
            repoName.innerText = event.repo.name;

            const commitMessage = document.createElement('p');
            commitMessage.className = 'event-message';
            commitMessage.innerText = event.payload.commits[0].message;

            const date = document.createElement('p');
            date.className = 'event-date';
            date.innerText = createdAt.toLocaleDateString();

            const time = document.createElement('p');
            time.className = 'event-time';
            time.innerText = createdAt.toLocaleTimeString();

            levelItem1.appendChild(repoName);
            levelItem2.appendChild(date);
            levelItem2.appendChild(time);

            eventLevel.appendChild(levelItem1);
            eventLevel.appendChild(levelItem2);

            eventDiv.appendChild(eventLevel);
            eventDiv.appendChild(commitMessage);

            commitLink.appendChild(eventDiv);

            recentCommitsDiv.appendChild(commitLink);
        });
    })
    .catch(function (error) {
        console.log(error);
    });