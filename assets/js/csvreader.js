// searching for word in csv file 
function search() {
    var r = document.getElementsByTagName('tr');
    for(let j = 0;j < r.length; j++ ){
        r[j].style.backgroundColor = "white";
    }
    var searchElement = document.getElementById("searchForm").elements["searchItem"].value;
    var format = searchElement.toLowerCase();
    var word = "";
  
    var line = document.getElementsByClassName("col-md-2");
    for (let i = 0; i < line.length; i++) {
       var ind = line[i].innerText.toLowerCase().indexOf(format);
       if (ind != -1) {
          word = line[i].parentNode.id;
          document.getElementById(word).scrollIntoView();
          document.getElementById(word).style.backgroundColor = 'green';
          break;
       }
    }  
 }

