export function startHomeLoop(){
    renderLoop(true);
}


function renderLoop(active){
    if(active){
        console.log("started")
    }else{
        console.log("stopped");
    }

}


export function stopHomeLoop(){
    renderLoop(false);
}


