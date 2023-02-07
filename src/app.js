const form = document.querySelector(".search__form");
const input = document.querySelector(".search__form-field");
const card = document.querySelector(".card");


async function getData(username) {
    const data = await fetch(
        'https://api.github.com/users/' + username,
        {method: "GET"}
    )
    if(data.ok) {
        const parsedData = await data.json()
        return parsedData
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    card.innerHTML = "";
    if(input.value !== "") {
        console.log("The user was successfully found")
        getData(input.value).then(data => {
            card.innerHTML = `
            <img 
                class="card__logo"
                src="${data.avatar_url}" 
                alt="${data.login}"
            >
            <h2 class="card__title">
                @${
                    data.login.length > 10
                    ?
                    data.login.slice(0, 10) + "..."
                    :
                    data.login
                }
            </h2>
            <ul class="card__list">
                <li class="card__list-item">
                    <b class="card__subtitle">
                        ID: 
                    </b>
                    ${data.id}
                </li>
                ${
                    data.location !== null 
                    ?
                    `
                        <li class="card__list-item">
                            <b class="card__subtitle">
                                Location: 
                            </b>
                            <p>
                                ${data.location}
                            </p>
                        </li>
                    `
                    : ""
                }
                ${
                    data.bio !== null 
                    ?
                    `
                        <li class="card__list-item">
                            <b class="card__subtitle">
                                Bio: 
                            </b>
                            <p>
                                ${data.bio}
                            </p>
                        </li>
                    `
                    : ""
                }
                <li class="card__list-item">
                    <b class="card__subtitle">
                        Followers:
                    </b>
                    ${data.followers}
                </li>
                <li class="card__list-item">
                    <b class="card__subtitle">
                        Following:
                    </b>
                    ${data.following}
                </li>
                <li class="card__list-item">
                    <b class="card__subtitle">
                        Public repositories:
                    </b>
                    ${data.public_repos}
                </li>
            </ul>    
            `
        }).catch(err => console.error("There's an error:\n", err))
    }
});
