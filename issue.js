let textLog = []
let group = {}
let groupId = {}
let classConst = 1

function popup(num) {
    let Bid = 'B' + num;
    let QBid = 'QB' + num;
    let Qid = 'Q' + num;
    let rotate = document.getElementById(Bid).style.transform;
    if (rotate == 'rotate(180deg)') {
        document.getElementById(Bid).style.transform = 'rotate(0deg)'
    } else {
        document.getElementById(Bid).style.transform = 'rotate(180deg)'
    }
    if(document.getElementById(QBid).style.height =='28px') {
        if(document.getElementById(Qid).childElementCount<=4) {
            document.getElementById(QBid).style.height = `${document.getElementById(Qid).childElementCount*37+36}px`;
        } else {
            document.getElementById(QBid).style.height = `${4*37+36}px`;
        }
    } else {
        document.getElementById(QBid).style.height = '28px'
    }
}

function text() {
    let text = document.getElementById("textInput").value;
    document.getElementById("textInput").value = '';

    
    let date = new Date()
    let newQuestion = {'text' : text, 'needComment': 1, 'nickname': 'admin', 'group': text, 'date':date.getTime()}

    if(newQuestion['group'] in group) {
        group[newQuestion['group']] += 1
        let childCount = document.getElementById(`Q${groupId[newQuestion['group']]}`).childElementCount
        if(childCount<=3 ) {
            document.getElementById(`QB${groupId[newQuestion['group']]}`).style.height = `${childCount*37+73}px`;
        } else {
            document.getElementById(`QB${groupId[newQuestion['group']]}`).style.height = `${4*37+36}px`;
        }
    } else {
        group[newQuestion['group']] = 1
        groupId[newQuestion['group']] = classConst
        classConst += 1
        const questionBox = document.createElement('div')
        questionBox.className = 'questionBox'
        questionBox.setAttribute('id', `QB${groupId[newQuestion['group']]}`)
        //questionBox.setAttribute('style', 'height:73px')

        const question_title = document.createElement('div')
        question_title.className = 'title'

        const question_Q = document.createElement('div')
        question_Q.className = 'Q'
        question_Q.append('Q.')

        const question_text = document.createElement('div')
        question_text.className = 'text'
        question_text.append(newQuestion['group'])

        const question_popup = document.createElement('div')
        question_popup.className = 'popup'
        question_popup.setAttribute('id', `B${groupId[newQuestion['group']]}`)
        question_popup.setAttribute('onclick', `popup(${groupId[newQuestion['group']]})`)

        const question_span = document.createElement('span')
        question_span.className = 'material-symbols-outlined'
        question_span.append('expand_more')

        question_popup.append(question_span)
        question_title.append(question_Q, question_text, question_popup)

        const questionList = document.createElement('div')
        questionList.className = 'questionList'
        questionList.setAttribute('id', `Q${groupId[newQuestion['group']]}`)

        questionBox.append(question_title, questionList)

        document.getElementById('issueSub').prepend(questionBox)
        questionBox.classList.add("animation-init");
        setTimeout(function() {
            questionBox.classList.add("animation-fade");
        })
    }
    //questionBox에 들어갈 question 제작
    const question = document.createElement('div')
    question.className = 'question'

    const question_id = document.createElement('div')
    question_id.className = 'id'
    question_id.append(newQuestion['nickname'])

    const question_content = document.createElement('div')
    question_content.className = 'content'
    question_content.append(newQuestion['text'])

    const question_time = document.createElement('div')
    question_time.className = `${(textLog.length+1).toString()} time`
    question_time.append('0초전')

    question.append(question_id, question_content, question_time)
    
    document.getElementById(`Q${groupId[newQuestion['group']]}`).prepend(question)
    document.getElementById(`B${groupId[newQuestion['group']]}`).style.transform = 'rotate(0deg)'
    //끝

    textLog.push(newQuestion)
    const tag = document.createElement('div');
    tag.className = 'chat'
    const id = document.createElement('p');
    id.className = 'logId'
    const content = document.createElement(`p`)
    content.className = 'logContent'
    tag.setAttribute('id', `T${textLog.length.toString()}` )
    id.append(newQuestion['nickname'])
    content.append(newQuestion['text'])
    tag.append(id, content)
    document.getElementById("log").prepend(tag)

    tag.classList.add("animation-init-tag");
    setTimeout(function() {
        tag.classList.add("animation-fade-tag");
    })
}

let timer = setInterval(function() {
    let now = new Date()
    now = now.getTime()
    for(let i = 1 ; i <= textLog.length ; i++ ) {
        for(let j = 0 ; j < document.getElementsByClassName(i.toString()).length ; j++) {
            if(parseInt((now - textLog[i-1]['date'])/1000) >= 60) {
                document.getElementsByClassName(i.toString())[j].innerText = parseInt((now - textLog[i-1]['date'])/1000/60) + '분전'
            } else {
                document.getElementsByClassName(i.toString())[j].innerText = parseInt((now - textLog[i-1]['date'])/1000) + '초전'
            }
        }
    }
},1000)