// basic fetch for reference
fetch('https://randomuser.me/api/')
  .then(res => res.json())
  .then(data => console.log('Basic Fetch Results:', data.results[0]));

// target the ul element from the HTML file
const list = document.getElementById('list');

// create a variable for the api url
const API = 'https://randomuser.me/api/?results=15';

// function for fetching data and rendering it to the DOM
const fetchUsers = () => {
  fetch(API)
  .then(res => res.json())
  .then((data) => {
    data.results.forEach((person) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
  
      img.src = person.picture.thumbnail;
      img.alt = person.name.first;
  
      li.appendChild(img);
      
      const h4 = document.createElement('h4');
      const button = document.createElement('button');
  
      h4.innerText = `${person.name.first} ${person.name.last}`;
      button.innerText = 'More Info';
  
      li.appendChild(h4);
      li.appendChild(button);
      
      // run the displayInfo function when a button is clicked
      button.onclick = function displayInfo() {
        // create a paragraph element to have a place for the info to be displayed 
        const p = document.createElement('p');
        
        // use template literal to create a list of the person's info
        let info = `
        Name: ${person.name.first} ${person.name.last}
        Age: ${person.dob.age}
        City, State: ${person.location.city}, ${person.location.state}
        Country: ${person.location.country}
        Email: ${person.email}
        `;

        // create a new button element that will hide the info
        const hideBtn = document.createElement('button');
        hideBtn.innerText = 'Hide Info';
        
        // set the inner text of the paragragh to be the person's info 
        p.innerText = info;
        // add the paragrah and hide button to the list item
        li.appendChild(p);
        li.appendChild(hideBtn);

        // run the hideInfo function when the hide button is clicked
        hideBtn.onclick = function hideInfo() {
          // remove the paragraph and hide button from the list item
          li.removeChild(p);
          li.removeChild(hideBtn);
        }
      }
      list.appendChild(li);
    })
  })
}

// run the fetch users function when the window loads
window.onload = fetchUsers();