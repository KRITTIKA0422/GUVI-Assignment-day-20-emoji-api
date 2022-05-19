

"use strict";
// Creating HTML Elements using DOM
const heading=document.createElement("header");
document.body.appendChild(heading);
heading.innerHTML=`<img src="https://thetechinfinite.com/wp-content/uploads/2020/04/%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.jpg"height=100px width=200px>World of Emojis<img src="https://images.news18.com/ibnlive/uploads/2021/12/emojis_2021-163869711716x9.jpg"height=100px width=200px>`;
heading.id="title";
const description=document.createElement("p");
document.body.appendChild(description);
description.id="description";
description.innerHTML="The name, catagory, group, image using HTML code and unicode for the emojis are listed below:";
const division1=document.createElement("div");
division1.class="container";
division1.id="div1";
document.body.appendChild(division1);
const table=document.createElement("table");
table.class="table table-bordered";
table.id="our-table";
document.getElementById("div1").appendChild(table);
const tableHead=document.createElement("thead");
tableHead.id="table-head";
document.getElementById("our-table").appendChild(tableHead);
const tableBody=document.createElement("tbody");
tableBody.id="table-body";
document.getElementById("our-table").appendChild(tableBody);
const headRow=document.createElement("TR");
headRow.id="row-head";
document.getElementById("table-head").appendChild(headRow);
const headcol1=document.createElement("TH");
const col1=document.createTextNode("NAME");
headcol1.append(col1);
document.getElementById("row-head").appendChild(headcol1);
const headcol2=document.createElement("TH");
const col2=document.createTextNode("CATAGORY");
headcol2.append(col2);
document.getElementById("row-head").appendChild(headcol2);
const headcol3=document.createElement("TH");
const col3=document.createTextNode("GROUP");
headcol3.append(col3);
document.getElementById("row-head").appendChild(headcol3);
const headcol4=document.createElement("TH");
const col4=document.createTextNode("HTML IMAGE");
headcol4.append(col4);
document.getElementById("row-head").appendChild(headcol4);
const headcol5=document.createElement("TH");
const col5=document.createTextNode("UNICODE");
headcol5.append(col5);
document.getElementById("row-head").appendChild(headcol5);
const division2=document.createElement("div");
division2.class="container";
division2.id="div2";
document.body.appendChild(division2);
const division3=document.createElement("div");
division3.id="paraOfChange";
document.getElementById("div2").appendChild(division3);
const division4=document.createElement("div");
division4.id="button";

document.getElementById("div2").appendChild(division4);


const url = "https://emojihub.herokuapp.com/api/all";
// Fetch API()
async function emojihub(url) {
  const response = await fetch(url);
  var data=await response.json();
  console.log(data);
  view(data)                                 //calling function view() to display the data
 } 
let emoji=emojihub(url);
emoji
  .try(function (value) {                       //try and catch are used to check for errors
    console.log(JSON.stringify(value));
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    console.log("fetch api ran successfully !");   //promise ran successfully
  });
 
function view(data){ 
  const list=[];
  for(let i=0;i<data.length;i++){
    list[i] =data[i];                            //storing the data in another array list[]
  }
  
  
let state={
  'querySet':list,
  'page':1,
  'rows':15,
  'window':list.length,
}

buildTable();
function pagination(querySet,page,rows)                     //trimming the data and dividing the data in pages
{
    let trimStart=(page-1)*rows;
    let trimEnd=trimStart+rows;
    let trimmedData=querySet.slice(trimStart,trimEnd);
    let pages=Math.ceil(querySet.length/rows);
    return{
        'querySet':trimmedData,
        'pages':pages,
    }
  }

  function pageButtons(pages){
      var wrapper=document.getElementById('button');
      wrapper.innerHTML='';
      let maxLeft=(state.page-Math.floor(state.window/2));
      let maxRight=(state.page+Math.floor(state.window/2));
      if(maxLeft<1)
      {
          maxLeft=1;
          maxRight=state.window;
      }
      if(maxRight>pages)
      {
          maxLeft=pages-(state.window-1);
          maxRight=pages;
          if(maxLeft<1)
          {
              maxLeft=1;
          }

      }
      for(var page=maxLeft;page<=pages;page++)  //setting the button values to view different data in different pages
      {
        if(page==1)
        wrapper.innerHTML+=`<button value=${page} class="page btn btn-sm btn-info">First</button>`;

        else if(page!=1 && page!=pages)
          wrapper.innerHTML+=`<button value=${page} class="page btn btn-sm btn-info">${page}</button>`;
      else if(page==pages)
      wrapper.innerHTML+=`<button value=${page} class="page btn btn-sm btn-info">Last</button>`;
      
    }
             
          if(state.page!=1){
            wrapper.innerHTML=`<button value=${state.page-1} class="page btn btn-sm btn-info">Previous</button>`+wrapper.innerHTML;
            division3.innerHTML="Change: "+state.page;
        }
        if(state.page!=pages){
          wrapper.innerHTML+=`<button value=${state.page+1} class="page btn btn-sm btn-info">Next</button>`;
          division3.innerHTML="Change: "+state.page;
      }
     
         
      
      $('.page').on('click',function(){
          $('#table-body').empty()
          state.page=Number($(this).val());
          buildTable();
          
      })
   
  }
function buildTable(){                       //to view the data in table format in webpage
  let table=$('#table-body');
  let info=pagination(state.querySet,state.page,state.rows);
  console.log('Data:',info);
  var myList=info.querySet;
  for(let r of myList){
      let row=`<tr>
      <td>"${r.name}"</td>
      <td>"${r.category}"</td>
      <td>"${r.group}"</td>
      <td>"${r.htmlCode}"</td>
      <td>"${r.unicode}"</td>`
      table.append(row);
  }
  pageButtons(info.pages);
}
}