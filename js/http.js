const token = "5524e2d6bdbbcf5a52c74ef8fa9899573c083887";
const baseURL = "https:api.github.com/graphql";
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
const data = {
    "data": {
      "user": {
        "repositories": {
          "nodes": [
            {
              "name": "github-clone",
              "updatedAt": "2020-11-30T21:49:48Z",
              "description": "A clone of github's repository tab with just HTML, CSS and JavaScript",
              "primaryLanguage": {
                "name": "HTML",
                "color": "#e34c26"
              }
            },
            {
              "name": "sample-node-js-project-structure",
              "updatedAt": "2020-06-16T14:49:38Z",
              "description": null,
              "primaryLanguage": {
                "name": "JavaScript",
                "color": "#f1e05a"
              }
            },
            {
              "name": "demo-nuxt-app",
              "updatedAt": "2020-04-09T10:15:35Z",
              "description": null,
              "primaryLanguage": {
                "name": "Vue",
                "color": "#2c3e50"
              }
            },
            {
              "name": "react-native-navigation-skeleton-project",
              "updatedAt": "2019-11-25T13:44:46Z",
              "description": null,
              "primaryLanguage": {
                "name": "JavaScript",
                "color": "#f1e05a"
              }
            },
            {
              "name": "peexoo",
              "updatedAt": "2019-11-08T14:32:43Z",
              "description": null,
              "primaryLanguage": {
                "name": "Vue",
                "color": "#2c3e50"
              }
            },
            {
              "name": "intelligent-innovations-demo",
              "updatedAt": "2019-09-10T15:20:44Z",
              "description": "intelligent-innovations-demo",
              "primaryLanguage": {
                "name": "Vue",
                "color": "#2c3e50"
              }
            },
            {
              "name": "eclatexam",
              "updatedAt": "2019-04-10T04:39:30Z",
              "description": "A Computer-based Testing app for fun",
              "primaryLanguage": {
                "name": "PHP",
                "color": "#4F5D95"
              }
            },
            {
              "name": "yearbook",
              "updatedAt": "2019-04-10T04:49:08Z",
              "description": "An electronic yearbook for former classmates to update their profiles and keep up with themselves",
              "primaryLanguage": {
                "name": "CSS",
                "color": "#563d7c"
              }
            },
            {
              "name": "cordova-gallery-api",
              "updatedAt": "2018-07-01T07:22:35Z",
              "description": "API to play with media gallery.",
              "primaryLanguage": {
                "name": "Java",
                "color": "#b07219"
              }
            },
            {
              "name": "fabric8",
              "updatedAt": "2018-06-08T18:03:18Z",
              "description": "Software for modelling and designing garments ",
              "primaryLanguage": {
                "name": "JavaScript",
                "color": "#f1e05a"
              }
            },
            {
              "name": "child-ish",
              "updatedAt": "2018-03-01T10:43:23Z",
              "description": "AR/VR open source solution for diagnosis of diseases with Machine Learning, and solving common maternity problems",
              "primaryLanguage": {
                "name": "C#",
                "color": "#178600"
              }
            },
            {
              "name": "childish",
              "updatedAt": "2018-03-01T10:15:43Z",
              "description": "AR/VR open source solution for diagnosis of diseases with Machine Learning, and solving common maternity problems",
              "primaryLanguage": null
            }
          ]
        }
      }
    }
  }
const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`
}
const body = {
    "query": `
        {
            user(login: "jayolin") {
                repositories(last: 20, orderBy: {field: CREATED_AT, direction: DESC}, privacy: PUBLIC) {
                nodes {
                    name
                    updatedAt
                    description,
                    primaryLanguage{
                        name,
                        color
                    }
                }
                }
            }
        }
    `
}

const populateUI = (result) => {
    let repositories = result.data.user.repositories.nodes;
    let divs = document.getElementsByClassName('repositories-count');
    [].slice.call( divs ).forEach(function ( div ) {
        div.innerHTML = repositories.length;
    });

    for(let i = 0; i < repositories.length; i++){
        const repository = repositories[i];
        let dateUpdatedAt = new Date(repository.updatedAt);
        //create element from dummy one
        let element = document.querySelector('#repository-list-item').cloneNode(true);
        element.setAttribute('id', `repository-${i}`);
        element.style.display = 'block';
        element.querySelector('.name').innerHTML = repository.name;
        element.querySelector('.description').innerHTML = repository.description || '';
        element.querySelector('.date').innerHTML = `${dateUpdatedAt.getDate()} ${monthNames[dateUpdatedAt.getMonth()]}`;
        element.querySelector('.primary-language').innerHTML = repository.primaryLanguage && repository.primaryLanguage.name;
        element.querySelector('.color').style.backgroundColor = repository.primaryLanguage && repository.primaryLanguage.color;

        //add to dom
        document.querySelector('#repositories-list').appendChild(element);

    }
}

fetch(baseURL, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
}).then((res)=> res.json()).then((result) => {

    populateUI(result)
    

}).catch(e => {
    populateUI(data)
})

