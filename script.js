// That's a list of songs sorted from the most popular to the least popular.
 
let artists = [
    {
        title: 'I love you',
        author: 'Dady love',
        style: 'Slow',
        length: '3',
        // When we add a new song to the hit parade, the song score is set to zero.
        picture: '',
        score: 3,
        id: 02,
    },
    {
        title: 'I love you',
        author: 'Dady love',
        style: 'Slow',
        length: '5',
        // When we add a new song to the hit parade, the song score is set to zero.
        picture: '',
        score: 5,
        id: 02,
    }
];

const formElement = document.querySelector('.form_submit');
const artistList = document.querySelector('.artist_list');
const formElement2 = document.querySelector('.form_filter');
const searchInput = document.querySelector('#searchtitle');
const selectStyle = document.querySelector('#selectstyle');

const showArtists = (e) => {
    search();
    // let filteredArtists = [...artists];
    // // filter the author stuff if we want that
    // const artistsFiltered = filteredArtists.filter(artist => {
    //     if (artist.author === formElement2.searchtitle.value) {
    //         return true;
    //     }
    //     if (artist.style === formElement2.selectstyle.value) {
    //         return true;
    //     }
    //     return false;
    // }); console.log(artistsFiltered);
    //The song list is always sorted from the highest score song to the lowest.
    const scoreSorted = artists.sort((a, b) => (b.score - a.score));
    const html = artists.map(song => {
         return `
        <li>
        <img src="${song.picture}"
            alt="">
        <div>
            <p>${song.title}</p>
            <small>${song.style}</small>
        </div>
        <div>
            <p>${song.author}</p>
            <small>${song.length}min</small>
        </div>
        <p>Score:<span class="score">${song.score}</span></p>
        <div>
            <button value='${song.id}' class="updatebtn">+1</button>
            <button value="${song.id}" class="deletebtn">&times</button>
        </div>
    </li>
    `;
    }).join('');
    artistList.innerHTML = html;
    scoreSorted;
    
};

const displayAddBtn = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const newArtist = {
        title: form.title.value,
        author: form.author.value,
        style: form.style.value,
        length: form.length.value,
        // When we add a new song to the hit parade, the song score is set to zero.
        picture: form.picture.value,
        score: 0,
        id: Date.now(),
    }
    artists.push(newArtist);
    console.log(`There are ${artists.length} in your object`);
    form.reset();
    artistList.dispatchEvent(new CustomEvent('artistUpdated'));
}

// We wan delete a song from the list by clicking the bin icon.
const deleteButton = idToDel => {
    artists = artists.filter(artist => artist.id !== idToDel);
    artistList.dispatchEvent(new CustomEvent('artistUpdated'));
}

var score = 0;
const incrementScore = idToIncrem => {
    let artistsScore = artists.find(artist => artist.id === idToIncrem);
    artistsScore = document.querySelector('span.score');
    artistsScore.score = score++;
    artistsScore.textContent = score;
    artistList.dispatchEvent(new CustomEvent('artistUpdated'));
}


const handleClicks = e => {
    const delButton = e.target.closest('button.deletebtn');
    if (delButton) {
        const id = Number(delButton.value);
        deleteButton(id);
    }
    const incrementbtn = e.target.closest('button.updatebtn')
    if (incrementbtn) {
        const id = Number(incrementbtn.value);
       incrementScore(id);
    }
}

// const initLocalStorage = () => {
//     const artistsItems = JSON.parse(localStorage.getItem('artists'));
//     if (!artistsItems) {
//         artists = [];
//     } else {
//         artists = artistsItems;
//     }
//     //artistList.dispatchEvent(new CustomEvent('artistUpdated'));
// };

const updateLocalStorage = () => {
    localStorage.setItem('artists', JSON.stringify(artists));
};

// //EVENT LISTENER
artistList.addEventListener('click', handleClicks);
formElement.addEventListener('submit', displayAddBtn);
artistList.addEventListener('artistUpdated', showArtists);
artistList.addEventListener('artistUpdated', updateLocalStorage);
window.addEventListener('DOMContentLoaded', showArtists);

function search(searchString) {
    //we test if searchString is empty in that case we just return the original data
    if (typeof searchString !== 'string' || searchString.length === 0) {
    return artists;
    }
    
    //we make search string lower case
    let searchLower = searchString.toLowerCase();
    let filtered = artists.filter(song => {
    if (song.title.includes(searchLower)) {
    return true;
    }
    
    if (song.style.includes(searchLower)) {
    return true;
    }
    
    return false;
    });
    return filtered;
};

//initLocalStorage();


// // We can increment the score by clicking the +1 button.
// // We can filter the list, by searching for a song title
// // We can filter the list, by selecting a song style in the select.
// // When we click the reset filters button, the filter form is reset, and the list comes back to normal.
// // The data will be saved on the localstorage (except when you filter data)