var menuButton = document.getElementById("nav-menu-button");
//menuButton.classList.toggle("toggle");
//toggleMenuBar(menuButton);

function toggleMenuBar(menuElement) {
	menuElement.classList.toggle("toggle");
	document.getElementById("course-navbar").classList.toggle("toggle");
}

var containerHoveredId = [null];
var elementHoveredId = [null];
var activeMinLevel = 0;
var lastLevel = 0;

function navElementMouseOver(element, containerId, contentId, level) {
	var newElement = document.getElementById(containerId);
	
	if (containerHoveredId[level] != null) {
		containerHoveredId[level].style.display = "none";
	}
	if (elementHoveredId[level] != null) {
		elementHoveredId[level].style.transform = "scale(1.0, 1.0)";
		elementHoveredId[level].style.color = "var(--text-color)";
	}
	if (newElement != null) {
		containerHoveredId[level] = newElement;
		containerHoveredId[level].style.display = "block";
	}
	if (element != null) {
		if (level < lastLevel) {
			elementHoveredId[lastLevel].style.transform = "scale(1.0, 1.0)";
			elementHoveredId[lastLevel].style.color = "var(--text-color)";
		}
		elementHoveredId[level] = element;
		elementHoveredId[level].style.transform = "scale(1.1, 1.1)";
		elementHoveredId[level].style.color = "var(--hover-text-color)";
		lastLevel = level;
	}
}

function navElementClicked(element) {
	lastLevel = element.getAttribute("level");
	//console.log("Element ID = " + element.getAttribute("level"));
	//console.log("Parent ID = " + element.getAttribute("parent"));
	//console.log("Number of children = " + element.getAttribute("nrChildren"));
	
	//console.log(document.getElementById(element.getAttribute("parent"))) ;
	
	//console.log(lastLevel);
	console.log(element.getAttribute('heading'));
	console.log(element.getAttribute('parentId'));
	
	updateNavBar(element.getAttribute('id') , element.getAttribute('parentId'));
	
	
}

function updateNavBar(id, parent) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("course-navbar").innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", "php/createNavBar.php?id=" + id + "&parent=" + parent, true);
	xmlhttp.send();
}


updateNavBar("0", "null");





/*
uppdateNavBarContent("null", "level0");
var activeLevel = 0; 
function uppdateNavBarContentClick(navBarparent) {
	uppdateNavBarContent(navBarparent, "level0");
	//activeLevel = parseInt(document.getElementById("test").getAttribute("data-value")) + 1;
}

function uppdateNavBarContent(navBarparent, menu) {
	var subjectList = document.getElementById(menu);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			subjectList.innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", "php/getPages.php?parent=" + navBarparent, true);
	xmlhttp.send();
}

var numbMenues = getMinNavLevel();
function addSubbMenues() {
	console.log(numbMenues);
	for (var i = 0; i < parseInt(numbMenues); i++) {
		var container = document.createElement("div");
		container.classList.add("sub-nav-conainer");
		container.setAttribute("id", "sub-nav-conainer-" + i);
		
		var content = document.createElement("div");
		content.classList.add("sub-nav-content");
		content.setAttribute("id", "sub-nav-content-" + i);
		var width = window.innerWidth / 10; 
		if (width < 125)
			width = 125;
		
		content.style.width = width + "px";
		content.style.left = (width + 5) * (i + 1) + "px";

		container.appendChild(content);
		document.getElementsByTagName("body")[0].appendChild(container);
	}
}


function getMinNavLevel() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			numbMenues = this.responseText;
			console.log(numbMenues);
			addSubbMenues();
		}
	};
	xmlhttp.open("GET", "php/getMinNavLevel.php", true);
	xmlhttp.send();
}
function hoveringNavElement(element, level) {
	
	console.log("level"+ level);
	console.log("active level" + activeLevel);
	console.log((level - activeLevel));
	
	document.getElementById("sub-nav-conainer-" + (level - activeLevel)).style.display = "block";
	var heading = element.innerHTML;
	heading = heading.trim();
	uppdateNavBarContent(heading, "sub-nav-content-" + (level - activeLevel));
		
	/*var levels = document.getElementById("test").getAttribute("data-value");
	console.log(levels);
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showSubMenu(this.responseText);
		}
	};
	xmlhttp.open("GET", "php/getLevel.php?heading=" + heading, true);
	xmlhttp.send();
	*//*
}

function showSubMenu(level) {
	
}*/