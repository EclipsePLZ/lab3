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
    let button=document.getElementById(`done_button_${id}`);
    let title = document.getElementById(`task_title_${id}`);
    let description = document.getElementById(`task_description_${id}`);
    let linkTitle=document.getElementById(`task_title_${id}`);
    if(button.classList.contains('btn-outline-secondary')){
        let title_text=title.innerHTML;
        let description_text=description.innerHTML;
        title.innerHTML=`<del id='del_title_${id}'>${title_text}</del>`;
        description.innerHTML=`<del id='del_descr_${id}'>${description_text}</del>`;
        button.classList.remove('btn-outline-secondary');
        button.classList.add('btn-secondary');
        linkTitle.classList.add('disabled');
    }else{
        let titleDel = document.getElementById(`del_title_${id}`).innerHTML;
        let descriptionDel = document.getElementById(`del_descr_${id}`).innerHTML;
        title.innerHTML=titleDel;
        description.innerHTML=descriptionDel;
        button.classList.remove('btn-secondary');
        button.classList.add('btn-outline-secondary');
        linkTitle.classList.remove('disabled');
    }
}