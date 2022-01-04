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
                comment_block.appendChild(singleComment);
            }
        });
}