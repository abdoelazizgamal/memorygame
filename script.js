document.querySelector('.control-buttons span').onclick = function()
{
    let YourName = prompt('What is Your Name?');
    if(YourName == null || YourName == "")
    {
       document.querySelector(".info-container .name span").innerHTML = "UnKnown";
    }
    else
    {
        document.querySelector(".info-container .name span").innerHTML = YourName;
    }
    document.querySelector('.control-buttons').remove();    
}

let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(document.querySelectorAll(".game-block"));

//Generate Empty array with number of indexes  Based on length of blocks 
//VI
//let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange)
//Add Order Css Property To Game Blocks 
blocks.forEach((block,index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click',function()
    {
        flipBlock(this)
    })
});

//Shuffle Function
function shuffle(arr)
{
    let current = arr.length;
    let random ;
    while (current > 0)
    {
        random = Math.floor(Math.floor(Math.random()*current));
        current--;
        [ arr[random] , arr[current] ] = [ arr[current] , arr[random] ] ; 
    }
    return arr;
}
//Flip Block Function
function flipBlock (selectedBlock)
{
    selectedBlock.classList.add('is-flipped');  
    let allFlipedBlocks = blocks.filter(flippedBlock =>
    {
       return flippedBlock.classList.contains('is-flipped');
        
    })
    if(allFlipedBlocks.length === 2)
    {
        stopClicking();
        checkMatched(allFlipedBlocks[0],allFlipedBlocks[1])
    }
}
function stopClicking()
{
    blocksContainer.classList.add('no-clicking');
    setTimeout(()=>{
    blocksContainer.classList.remove('no-clicking');
    },duration)
}


function checkMatched(firstBlock , secondBlock)
{
    let tries = document.querySelector('.tries span');
    if(firstBlock.dataset.technology == secondBlock.dataset.technology)
    {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById('success').play();
        document.getElementById('success').volume = 0.2;
    }
    else
    {
        tries.innerHTML = parseInt(tries.innerHTML) + 1 ;
        setTimeout(()=>
        {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        },duration)
        document.getElementById('fail').play();
        document.getElementById('fail').volume = 0.2;
    }
}

setInterval(() => {
let matchedBlocks = Array.from(document.querySelectorAll('.has-match'));
if(matchedBlocks.length == 20 )
{
    document.querySelector('.success').classList.add('show');
    document.querySelector('.success div').onclick = function()
    {
        location.reload();
    }
}
}, duration);
setInterval(() => {
    let tries = document.querySelector('.tries span');
    if(tries.innerHTML == 25 )
    {
        document.querySelector('.failed').classList.add('show');
        document.querySelector('.failed div').onclick = function()
        {
            location.reload();
        }
    }
}, duration);
    