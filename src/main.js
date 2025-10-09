import './style.css'
import { Collapse, Dropdown, initTWE, } from "tw-elements";
initTWE({ Collapse, Dropdown });

    // Mobile menu toggle
    document.getElementById('mobile-menu-btn').addEventListener('click', function() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    });

    // Profile dropdown menu
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');
    profileBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      profileMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', function(e) {
      if (!profileMenu.contains(e.target) && e.target !== profileBtn) {
        profileMenu.classList.add('hidden');
      }
    });

    // Dummy data for search results
    let searchResults = [
    //   {
    //     name: "Central Perk Cafe",
    //     image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    //     rating: 4.7,
    //     address: "123 Main St, Metropolis",
    //     distance: "0.5 mi",
    //     tags: ["Coffee", "Cafe"],
    //     new: false
    //   },
    //   {
    //     name: "Bean Scene",
    //     image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    //     rating: 4.9,
    //     address: "45 Park Ave, Metropolis",
    //     distance: "1.2 mi",
    //     tags: ["Coffee", "Brunch"],
    //     new: true
    //   },
    //   {
    //     name: "Night Owl Bar",
    //     image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    //     rating: 4.5,
    //     address: "789 Elm St, Metropolis",
    //     distance: "1.8 mi",
    //     tags: ["Nightlife", "Bar"],
    //     new: false
    //   }
    ];

    // Dummy search suggestions
    const dummySuggestions = [
      "Central Perk Cafe",
      "Joe's Pizza",
      "Night Owl Bar",
      "City Park",
      "Downtown Art Museum"
    ];

    // Dummy data for My Recent Lists
    const myLists = [
      {
        title: "Date Night Favorites",
        count: 7
      },
      {
        title: "Best Coffee Spots",
        count: 5
      },
      {
        title: "Burger Trail",
        count: 6
      }
    ];

    // Dummy featured collections
    const collections = [
      {
        title: "Hot this week",
        places: 12
      },
      {
        title: "Trending Coffee Shops",
        places: 9
      },
      {
        title: "Best Brunch Spots",
        places: 8
      }
    ];

    // Render search results
    function renderResults(results) {
      const el = document.getElementById('results-list');
      el.innerHTML = '';
      results.forEach(res => {
        const div = document.createElement('div');
        div.className = "bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col md:flex-row gap-4 cursor-pointer";
        div.innerHTML = `
          <img src="${res.image}" class="w-full md:w-40 h-32 object-cover rounded-lg" alt="${res.name}" />
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-bold">${res.name}</h3>
                ${res.new ? '<span class="ml-2 px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full">New</span>' : ''}
              </div>
              <div class="flex items-center mt-1 gap-2">
                <span class="text-amber-600 font-semibold">${res.rating}★</span>
                <span class="text-sm text-gray-500">${res.address}</span>
                <span class="text-xs text-gray-400">(${res.distance})</span>
              </div>
              <div class="mt-2">
                ${res.tags.map(tag => `<span class="inline-block bg-gray-100 px-2 py-1 text-xs rounded mr-2">${tag}</span>`).join('')}
              </div>
            </div>
            <button class="mt-4 self-start px-4 py-2 bg-amber-600 text-white font-semibold rounded hover:bg-amber-700 transition">Save</button>
          </div>
        `;
        div.addEventListener('click', e => {
          if (e.target.tagName.toLowerCase() === 'button') {
            alert('Saved "' + res.name + '" to your list!');
            e.stopPropagation();
          } else {
            alert('Viewing "' + res.name + '" details');
          }
        });
        el.appendChild(div);
      });
    }

    // Sorting logic
    document.getElementById('sortResults').addEventListener('change', function(e) {
      const value = e.target.value;
      let sorted = [...searchResults];
      if (value === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
      } else if (value === 'distance') {
        sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      } else if (value === 'new') {
        sorted.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
      }
      renderResults(sorted);
    });

    // Render My Recent Lists
    const myListsEl = document.getElementById('my-lists');
    myLists.forEach(list => {
      const li = document.createElement('li');
      li.className = "flex items-center justify-between";
      li.innerHTML = `<span>${list.title}</span><span class="text-gray-500 text-xs">${list.count} places</span>`;
      li.addEventListener('click', () => alert('Opening list: ' + list.title));
      myListsEl.appendChild(li);
    });

    // Render Collections
    const collectionsEl = document.getElementById('collections');
    collections.forEach(col => {
      const li = document.createElement('li');
      li.className = "flex items-center justify-between";
      li.innerHTML = `<span>${col.title}</span><span class="text-gray-500 text-xs">${col.places} places</span>`;
      li.addEventListener('click', () => alert('Viewing collection: ' + col.title));
      collectionsEl.appendChild(li);
    });

    // Search suggestions and search bar logic
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const suggestionsEl = document.getElementById('search-suggestions');

    function showSuggestions(value) {
      const filtered = dummySuggestions.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      if (filtered.length && value.trim()) {
        suggestionsEl.innerHTML = filtered
          .map(item => `<div class="px-4 py-2 hover:bg-amber-50 cursor-pointer">${item}</div>`)
          .join("");
        suggestionsEl.classList.remove("hidden");
        Array.from(suggestionsEl.children).forEach((child, idx) => {
          child.addEventListener('click', () => {
            searchInput.value = filtered[idx];
            suggestionsEl.classList.add("hidden");
          });
        });
      } else {
        suggestionsEl.classList.add("hidden");
      }
    }

    searchInput.addEventListener('input', (e) => {
      showSuggestions(e.target.value);
    });

    document.addEventListener('click', (e) => {
      if (!suggestionsEl.contains(e.target) && e.target !== searchInput) {
        suggestionsEl.classList.add("hidden");
      }
    });

    searchBtn.addEventListener('click', () => {
      alert('Search for: ' + searchInput.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });

    // Log out button
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('You have been logged out.');
      // Redirect or change UI as needed
    });

    function haversine(lat1, lon1, lat2, lon2) {
      // Returns distance in meters
      const toRad = a => a * Math.PI / 180;
      const R = 6371e3;
      const φ1 = toRad(lat1), φ2 = toRad(lat2);
      const Δφ = toRad(lat2-lat1);
      const Δλ = toRad(lon2-lon1);
      const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }

    function error(err) {
      //resultsDiv.innerHTML = `<span class='error'>Location error: ${err.message}</span>`;
    }

    async function success(pos) {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      console.log('Searchng for things at', lat, lon);
      //resultsDiv.innerHTML = "Searching for nearby coffee shops and bars…";

      // Overpass QL: cafes and bars within 1000m
      const query = `
[out:json][timeout:25];
node
  [amenity~"^(cafe|bar)$"]
  [name]
  (around:1000,${lat},${lon});
  
way
  [amenity~"^(cafe|bar)$"]
  [name]
  (around:1000,${lat},${lon});
  
relation
  [amenity~"^(cafe|bar)$"]
  [name]
  (around:1000,${lat},${lon});

// Filter for nodes/ways/relations that explicitly mention coffee in name or cuisine/drinks
(
  node
    [amenity~"^(cafe|bar)$"]
    [name~"coffee",i]
    (around:1000,${lat},${lon});
  way
    [amenity~"^(cafe|bar)$"]
    [name~"coffee",i]
    (around:1000,${lat},${lon});
  relation
    [amenity~"^(cafe|bar)$"]
    [name~"coffee",i]
    (around:1000,${lat},${lon});
  node
    [amenity~"^(cafe|bar)$"]
    [cuisine~"coffee",i]
    (around:1000,${lat},${lon});
  way
    [amenity~"^(cafe|bar)$"]
    [cuisine~"coffee",i]
    (around:1000,${lat},${lon});
  relation
    [amenity~"^(cafe|bar)$"]
    [cuisine~"coffee",i]
    (around:1000,${lat},${lon});
  node
    [amenity~"^(cafe|bar)$"]
    [drinks~"coffee",i]
    (around:1000,${lat},${lon});
  way
    [amenity~"^(cafe|bar)$"]
    [drinks~"coffee",i]
    (around:1000,${lat},${lon});
  relation
    [amenity~"^(cafe|bar)$"]
    [drinks~"coffee",i]
    (around:1000,${lat},${lon});
);

// Output with coordinates
out center;
      `;
      const url = "https://overpass-api.de/api/interpreter";

      try {
        const resp = await fetch(url, {
          method: "POST",
          body: query,
          headers: { "Content-Type": "text/plain" }
        });
        const data = await resp.json();

        if (data.elements.length === 0) {
          searchResults = [];
        } else {
        console.log('got data:');
          console.dir(data);
          searchResults = data.elements.map(function (el) {
            const name = el.tags.name || "(Unnamed)";
            const dist = haversine(lat, lon, el.lat, el.lon);
            return {
                name: name,
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
                link: "https://www.openstreetmap.org/node/" + el.id,
                rating: 0.0,
                address: el.tags["addr:street"] ? el.tags["addr:street"] : "",
                distance: dist,
                tags: [], //el.tags,
                new: false
            };
          });
          console.log('search results:');
          console.dir(searchResults);
          renderResults(searchResults);
        }
      } catch (e) {
        console.log('Error fetching data from Overpass API');
      }
    }

    function initApp() {
      if (!navigator.geolocation) {
        //resultsDiv.innerHTML = "<span class='error'>Geolocation not supported.</span>";
        return;
      }
      navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });

    };

initApp();
