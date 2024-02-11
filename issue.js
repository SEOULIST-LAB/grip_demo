let textLog = []
let group = {"기타 문의":0}
let groupId = {"기타 문의":-1}

function popup(num) {
    let Bid, QBid, Qid
    if(num == -1) {
        Bid = 'B';
        QBid = 'QB';
        Qid = 'Q';
        let rotate = document.getElementById(Bid).style.transform;
        if (rotate == 'rotate(180deg)') {
            document.getElementById(Bid).style.transform = 'rotate(0deg)'
        } else {
            document.getElementById(Bid).style.transform = 'rotate(180deg)'
        }
        if(document.getElementById(QBid).style.height =='28px') {
            if(document.getElementById(Qid).childElementCount<=13) {
                document.getElementById(QBid).style.height = `${document.getElementById(Qid).childElementCount*40+36}px`;
            } else {
                document.getElementById(QBid).style.height = `${14*40+36}px`;
            }
        } else {
            document.getElementById(QBid).style.height = '28px'
        }
    } else {
        Bid = 'B' + num;
        QBid = 'QB' + num;
        Qid = 'Q' + num;
        let rotate = document.getElementById(Bid).style.transform;
        if (rotate == 'rotate(180deg)') {
            document.getElementById(Bid).style.transform = 'rotate(0deg)'
        } else {
            document.getElementById(Bid).style.transform = 'rotate(180deg)'
        }
        if(document.getElementById(QBid).style.height =='28px') {
            if(document.getElementById(Qid).childElementCount<=3) {
                document.getElementById(QBid).style.height = `${document.getElementById(Qid).childElementCount*40+36}px`;
            } else {
                document.getElementById(QBid).style.height = `${4*40+36}px`;
            }
        } else {
            document.getElementById(QBid).style.height = '28px'
        }
    }
}

function addText(nickname, text, groupName, time, needComment, cluster) {
    let newQuestion = {'text' : text, 'needComment': needComment, 'nickname': nickname, 'group': groupName, 'date':time, 'cluster':cluster}
    if(newQuestion['needComment'] == 1) {
        if(newQuestion['group'] in group) {
            group[newQuestion['group']] += 1
            let childCount = document.getElementById(`Q${groupId[newQuestion['group']] == -1 ? '' : groupId[newQuestion['group']]}`).childElementCount
            if(groupId[newQuestion['group']] == -1) {
                if(childCount<=13 ) {
                    document.getElementById(`QB`).style.height = `${childCount*40+73}px`;
                } else {
                    document.getElementById(`QB`).style.height = `${14*40+36}px`;
                }
            } else {
                if(childCount<=3 ) {
                    document.getElementById(`QB${groupId[newQuestion['group']]}`).style.height = `${childCount*40+73}px`;
                } else {
                    document.getElementById(`QB${groupId[newQuestion['group']]}`).style.height = `${4*40+36}px`;
                }
            }
        } else {
            group[newQuestion['group']] = 1
            groupId[newQuestion['group']] = newQuestion['cluster']
            const questionBox = document.createElement('div')
            questionBox.className = 'questionBox'
            questionBox.setAttribute('id', `QB${groupId[newQuestion['group']] == -1 ? '' : groupId[newQuestion['group']]}`)
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
            question_popup.setAttribute('id', `B${groupId[newQuestion['group']] == -1 ? '' : groupId[newQuestion['group']]}`)
            question_popup.setAttribute('onclick', `popup(${groupId[newQuestion['group']]})`)

            const question_span = document.createElement('span')
            question_span.className = 'material-symbols-outlined'
            question_span.append('expand_more')

            question_popup.append(question_span)
            question_title.append(question_Q, question_text, question_popup)

            const questionList = document.createElement('div')
            questionList.className = 'questionList'
            questionList.setAttribute('id', `Q${groupId[newQuestion['group']] == -1 ? '' : groupId[newQuestion['group']]}`)

            questionBox.append(question_title, questionList)
            if( groupId[newQuestion['group']] != -1 ) {
                document.getElementById('issueSub').prepend(questionBox)
            } else {
                document.getElementById('etc').prepend(questionBox)
            }
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
        
        document.getElementById(`Q${groupId[newQuestion['group']] == -1 ? '' : groupId[newQuestion['group']]}`).prepend(question)
        document.getElementById(`B${groupId[newQuestion['group']] == -1 ? '' : groupId[newQuestion['group']]}`).style.transform = 'rotate(0deg)'
        //끝

        textLog.push(newQuestion)
    }

    
}

function addChat(nickname, text, needComment) {
    let newQuestion = {'text' : text, 'needComment': needComment, 'nickname': nickname}

    const tag = document.createElement('div');
    tag.className = 'chat'
    const id = document.createElement('p');
    id.className = 'logId'
    const content = document.createElement(`p`)
    content.className = 'logContent'
    id.append(newQuestion['nickname'])
    content.append(newQuestion['text'])
    tag.append(id, content)
    if(newQuestion['nickname'] == '매니저') {
        id.classList.add('manager')
    }
    document.getElementById("log").prepend(tag)

    const tag2 = tag.cloneNode(true)
    if(newQuestion['needComment'] == 1) {
        tag2.classList.add('needComment')
    }

    document.getElementById("log2").prepend(tag2)

    tag.classList.add("animation-init-tag");
    setTimeout(function() {
        tag.classList.add("animation-fade-tag");
    })

    tag2.classList.add("animation-init-tag");
    setTimeout(function() {
        tag2.classList.add("animation-fade-tag");
    })
}

function sendChat(text) {
    let data = {
        "message":text
    }
    return new Promise((resolve, reject) => {
        fetch("http://3.38.195.39/send_chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        }).then((response) => resolve(response.json())
        ).catch((e)=>console.log(e));
    })
}

function postCluster() {
    return new Promise((resolve, reject) => {
        fetch("http://3.38.195.39/cluster", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        }).then((response) => resolve(response.json())
        ).catch((e)=>console.log(e));
    })
}

function text(nickname, id) {
    let text = document.getElementById(id).value;
    document.getElementById(id).value = '';

    let needComment = 1
    if(nickname == '매니저') {
        needComment = 0
    } else {
        sendChat(text).then((data) => {
            addChat(data.nickname, text, data.type)
            console.log(data)
            if(data.type == 1) {
                postCluster().then((json)=>{
                    deleteChild()
                    return json
                }).then(printData)
            }
        })
    }
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
},1000);

//mockup
(function() {
    console.log(1)
    fetch("mockup.json")//json파일 읽어오기
        .then((response) => {
            return response.json()
        })//읽어온 데이터를 json으로 변환
        .then((json) => {
            console.log(json)
            let data = json.Mockup;
            printData(data)
            data.forEach(element => {
                for(let i = 0 ; i < element.chats.length ; i++) {
                    let date2 = new Date(element.chats[i].timestamp)
                    addChat(element.chats[i].nickname, element.chats[i].message, element.summary,1)
                }
            })
        });
}());

function deleteChild() {
    let parent
    for(let i = -1 ; i < groupId.length-1 ; i++) {
        parent = document.getElementById(`Q${i == -1 ? '' : i}`)
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }
}

function printData(json) {
    //json에 있는 items만 받아오기
    json.forEach(element => {
        console.log(element)
        for(let i = 0 ; i < element.chats.length ; i++) {
            let date2 = new Date(element.chats[i].timestamp)
            addText(element.chats[i].nickname, element.chats[i].message, element.summary, date2.getTime(),1,element.cluster_id)
        }
    });
}