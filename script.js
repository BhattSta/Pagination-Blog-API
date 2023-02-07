let blogData = [];
let para = "";
let page;
let activePage = 1;
let startIndex;
let endIndex;
$(document).ready(function () {
    $("#tableData").hide();
    $("#heading").hide();

    para = "Through the Commercial Lunar Payload Services (CLPS) initiative, NASA is working with American companies to deliver scientific, exploration, and technology payloads to the Moon’s surface and orbit. The science investigations and technology demonstrations delivered to the lunar surface through CLPS are part of the agency’s broader goal of returning humans to the Moon through Artemis, and the success of CLPS could help further establish American leadership in the global and commercial space industries. Astrobotic’s first orders for scientific payload delivery were awarded in May 2019.  Astrobotic will deliver NASA payloads on its first flight to the lunar surface using the company’s Peregrine lunar lander. These NASA payloads will investigate specific aspects in and around the landing site. Astrobotic also will carry some non-NASA payloads from other organization";
    startIndex = 0;
    endIndex = 10;
});

$(window).on("load", function () {
    $("#spinner").show();
    setTimeout(() => {
        $.get("https://jsonplaceholder.typicode.com/posts", function (data) {
            blogData = data;
            $("#spinner").hide();
            $("#tableData").show();
            $("#heading").show();
            displayData(startIndex,endIndex);
            pagination();
        });
    }, 1000);
});

function displayData(startIndex,endIndex) {
    displayedData = blogData.slice(startIndex, endIndex);
    let text = "<div>";
    for (i = 0; i < displayedData.length; i++) {
        text += `<div class='demo'>`;
        // text += `<h3> Index Is :-  ${i} </h3>`;
        // text += `<h3> ${displayedData[i].id}</h3>`;
        text += `<h3> ${displayedData[i].title}</h3>`;
        text += `<img src="slider3.jpg" class='slider' alt="" style="margin-bottom: 35px;">`;
        text += `<p class='test'> ${para}  ${displayedData[i].body}</p>`;
        text += `</div>`;
    }
    text += "</div>";
    $("#tableData").html(text);
}

function pagination() {
    page = Math.ceil(blogData.length / 10);
    
    let first = "<table>";
    first += "<tr>";
    first += `<td> <input type = 'button' value='Previous' onclick='btnPrevious()' id='btnPrevious'</td>`;
    for (i = 0; i < page; i++) {
        first += `<td> <input type = 'button' value='${i + 1}' id='active${i}' class="test" onclick='btnActive(${i})'></td>`;
    }
    first += `<td> <input type = 'button' value='Next' onclick='btnNext()' id='btnNext'</td>`;
    first += `</tr>`;
    first += "</div>";
    $("#paging").html(first);
    $("#btnPrevious").prop('disabled', true);
}

function btnActive(index) {
    $(`.test`).removeClass('btnActive');
    $(`#active${index}`).addClass("btnActive");
    endIndex = (index + 1) * 10;
    startIndex = endIndex - 10;
    displayData(startIndex,endIndex);
    console.log(index);
    console.log(startIndex,endIndex);
    $("#btnPrevious").prop('disabled', false);
    $("#btnNext").prop('disabled', false);
    if(endIndex==blogData.length){
        $("#btnNext").prop('disabled', true);   
    }
    if(startIndex==0){
        $("#btnPrevious").prop('disabled', true);
    }
}

function btnPrevious() {
    $(`.test`).removeClass('btnActive');
    startIndex = endIndex - 20;
    endIndex = endIndex - 10;
    if(startIndex<=0){
        $("#btnPrevious").prop('disabled', true);
    }
    if(startIndex >= 0){
            displayData(startIndex,endIndex);
    }
}

function btnNext() {
    $(`.test`).removeClass('btnActive');
    startIndex = endIndex;
    endIndex = endIndex + 10;
    if(blogData.length==endIndex){
        $("#btnNext").prop('disabled', true);
    }
    displayData(startIndex,endIndex);
}