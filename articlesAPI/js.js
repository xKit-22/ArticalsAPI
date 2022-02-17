const requestURL = 'https://jsonplaceholder.typicode.com/posts';
const modal1 = document.getElementById('myModal');
const modal2 = document.getElementById('commentsModal');
/*
function sendRequest(method, url, body = null) {
    return fetch(url).then(response => {
        return response.json()
    });
}

sendRequest('GET', requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err));*/

async function getArticles() {
    document.getElementById('tbody').innerHTML = ''
    const response = await fetch(requestURL);

/*    const data = await response.json()
    console.log('Data: ', data)*/

    if(response.ok) {
        response.json().then(data => {
            data.forEach(article => {
                const {userId, id, title, body} = article;
                const tr = document.createElement('tr');
                const userIdElement = document.createElement('td');
                const titleElement = document.createElement('td');
                const bodyElement = document.createElement('td');
                const actionElement = document.createElement('td');
                const commentElement = document.createElement('td');


                tr.append(userIdElement, titleElement,bodyElement,actionElement, commentElement);
                document.getElementById('tbody').append(tr);

                userIdElement.innerText = userId
                titleElement.innerText = title
                bodyElement.innerText = body
                actionElement.addEventListener('click', () => {
                    deleteArticle(id)
                })
                actionElement.innerHTML = `<div class="deleteButton"><p>Delete</p></div>`
                commentElement.innerHTML = `<div class="commButton" id="commButton${id}"><p>View comments</p></div>`

                document.getElementById(`commButton${id}`).addEventListener('click', () => {
                    document.getElementById('commentsModal').style.display = 'block'
                    getComments(id);
                })
            })
        })
    }
}

async function getComments(id) {
    document.getElementById('tCommBody').innerHTML = ''
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);

    if(response.ok) {
        response.json().then(data => {
            data.forEach(comm => {
                const {postId, id, name, email, body} = comm;
                const tr = document.createElement('tr');
                const postIdElement = document.createElement('td');
                const idElement = document.createElement('td');
                const nameElement = document.createElement('td');
                const emailElement = document.createElement('td');
                const bodyElement = document.createElement('td');


                tr.append(postIdElement, idElement,nameElement,emailElement, bodyElement);
                document.getElementById('tCommBody').append(tr);

                postIdElement.innerText = postId
                idElement.innerText = id
                nameElement.innerText = name
                emailElement.innerText = email
                bodyElement.innerText = body
            })
        })
    }
}

async function deleteArticle(id){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        console.log(response.status)
        await getArticles()
    }
}

const closeModal = () => {
    document.getElementById('myModal').style.display = 'none'
    document.getElementById('userId').value = ''
    document.getElementById('title').value = ''
    document.getElementById('article').value = ''
}
document.querySelector('.openModalButton').addEventListener('click', () => {
    document.getElementById('myModal').style.display = 'block'
})
document.querySelector('.close').addEventListener('click', () => {
    closeModal()
})
document.querySelector('.closeComm').addEventListener('click', () => {
    document.getElementById('commentsModal').style.display = 'none'
})

window.onclick = function(event) {
    if (event.target === modal1) {
        modal1.style.display = "none";
    }
    if (event.target === modal2) {
        modal2.style.display = "none";
    }
}

async function add(){
    const data = {
        userId: document.getElementById('userId').value,
        title: document.getElementById('title').value,
        article: document.getElementById('article').value
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok){
        console.log(response.status)
        closeModal()
        getArticles()
    }
}

getArticles();

