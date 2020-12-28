export const radioPlayerInit =()=>{

    // Получаем элементы с html страницы
   const radio = document.querySelector('.radio');
   const radioCoverImg = document.querySelector('.radio-cover__img');
   const radioHeaderBig = document.querySelector('.radio-header__big');
   const radioNavigation = document.querySelector('.radio-navigation');
   const radioItem = document.querySelectorAll('.radio-item');
   const radioStop = document.querySelector('.radio-stop');
   const radioVolume = document.querySelector('.radio-volume');
   const radioMute = document.querySelector('.radio-mute');

   

    //создаем конструктор аудио с плеем, стопом ...
    const audio = new Audio();
    audio.type = 'audio/aac'; //Тип аудио
 // Переменная, забирающая из аудио текущую громкость
    let prevVolume = audio.volume;
   
    radioStop.disabled = true; //выключили кнопку
    //Изменение кнопки плей-стоп
    const changeIconPlay = () =>{
        if(audio.paused){
            radio.classList.remove('play')
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else{
            radio.classList.add('play')
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    }

    const selectItem = elem =>{
        radioItem.forEach(item => item.classList.remove('select'))//удаляем кружки после перехода на другую станцию
        elem.classList.add('select');// добавили кружки вокруг радио элементов
    };

    radioNavigation.addEventListener('change', event=> {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent //Получаем текст внутри элемента
        radioHeaderBig.textContent = title // Переопределяем текст контента с radio-name в radio-header
        //Замена изображения
        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg


        radioStop.disabled = false; //Включили кнопку
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay ();
    });
    radioStop.addEventListener('click', ()=>{
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }
        changeIconPlay(); 
    });
    

    radioVolume.addEventListener('input', ()=> {
        audio.volume = radioVolume.value / 100;
        audio.muted = false;
    })


    radioMute.addEventListener('click', ()=>{
        audio.muted = !audio.muted
    })

    radioVolume.value= audio.volume *100


    radioPlayerInit.stop = ()=>{
        audio.pause();
        changeIconPlay();
    }
};