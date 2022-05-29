
function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    if (filter.length == 0) {
        ul.style.display = "none";
    }
    else {
        ul.style.display = "inline";
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "inline";
            } else {
                li[i].style.display = "none";
            }
        }
    }
    
}

 
