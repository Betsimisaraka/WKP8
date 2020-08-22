// That's a list of songs sorted from the most popular to the least popular.
 
let artists = [
    {
        title: "My heart will go on",
        author: "Celine Dion",
        style: 'slow',
        length: "5:00min",
        score: 2,
        picture: "https://i.ytimg.com/vi/tT2gVblzFvY/maxresdefault.jpg",
        id: 1598075633565,
    },
    {
        title: "I have a dream",
        author: "Westlife",
        style: 'fast',
        length: "4:00min",
        score: 5,
        picture: 'https://img.discogs.com/jlyypcLfymunUB-yW8bFRSWGqdk=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-152450-1573604885-8039.jpeg.jpg',
        id: 1598075968375,
    },
    {
        title: "Try everything",
        author: "Sakirah",
        style: 'Rock',
        length: "3:30min",
        score: 3,
        picture: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU0NzExNDA0MDQ3/shakira-189151-1-402.jpg',
        id: 1598075991052,
    },
];

const formElement = document.querySelector('.form_submit');
const artistList = document.querySelector('.artist_list');

const showArtists = () => {
    // The song list is always sorted from the highest score song to the lowest.
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
            <small>${song.length}</small>
        </div>
        <p>Score:${song.score}</p>
        <div>
            <button value='${song.id}' class="updatebtn">+1</button>
            <button value="${song.id}" class="deletebtn">&times</button>
        </div>
    </li>
    `;
    }).join('');
    artistList.innerHTML = html;
    return scoreSorted;
    
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
        score: 0,
        picture: form.picture.value,
        id: Date.now(),
    }
    artists.push(newArtist);
    console.log(`There are ${artists.length} in your object`);
    form.reset();
    artistList.dispatchEvent(new CustomEvent('artistUpdated'));
}

const deleteButton = idToDel => {
    artists = artists.filter(artist => artist.id !== idToDel);
    artistList.dispatchEvent(new CustomEvent('artistUpdated'));
}

const handleClicks = e => {
    const delButton = e.target.closest('button.deletebtn');
    if (delButton) {
        const id = Number(delButton.value);
        deleteButton(id);
    }
}


artistList.addEventListener('click', handleClicks);
formElement.addEventListener('submit', displayAddBtn);
artistList.addEventListener('artistUpdated', showArtists);
window.addEventListener('DOMContentLoaded', showArtists);




// We can increment the score by clicking the +1 button.
// We wan delete a song from the list by clicking the bin icon.
// We can filter the list, by searching for a song title
// We can filter the list, by selecting a song style in the select.
// When we click the reset filters button, the filter form is reset, and the list comes back to normal.
// The data will be saved on the localstorage (except when you filter data)