import React,{useState, useEffect} from 'react'

import Score from './Score'

import biglion from './imgs/biglion.jpg'
import tiger from './imgs/tiger.jpg'
import hippo from './imgs/hippo.jpg'
import cat from './imgs/cat.jpg'
import dog from './imgs/dog.jpg'
import shark from './imgs/shark.jpg'
import kangaroo from './imgs/kangaroo.jpg'
import zebra from './imgs/zebra.jpg'
import leopard from './imgs/leopard.jpg'


import '../App.css';



const ImageItems = [
    {
        img : biglion,
        id: 1
    },
    {
        img : tiger,
        id : 2
    },
    {   
        img : hippo,
        id : 3
    },
    {
        img : dog,
        id : 4
    },
    {
        img : cat,
        id : 5
    },
    {
        img : shark,
        id : 6
    },
    {
        img : kangaroo,
        id : 7
    },
    {
        img: zebra,
        id : 8
    },
    {
        img: leopard,
        id : 9
    }

]

const shuffle = (array:typeof ImageItems) => {
    let currentIndex = array.length;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;


      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
}

function PlayingSpace() {
    const [win,setwin] = useState(false)
    const [lose,setlose] = useState(false)
    const [clicked,setclicked] = useState<{img: string| null; id: number;}[]>([])
    const [cardsinplay, setcardsinplay] = useState(ImageItems)
    const [maxScore,setMaxScore] = useState(0)

    


    const Click = (id:number) => {
        let index = 0
        for(let i=0;i<ImageItems.length;i++)
        {
            if(ImageItems[i].id === id){
                index = i
            }
        }
        let imagelist = ImageItems[index]
        setclicked([...clicked,imagelist])
        shuffle(cardsinplay)
        
        
        
    }
    
    useEffect(() => {
        let unique = [...Array.from(new Set(clicked.map(a => a.id)))];
        if (unique.length !== clicked.length )
        {
            setlose(true)
        }
        else if (clicked.length === cardsinplay.length)
        {
            setwin(true)
        }
    },[setwin,setlose,clicked,cardsinplay])



    const reset = () => {
        setwin(false)
        setlose(false)
        if (maxScore<clicked.length)
        {
            setMaxScore(clicked.length)
        }
        setclicked([])
        setcardsinplay(ImageItems)
        
    }
    
    if (win){
        return (
            <div className="Status" id="win">
                Wow you won nice 
                <button onClick={reset} className="reset">Play again</button>
            </div>
        )
    }
    else if (lose)
        return (
            <div className="Status" id="lose">
                whoops you lost 
                <button onClick={reset} className="reset">Play again</button>
            </div>
        )
    else{
    return (
        <div>
            
            <Score score = {clicked.length} maxscore = {maxScore}/>
            <div className="Cards">
                {cardsinplay.map((img) => 
                <div key={img.id}>
                <img src={img.img} 
                    key = {img.id} 
                    alt="lol" 
                    onClick = {() => Click(img.id)}
                    id={`card-${img.id}`}
                    className = 'Image'
                    ></img></div>)
                }
            </div>
            
        </div>
    )
    }
}

export default PlayingSpace
