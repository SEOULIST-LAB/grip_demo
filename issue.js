let textLog = []

function popup(num) {
    let Bid = 'B' + num;
    let QBid = 'QB' + num;
    let rotate = document.getElementById(Bid).style.transform;
    if (rotate == 'rotate(180deg)') {
        document.getElementById(Bid).style.transform = 'rotate(0deg)'
    } else {
        document.getElementById(Bid).style.transform = 'rotate(180deg)'
    }
    if(document.getElementById(QBid).style.height =='28px') {
        document.getElementById(QBid).style.height = '188px';
    } else {
        document.getElementById(QBid).style.height = '28px'
    }
}

function text() {
    let text = document.getElementById("textInput").value;
    document.getElementById("textInput").value = '';

    
    let date = new Date()
    let newQuestion = {'text' : text, 'needComment': 1, 'nickname': 'admin', 'group': text, 'date':date.getTime()}
    textLog.push(newQuestion)
    const tag = document.createElement('div');
    tag.className = 'chat'
    const te = document.createElement('p');
    const time = document.createElement(`div`)
    time.className = `${textLog.length.toString()} timer`
    time.append('0초전')
    te.append(newQuestion['text'])
    tag.append(te, time)
    document.getElementById("log").prepend(tag)
}

let timer = setInterval(function() {
    let now = new Date()
    now = now.getTime()
    console.log(11)
    for(let i = 1 ; i <= textLog.length ; i++ ) {
        if(parseInt((now - textLog[i-1]['date'])/1000) >= 60) {
            document.getElementsByClassName(i.toString())[0].innerText = parseInt((now - textLog[i-1]['date'])/1000/60) + '분전'
        } else {
            document.getElementsByClassName(i.toString())[0].innerText = parseInt((now - textLog[i-1]['date'])/1000) + '초전'
        }
    }
},1000)