// liten for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
	// Get form values
	console.log("It works");
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if (!validateForm(siteName, siteUrl))
		return false;

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	// Test if bookmarks is null
	if (localStorage.getItem('bookmarks') === null) {
		// Init array
		var bookmarks = [];
		// Add to array 
		bookmarks.push(bookmark);
		// Set to LocalStrorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		for (var i = 0; i < bookmarks.length; i++) {
			if (bookmarks[i].url == bookmark.url &&  
			    bookmarks[i].name == bookmark.name)  
				return;
		}
		// Add bookmark to array
		bookmarks.push(bookmark);
		// Re-set back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}

	// clear form
	document.getElementById('myForm').reset();

	// Re-fetch bookmarks
	fetchBookmarks();

	// Prevent form from submitting
  e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
	// Get bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop throught bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url) {
			// Remove from array
			bookmarks.splice(i,1);
		}
	}
	// Re-set back to LocalStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	// Re-fetch bookmarks
	fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
		// Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		console.log(bookmarks);

		// Get output id
		var bookmarksResults = document.getElementById('bookmarksResults');

		// Build output
		bookmarksResults.innerHTML = '';
		for (var i = 0; bookmarks && i < bookmarks.length; i++) {
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			bookmarksResults.innerHTML += '<div class="well">'+
																		'<h3>' + name +
																		' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
																		' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_blank" href="#">Delete</a>' +
																		'</h3>' +
																		'</div>';
		}
	
}

function validateForm(siteName, siteUrl) {
	if(!siteName || !siteUrl) {
		alert('Please fill in the form');
		return false;
	}
	return true;
}

