var formEl = document.forms.myForm
var nameEl = formEl.elements.name
var Tamil = formEl.elements.tamil
var English = formEl.elements.english
var Maths = formEl.elements.maths
var Science = formEl.elements.science
var Social = formEl.elements.social
var buttonEl = document.getElementById('btn')



var textEl1 = document.createElement('p')
var textEl2 = document.createElement('p')
var textEl3 = document.createElement('p')
var textEl4 = document.createElement('p')
var textEl5 = document.createElement('p')
var textEl6 = document.createElement('p')





buttonEl.addEventListener("click", () => {

    var userValidation = {
        date: new Date().toLocaleString([], { hour12: true }),
        name: nameEl.value,
        tamil: Tamil.value,
        english: English.value,
        maths: Maths.value,
        science: Science.value,
        social: Social.value,
    };

    if (userValidation.name == "" || userValidation.tamil == "" || userValidation.english == "" || userValidation.maths == "" || userValidation.science == "" || userValidation.social == "") {
        document.getElementById('icon1').innerHTML = "<i class='fa fa-times-circle' style='font-size:20px;padding:5px;color:red;'></i>"
        textEl1.style.cssText = 'font-size:15px;color:red;padding:5px;'
        textEl1.textContent = 'please enter your name Ex:Alex!';
        nameEl.value = ""
        document.getElementById('alert1').append(textEl1)

        document.getElementById('icon2').innerHTML = "<i class='fa fa-times-circle' style='font-size:20px;padding:5px;color:red;'></i>"
        textEl2.style.cssText = 'font-size:15px;color:red;padding:5px;'
        textEl2.textContent = 'please enter your Tamil Mark!';
        Tamil.value = ""
        document.getElementById('alert2').append(textEl2)

        document.getElementById('icon3').innerHTML = "<i class='fa fa-times-circle' style='font-size:20px;padding:5px;color:red;'></i>"
        textEl3.style.cssText = 'font-size:15px;color:red;padding:5px;'
        textEl3.textContent = 'please enter your English Mark!';
        English.value = ""
        document.getElementById('alert3').append(textEl3)

        document.getElementById('icon4').innerHTML = "<i class='fa fa-times-circle' style='font-size:20px;padding:5px;color:red;'></i>"
        textEl4.style.cssText = 'font-size:15px;color:red;padding:5px;'
        textEl4.textContent = 'please enter your Maths Mark!';
        Maths.value = ""
        document.getElementById('alert4').append(textEl4)

        document.getElementById('icon5').innerHTML = "<i class='fa fa-times-circle' style='font-size:20px;padding:5px;color:red;'></i>"
        textEl5.style.cssText = 'font-size:15px;color:red;padding:5px;'
        textEl5.textContent = 'please enter your Science Mark!';
        Science.value = ""
        document.getElementById('alert5').append(textEl5)

        document.getElementById('icon6').innerHTML = "<i class='fa fa-times-circle' style='font-size:20px;padding:5px;color:red;'></i>"
        textEl6.style.cssText = 'font-size:15px;color:red;padding:5px;'
        textEl6.textContent = 'please enter your Social Mark!';
        Social.value = ""
        document.getElementById('alert6').append(textEl6)
    } else {

        document.getElementById('icon1').innerHTML = ""
        textEl1.textContent = '';
        nameEl.value = ""
        document.getElementById('alert1').append(textEl1)

        document.getElementById('icon2').innerHTML = ""
        textEl2.textContent = '';
        Tamil.value = ""
        document.getElementById('alert2').append(textEl2)

        document.getElementById('icon3').innerHTML = ""
        textEl3.textContent = '';
        English.value = ""
        document.getElementById('alert3').append(textEl3)

        document.getElementById('icon4').innerHTML = ""
        textEl4.textContent = '';
        Maths.value = ""
        document.getElementById('alert4').append(textEl4)

        document.getElementById('icon5').innerHTML = ""
        textEl5.textContent = '';
        Science.value = ""
        document.getElementById('alert5').append(textEl5)

        document.getElementById('icon6').innerHTML = ""
        textEl6.textContent = '';
        Social.value = ""
        document.getElementById('alert6').append(textEl6)

        var getData = JSON.parse(localStorage.getItem('data') || '[]')
        getData.push(userValidation)
        getData.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
        localStorage.setItem('data', JSON.stringify(getData))


        document.getElementById('text').innerText = 'EXAM RESULT STUDENTS DATAS'
        document.getElementById('editor').innerHTML = ` <p class="text-end" id="pdf"
        style="font-size:18px;color:black; font-weight: bold; cursor: pointer;"> <i
            class="fa fa-file-pdf-o" style="font-size:25px;color:red;"></i>Download PDF</p>`
        document.getElementById('pdf').addEventListener('click', () => {
            document.documentElement.scrollTop = 0;
            const pdfContent = document.getElementById("pdfcontent")
            var opt = {
                margin: 10,
                filename: 'studentdata.pdf',
                html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true, scrollY: 0 },
                jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait' },
                pagebreak: { mode: 'avoid-all' }
            };
            html2pdf().from(pdfContent).set(opt).toPdf().get('pdf').then(function (pdf) {
                var totalPages = pdf.internal.getNumberOfPages();

                for (i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    pdf.setFontSize(10);
                    pdf.setTextColor(150);
                    pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() / 2.25), (pdf.internal.pageSize.getHeight() - 8));


                }
            }).save();

        })

        document.getElementById('table').innerHTML = getData.map((value, index) => {
            var tamilSub = parseInt(value.tamil)
            var englishSub = parseInt(value.english)
            var mathsSub = parseInt(value.maths)
            var scienceSub = parseInt(value.science)
            var socialSub = parseInt(value.social)
            var total = (tamilSub + englishSub + mathsSub + scienceSub + socialSub)
            var calcPercentage = Math.round((total / 500) * 100)
            var result = tamilSub >= 35 && englishSub >= 35 && mathsSub >= 35 && scienceSub >= 35 && socialSub > 35 ? 'PASS' : 'FAIL'
            console.log('my total mark :' + total);
            console.log(`my percentage is ${calcPercentage}%`);
            return `<tr class="list" >
            <th scope="row">${index}</th>
            <td>${value.date}</td>
            <td>${value.name}</td>
            <td>${tamilSub}</td>
            <td>${englishSub}</td>
            <td>${mathsSub}</td>
            <td>${scienceSub}</td>
            <td>${socialSub}</td>
            <td>${total}</td>
            <td>${calcPercentage}%</td>
            <td>${result}</td>
            </tr>`



        }).join('')
    }


})




const searchInput = document.getElementById("searchInput");
const namesFromDOM = document.getElementsByClassName("list");

searchInput.addEventListener("keyup", (event) => {
    const { value } = event.target;

    const searchQuery = value.toLowerCase();

    for (const nameElement of namesFromDOM) {

        let name = nameElement.textContent.toLowerCase();


        if (name.includes(searchQuery)) {
            nameElement.style.display = "";
        } else {

            var searchPhoto = nameElement.style.display = "none";
        }
        if (searchPhoto === 'none') {

        }
    }
});

