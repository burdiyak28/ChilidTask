var numberPage = 1;
var keyOfSort = "id";
var reverseOfSort = false;
var gettingData = 0;

function getData() {
    var data = '[{"id":1,"firstName":"Jan","lastName":"Kowalski","dateOfBirth":"1.7.1990 11:35","company":"XSolve","note":90},{"id":4,"firstName":"Justyna","lastName":"Kowalska","dateOfBirth":"4.02.1976 14:37","company":"XSolve","note":91},{"id":2,"firstName":"Krzysztof","lastName":"Krawczyk","dateOfBirth":"28.10.1950 2:15","company":"Chilid","note":27},{"id":3,"firstName":"Boguslaw","lastName":"Linda","dateOfBirth":"03.01.1963 23:10","company":"XSolve","note":50},{"id":5,"firstName":"Krzysztof","lastName":"Kononowicz","dateOfBirth":"10.10.1910 18:00","company":"Chilid","note":77},{"id":6,"firstName":"Maryla","lastName":"Rodowicz","dateOfBirth":"29.02.1936 11:35","company":"XSolve","note":8},{"id":7,"firstName":"Edyta","lastName":"Gorniak","dateOfBirth":"14.11.1972 06:35","company":"XSolve","note":25},{"id":8,"firstName":"Dawid","lastName":"Podsiadlo","dateOfBirth":"23.05.1993 16:15","company":"Chilid","note":19},{"id":9,"firstName":"Elvis","lastName":"Presley","dateOfBirth":"09.01.1935 01:35","company":"XSolve","note":8},{"id":1,"firstName":"Jan","lastName":"Kowalski","dateOfBirth":"1.7.1990 11:35","company":"XSolve","note":90},{"id":4,"firstName":"Justyna","lastName":"Kowalska","dateOfBirth":"4.02.1976 14:37","company":"XSolve","note":91},{"id":2,"firstName":"Krzysztof","lastName":"Krawczyk","dateOfBirth":"28.10.1950 2:15","company":"Chilid","note":27},{"id":3,"firstName":"Boguslaw","lastName":"Linda","dateOfBirth":"03.01.1963 23:10","company":"XSolve","note":50},{"id":5,"firstName":"Krzysztof","lastName":"Kononowicz","dateOfBirth":"10.10.1910 18:00","company":"Chilid","note":77},{"id":6,"firstName":"Maryla","lastName":"Rodowicz","dateOfBirth":"29.02.1936 11:35","company":"XSolve","note":8},{"id":7,"firstName":"Edyta","lastName":"Gorniak","dateOfBirth":"14.11.1972 06:35","company":"XSolve","note":25},{"id":8,"firstName":"Dawid","lastName":"Podsiadlo","dateOfBirth":"23.05.1993 16:15","company":"Chilid","note":19},{"id":9,"firstName":"Elvis","lastName":"Presley","dateOfBirth":"09.01.1935 01:35","company":"XSolve","note":8},{"id":1,"firstName":"Jan","lastName":"Kowalski","dateOfBirth":"1.7.1990 11:35","company":"XSolve","note":90},{"id":4,"firstName":"Justyna","lastName":"Kowalska","dateOfBirth":"4.02.1976 14:37","company":"XSolve","note":91},{"id":2,"firstName":"Krzysztof","lastName":"Krawczyk","dateOfBirth":"28.10.1950 2:15","company":"Chilid","note":27},{"id":3,"firstName":"Boguslaw","lastName":"Linda","dateOfBirth":"03.01.1963 23:10","company":"XSolve","note":50},{"id":5,"firstName":"Krzysztof","lastName":"Kononowicz","dateOfBirth":"10.10.1910 18:00","company":"Chilid","note":77},{"id":6,"firstName":"Maryla","lastName":"Rodowicz","dateOfBirth":"29.02.1936 11:35","company":"XSolve","note":8},{"id":7,"firstName":"Edyta","lastName":"Gorniak","dateOfBirth":"14.11.1972 06:35","company":"XSolve","note":25},{"id":8,"firstName":"Dawid","lastName":"Podsiadlo","dateOfBirth":"23.05.1993 16:15","company":"Chilid","note":19},{"id":9,"firstName":"Elvis","lastName":"Presley","dateOfBirth":"09.01.1935 01:35","company":"XSolve","note":8}]';
    return JSON.parse(data);
}

function showData() {


    var arrayOfData = getData();
    gettingData = arrayOfData.length;
    var sortResult = sortOfKey(arrayOfData, keyOfSort, reverseOfSort);

    var pagin = pagination(sortResult, numberPage);


    document.getElementById("dateOfEmployee").innerHTML = "";
    document.getElementsByClassName("pagination")[0].innerHTML = "";

    pagin.forEach(function (value) {
        var element = document.createElement("tr");

        //document.getElementById("dateOfEmployee").insertAdjacentHTML('afterbegin', "<tr>");

        for (var key in value) {

            var htmlToInsert = document.createElement("td");
            htmlToInsert.innerHTML = value[key];

            //document.getElementById("dateOfEmployee").insertAdjacentHTML('beforeend', htmlToInsert);

            element.appendChild(htmlToInsert);

        }

        document.getElementById("dateOfEmployee").appendChild(element);
    });

    //liczy ile jest stron
    var countyPages = countPages(arrayOfData.length);
    createLinks(countyPages);
}

showData();

function pagination(data, number) {
    var countElementsOnPage = 5;
    return data.slice(number * countElementsOnPage - countElementsOnPage, number * countElementsOnPage);
}

function countPages(countElements) {
    var countElementsOnPage = 5;
    return Math.ceil(countElements / countElementsOnPage);
}

function createLinks(countPages) {

    document.getElementsByClassName("pagination")[0].insertAdjacentHTML('afterbegin', '<a onclick="clickBackLink()" href="#"><i class="fas fa-angle-left"></i> back</a>');

    for (var i = 1; i <= countPages; i++) {
        var tagLink = document.createElement("a");
        tagLink.setAttribute("href", "#");
        if (numberPage === i) {
            tagLink.classList.add("active");
        } else {
            tagLink.addEventListener("click", showContentAfterCLick);
        }

        var nameOfLink = document.createTextNode(i);
        tagLink.appendChild(nameOfLink);
        document.getElementsByClassName("pagination")[0].appendChild(tagLink);

    }
    document.getElementsByClassName("pagination")[0].insertAdjacentHTML('beforeend', '<a  onclick="clickNextLink()" href="#">next <i class="fas fa-angle-right"></i></a>');


}

function clickBackLink() {
    if (numberPage > 1){
        numberPage--;
    }
    showData();
}

function clickNextLink() {
    if (numberPage < countPages(gettingData)){
        numberPage++;
    }
    showData();
}

function showContentAfterCLick() {

    numberPage = Number(this.innerHTML);

    showData();


}


function sortOfKey(arrayToSort, key, reverse) {
    arrayToSort.sort(function (a, b) {
        if (a[key] > b[key]) {

            return (reverse) ? -1 : 1;
        }
        if (a[key] < b[key]) {
            return (reverse) ? 1 : -1;
        }

        return 0;
    });
    return arrayToSort;
}

function nameAttribute() {
    var childrenOfTable = document.getElementById("tableHeader").children;
    for (var i = 0; i < childrenOfTable.length; i++) {
        childrenOfTable[i].addEventListener("click", function () {
            if (keyOfSort == this.getAttribute('data-sort')) {
                reverseOfSort = !reverseOfSort;
            } else {
                reverseOfSort = false;
            }
            keyOfSort = this.getAttribute('data-sort');
            showData();
        });
    }


}

nameAttribute();
