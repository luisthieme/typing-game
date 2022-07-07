import React, { Component } from 'react';
import randomWords from 'random-words';

class TypingArea extends Component {

    state = {
        text: "hey",
        newarr: [],
        arrayWords: [],
    }

    test(value = 10) {
        let words = randomWords({exactly: Number(value), join: " "})
        console.log(words)
        //let arrayWords = words.split("")
        this.setState({arrayWords: words.split("")})
        //this.setState({newarr: arrayWords.map(character => <span>{character}</span>)})
        console.log(this.state.newarr)
    }

    submit() {
        this.setState({newarr: this.state.arrayWords.map(character => <span>{character}</span>)})
    }

    compare() {
        const textArea = document.getElementById("textArea").value
        const arrTextArea = textArea.split("")
        const arraySpan = document.getElementById("text").querySelectorAll("span")
        arraySpan.forEach((characterSpan, index) => {
            const character = arrTextArea[index]
            const beforeChar = arrTextArea[index - 1]
            if (character === undefined) {
                characterSpan.classList.remove("correct")
                characterSpan.classList.remove("incorrect")
                characterSpan.classList.remove("next-char")
                if (beforeChar !== character) {
                    characterSpan.classList.add("next-char")
                }
            }
            else if (character === characterSpan.innerText) {
                characterSpan.classList.add("correct")
                characterSpan.classList.remove("incorrect")
                characterSpan.classList.remove("next-char")
            }
            else {
                characterSpan.classList.remove("correct")
                characterSpan.classList.add("incorrect")
                arrTextArea.pop(index)
                document.getElementById("textArea").value = arrTextArea.join("")
                console.log(arrTextArea)
            }
        })
    }

    render() {
        return (
            <div className="inner-container">
                <div className='typing-area-container'>
                    <div className='center'>
                        <div className='text' id='text'>{this.state.newarr}</div>
                    </div>
                    <div className='center' onKeyUp={() => this.compare()} tabIndex= "0">
                        <textarea className='text-area' id="textArea" autoFocus ></textarea>
                    </div>
                    <div className='center'>
                        <input type="number" id='textLength' onChange={(e) => this.test(e.target.value)}></input>
                        <button onClick={() => window.location.reload(false)}>Reset</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default TypingArea;