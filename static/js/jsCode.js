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