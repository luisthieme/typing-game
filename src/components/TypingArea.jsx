import React, { Component } from 'react';
import randomWords from 'random-words';

class TypingArea extends Component {

    state = {
        newarr: [],
        arrayWords: [],
        words: "",
        value: 0,
        timer: 0,
        timerStart: false,
        divider: 0,
        count: 0,
        wpm: 0,
    }

    test(value = 10) {
        //this.setState({words: randomWords({exactly: Number(value), join:" "})})
        let words = randomWords({exactly: Number(value), join: " "})
        //this.setState({arrayWords: words.split("")}) why tf does this not work properly although its the recommended solution
        this.state.arrayWords = words.split("")
        this.setState({value: value})


    }

    submit() {
        this.setState({newarr: this.state.arrayWords.map(character => <span>{character}</span>)})
        document.getElementById("textArea").value = null
        this.compare()
        this.setState({timer: this.state.timer = 0})
        if (this.state.timerStart === false) {
            this.setState({timerStart: true})
            setInterval(() => {
                this.setState({timer: this.state.timer + 1})
            }, 1000)
        }
    }

    firstChar() {
        const arraySpan = document.getElementById("text").querySelectorAll("span")
        if (!arraySpan[0].classList.contains("correct")) {
            arraySpan[0].classList.add("next-char")
        }
    }

    getWPM() {
        if (localStorage.getItem("wpm") === null) {
            localStorage.setItem("wpm", 0)
            localStorage.setItem("divider", 0)
            localStorage.setItem("count", 0)
        }
        else {
            let divider = Number(localStorage.getItem("divider"))
            let count = Number(localStorage.getItem("count"))

            localStorage.setItem("divider", divider + 1)
            localStorage.setItem("count", count + this.state.value / (this.state.timer / 60))
            localStorage.setItem("wpm", Math.floor(count / divider))

        }
    }

    compare() {
        let counter = 0
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
                counter = counter + 1
                characterSpan.classList.add("correct")
                characterSpan.classList.remove("incorrect")
                characterSpan.classList.remove("next-char")
                if (counter === arraySpan.length) {
                    this.getWPM()
                    this.test(this.state.value)
                    this.submit()
                    const arraySpan = document.getElementById("text").querySelectorAll("span")
                    if (!arraySpan[0].classList.contains("correct")) {
                    arraySpan[0].classList.add("next-char")
        }
                }
            }
            else {
                characterSpan.classList.remove("correct")
                characterSpan.classList.add("incorrect")
                arrTextArea.pop(index)
                document.getElementById("textArea").value = arrTextArea.join("")

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
                        <textarea className='text-area' id="textArea" onFocus={() => this.firstChar()} ></textarea>
                    </div>
                    <div className='center'>
                        <p>WPM: {localStorage.getItem("wpm")}</p>
                        <button className="button" onClick={() => this.submit()}>START</button>
                        <input className="input-number" type="number" id='textLength' onChange={(e) => this.test(e.target.value)}></input>
                        <button className="button" onClick={() => window.location.reload(false)}>STOP</button>
                        <p>TIMER: {this.state.timer}</p>
                    </div>
                </div>

            </div>
        );
    }
}

export default TypingArea;