import { useState, useEffect } from 'react';
import { Button } from '../components/Button/Button';

export const App = () => {
  const API_URL = "http://localhost:3001";
  const [word, setWord] = useState("");
  
  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "locale = fr-FR",
    })
    .then((res) => res.json())
    .then((data) => {
      setWord(data.word);
    });
  }, []);
  
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [motFaux, setmotFaux] = useState(0);
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  const motMasqué = word.replace(/\w/g, (letter) =>
    correctGuesses.includes(letter) ? letter : "_ "
  );

  const animate = () => {
      let  dessin = motFaux ;
      drawArray[ dessin]();
  }
  
  const head = () => {
    const personnage = document.getElementById("pendu");
    const context = personnage.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
  };

  const draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
    const personnage = document.getElementById("pendu");
    const context = personnage.getContext('2d');
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
  }




  const ligne1 = () => {
    draw (0, 150, 150, 150);
  };
  

  const ligne2 = () => {
    draw (10, 0, 10, 600);
  };

  const ligne3 = () => {
    draw (0, 5, 70, 5);
  };

  const ligne4 = () => {
    draw (60, 5, 60, 15);
  };

  const ligne5 = () => {
    draw (60, 36, 60, 70);
  };
 
  const ligne6 = () => {
    draw (60, 46, 100, 50);
  };
 
  const ligne7 = () => {
    draw (60, 46, 20, 50);
  };
 
  const ligne8 = () => {
    draw (60, 70, 100, 100);
  };
 
  const ligne9 = () => {
    draw (60, 70, 20, 100);
  };
  const drawArray = [ligne1, ligne2, ligne3, ligne4,  head,  ligne5, ligne6, ligne7, ligne8, ligne9]; 

  return (
    <main>
      <h1>Le Pendu</h1>
      <p className="erreurs">Erreurs : {motFaux}/10 </p>
      <p>{motMasqué}</p>
      <div>
          <canvas className="canvas" id="pendu"></canvas>
      </div>
      <div className="keyboard">
        {alphabets.map((alphabet, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                if (word.includes(alphabet)) {
                  setCorrectGuesses([...correctGuesses, alphabet]);
                } else {
                  if (motFaux < 11) {
                    setmotFaux(motFaux + 1)
                    animate();
                  }
                }
              }}
            >
              {alphabet}
            </Button>
          );
        })}
      </div>

      <a href='./'>Nouvelle parti?</a>
      {motFaux === 11 && <p className='perdu'>Perdu!😭</p>}
      {!motMasqué.includes("_") && <p>Victoire🫡</p>}
    </main>
  );
};
