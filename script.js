import { add } from "./functions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://playground-mustansir-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const input_field = document.getElementById("input-field"); 
const task_button = document.getElementById("task-button"); 


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const tasks_db = ref(database,"Tasks"); 

task_button.addEventListener("click",function(){
    
    let text_field = input_field.value; 
    push(tasks_db,text_field);
    console.log(`${text_field} added to the database`); 

    // add_list_element(text_field); 
    
})

// console.log(add(5,5)); 

onValue(tasks_db, function(snapshot){

    if(snapshot.exists()){
        let tasks_array = Object.entries(snapshot.val()); 
        let ul = document.getElementById("unordered-list"); 
        ul.innerHTML="";
    
        for(let i=0; i<tasks_array.length; i++){
            // console.log(tasks_array[i][1]);
            let li = document.createElement("li"); 
            li.appendChild(document.createTextNode(tasks_array[i][1]));
            li.setAttribute("class","list-item"); 
            li.addEventListener("dblclick",function(){
                console.log(`${tasks_array[i][1]} removed from database`); 
                let task_location_in_database = ref(database,`Tasks/${tasks_array[i][0]}`);
                remove(task_location_in_database);
            })
            ul.appendChild(li); 
    
            // Or
            // ul.innerHTML += `<li>${tasks_array[i][1]}</li>`
        }
    } else {
        document.getElementById("unordered-list").innerHTML="";
        add_list_element("No tasks exist !")
    }

});

function add_list_element(texty){
    let ul = document.getElementById("unordered-list"); 
    let li = document.createElement("li"); 
    li.appendChild(document.createTextNode(texty));
    li.setAttribute("class","list-item"); 
    ul.appendChild(li); 
}

