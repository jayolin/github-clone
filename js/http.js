const token = "13fd697a8e5767a5969c856a5b14732a83f1e995";
const baseURL = "https:api.github.com/graphql";
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
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

fetch(baseURL, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
}).then((res)=> res.json()).then((result) => {

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
    

})

