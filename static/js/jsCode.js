const URL='http://127.0.0.1:5000/';
async function removeTask(id){
    await fetch(`${URL}delete/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(()=>{
        document.getElementById(`card_${id}`).remove();
    });
}

async function doneTask(id){
    await fetch(`${URL}condition/${id}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    }).then(()=>{
        let button=document.getElementById(`done_button_${id}`);
        let title = document.getElementById(`task_title_${id}`);
        let description = document.getElementById(`task_description_${id}`);
        let linkTitle=document.getElementById(`task_title_${id}`);
        let textDescription=document.getElementById(`task_description_${id}`);
        if(button.classList.contains('btn-outline-secondary')){
            let title_text=title.innerHTML;
            let description_text=description.innerHTML;
            title.innerHTML=`<del id='del_title_${id}'>${title_text}</del>`;
            description.innerHTML=`<del id='del_descr_${id}'>${description_text}</del>`;
            button.classList.remove('btn-outline-secondary');
            button.classList.add('btn-secondary');
            linkTitle.classList.add('disabled');
            textDescription.classList.add('text-secondary');
        }else{
            let titleDel = document.getElementById(`del_title_${id}`).innerHTML;
            let descriptionDel = document.getElementById(`del_descr_${id}`).innerHTML;
            title.innerHTML=titleDel;
            description.innerHTML=descriptionDel;
            button.classList.remove('btn-secondary');
            button.classList.add('btn-outline-secondary');
            linkTitle.classList.remove('disabled');
            textDescription.classList.remove('text-secondary');
        }
    });
}

async function loadComments(id){
    let comment_block=document.getElementById(`comments_${id}`);
    // comment_block.innerText=comment_block.innerText+`<div class="collapse" id="comments_${id}">`;
    await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(response=>response.json())
        .then(comments=>{
            for(let i=0;i<comments.length;i++){
                let user_name = comments[i].name+` (${comments[i].email})`;
                let text = comments[i].body;
                // comment_block.innerText=comment_block.innerText+`<div class="card card-body">${text}</div>`;
                //console.log(comment_block.innerText);
                let singleComment=document.createElement(`div`);
                let commentTitle=document.createElement('h5');
                let commentBody=document.createElement('p');
                let commentUser=document.createElement('p');
                let commentEmail=document.createElement('a');
                commentUser.textContent=comments[i].name;
                commentUser.classList.add('d-inline');
                commentUser.classList.add('p-2');

                commentEmail.href=`mailto:${comments[i].email}`;
                commentEmail.textContent=`(${comments[i].email})`;
                commentEmail.classList.add('d-inline');

                commentTitle.classList.add('card-title');
                commentTitle.appendChild(commentUser);
                commentTitle.appendChild(commentEmail);

                commentBody.classList.add('card-text');
                commentBody.textContent=text;

                singleComment.classList.add('card');
                singleComment.classList.add('card-body');
                singleComment.classList.add('bg-light');
                singleComment.classList.add('mb-1');
                singleComment.appendChild(commentTitle);
                singleComment.appendChild(commentBody);
                if(i==0){
                    removeLoadIcon()
                }
                comment_block.appendChild(singleComment);
            }
        });
}

async function removeLoadIcon(){
    document.getElementById('spinner_loading').remove();
}

//Показать и скрыть выполненные задачи
async function transformTaskList(){
    let checkbox=document.getElementById('onlyDone');
    if(checkbox.checked){
        let allTasks=document.getElementsByClassName('card');
        for(let i=0;i<allTasks.length;i++){
            if(isTaskDone(allTasks[i])){
                allTasks[i].remove();
                i--;
            }
        }
    }
    else{
        await fetch(`${URL}tasks`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },})
        .then(response=>response.text())
        .then(comments=>{
            let htmlParser=new DOMParser();
            let htmlPage=htmlParser.parseFromString(comments,'text/html');
            let tasksOld=document.getElementById('accordionExample');
            let loading=htmlPage.getElementsByClassName('spinner-border');
            while(loading[0]){
                loading[0].remove();
            }
            tasksOld.innerHTML=htmlPage.getElementById('accordionExample').innerHTML;
        });
    }
}

function isTaskDone(task){
    let find=task.children[1];
    while(find.children[0]){
        find=find.children[0];
    }
    if (find.tagName=='DEL'){
        return true;
    }
    return false;
}

let clickSortByCondition=false;
let clickSortByName=false;
function NullClick(){
    clickSortByCondition=false;
    clickSortByName=false;
}

async function SortByCondition(){
    clickSortByCondition=!clickSortByCondition;
    let cards=document.getElementsByClassName('card');
    let listCards=document.getElementById('accordionExample');
    const doneTasks=[];
    const notDoneTasks=[];
    for(let i=0;i<cards.length;i++){
            if(isTaskDone(cards[i])){
                doneTasks.push(cards[i]);
            }
            else{
                notDoneTasks.push(cards[i]);
            }
        }
    while (listCards.children[0]){
        listCards.children[0].remove();
    }
    if(clickSortByCondition){
        while(notDoneTasks[0]){
            listCards.appendChild(notDoneTasks[0]);
            notDoneTasks.shift();
        }
        while(doneTasks[0]){
            listCards.appendChild(doneTasks[0]);
            doneTasks.shift();
        }
    }
    else{
        while(doneTasks[0]){
            listCards.appendChild(doneTasks[0]);
            doneTasks.shift();
        }
        while(notDoneTasks[0]){
            listCards.appendChild(notDoneTasks[0]);
            notDoneTasks.shift();
        }
    }
}

async function SortByName(){
    clickSortByName=!clickSortByName;
    let cards=document.getElementsByClassName('card');
    let docListCards=document.getElementById('accordionExample');
    const listOfCards=[];
    for(let i=0;i<cards.length;i++){
        listOfCards.push(cards[i]);
    }
    if(clickSortByName){
        listOfCards.sort(function (first,second){
            let titleFirst=first.children[1];
            while (titleFirst.children[0]){
                titleFirst=titleFirst.children[0];
            }
            titleFirst=titleFirst.textContent.toLowerCase();
            console.log(titleFirst);
            let titleSecond=second.children[1];
            while (titleSecond.children[0]){
                titleSecond=titleSecond.children[0];
            }
            titleSecond=titleSecond.textContent.toLowerCase();

            if (titleFirst>titleSecond){
                return 1;
            }
            if(titleSecond>titleFirst){
                return -1;
            }
            return 0;
        });
    }
    else{
        listOfCards.sort(function compare(first,second){
            let titleFirst=first.children[1];
            while (titleFirst.children[0]){
                titleFirst=titleFirst.children[0];
            }
            titleFirst=titleFirst.textContent.toLowerCase();
            let titleSecond=second.children[1];
            while (titleSecond.children[0]){
                titleSecond=titleSecond.children[0];
            }
            titleSecond=titleSecond.textContent.toLowerCase();
            if (titleFirst>titleSecond){
                return -1;
            }
            if(titleSecond>titleFirst){
                return 1;
            }
            return 0;
        });
    }
    while (docListCards.children[0]){
        docListCards.children[0].remove();
    }
    while(listOfCards[0]){
        docListCards.appendChild(listOfCards[0]);
        listOfCards.shift();
    }
}